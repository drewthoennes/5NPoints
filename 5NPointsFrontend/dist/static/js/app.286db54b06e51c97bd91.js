webpackJsonp([1],{0:function(t,e){},"5L66":function(t,e){},"60mr":function(t,e){},Fl9v:function(t,e){},Gi7l:function(t,e){},NHnr:function(t,e,s){"use strict";function n(t){s("Fl9v")}function a(t){s("60mr")}function o(t){s("rGAT")}function r(t){s("vZYg")}function i(t){s("gHxH")}function c(t){s("5L66")}function l(t){s("Gi7l")}Object.defineProperty(e,"__esModule",{value:!0});var d=s("7+uW"),u={name:"app"},h=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("router-view")],1)},v=[],m={render:h,staticRenderFns:v},p=m,f=s("VU/8"),_=n,b=f(u,p,!1,_,null,null),g=b.exports,w=s("/ocq"),y={name:"Toolbar",data:function(){return{}}},C=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"toolbar"},[s("router-link",{attrs:{to:"/points"}},[t._v("Points")]),t._v(" "),s("router-link",{attrs:{to:"/rewards"}},[t._v("Rewards")])],1)},$=[],P={render:C,staticRenderFns:$},U=P,R=s("VU/8"),F=a,E=R(y,U,!1,F,"data-v-b87f7966",null),L=E.exports,T={name:"Points",components:{Toolbar:L},data:function(){return{users:[]}},methods:{getUsers:function(){var t=this;this.$http.get("http://localhost:3000/api/points").then(function(e){t.users=e.body})}},mounted:function(){this.getUsers()}},x=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"points h-100"},[s("div",{staticClass:"col h-100"},[s("Toolbar",{staticClass:"row w-100"}),t._v(" "),s("div",{staticClass:"body"},[s("h1",[t._v("Points")]),t._v(" "),s("table",{staticClass:"table table-bordered"},[t._m(0,!1,!1),t._v(" "),s("tbody",t._l(t.users,function(e){return s("tr",[s("td",[t._v(t._s(e.name))]),t._v(" "),s("td",[t._v(t._s(e.points))])])}))])])],1)])},k=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("th",[t._v("Name")]),t._v(" "),s("th",[t._v("Points")])])])}],A={render:x,staticRenderFns:k},V=A,H=s("VU/8"),N=o,O=H(T,V,!1,N,"data-v-79f7070b",null),G=O.exports,q={name:"Rewards",components:{Toolbar:L},data:function(){return{rewards:[]}},methods:{getRewards:function(){var t=this;this.$http.get("http://localhost:3000/api/rewards").then(function(e){t.rewards=e.body})}},mounted:function(){this.getRewards()}},Y=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"rewards h-100"},[s("div",{staticClass:"col h-100"},[s("Toolbar",{staticClass:"row w-100"}),t._v(" "),s("div",{staticClass:"body"},[s("h1",[t._v("Rewards")]),t._v(" "),s("table",{staticClass:"table table-bordered"},[t._m(0,!1,!1),t._v(" "),s("tbody",t._l(t.rewards,function(e){return s("tr",[s("td",[t._v(t._s(e.points))]),t._v(" "),s("td",[t._v(t._s(e.reward))])])}))])])],1)])},Z=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("th",[t._v("Points")]),t._v(" "),s("th",[t._v("Rewards")])])])}],j={render:Y,staticRenderFns:Z},B=j,D=s("VU/8"),J=r,M=D(q,B,!1,J,"data-v-e0076f68",null),S=M.exports,W={name:"Login",methods:{loginUser:function(t){t.preventDefault(),this.$refs.username.value&&this.$refs.password.value||alert("Please complete all fields"),this.$http.post("http://localhost:3000/login",{username:this.$refs.username.value,password:this.$refs.password.value}).then(function(t){!0===t.body.success?(alert(t.body.message),yt.push({name:"Admin"})):alert("Error: "+t.body.message)})}}},z=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"login container-fluid"},[s("div",{staticClass:"col",attrs:{id:"LoginForm"}},[s("div",{staticClass:"col",attrs:{id:"LoginFormHeader"}},[s("router-link",{attrs:{to:"/points"}},[t._v("Not an admin? View points here")])],1),t._v(" "),s("div",{attrs:{id:"LoginFormBody"}},[s("h1",[t._v("Log in")]),t._v(" "),s("form",{on:{submit:t.loginUser}},[s("input",{ref:"username",staticClass:"form-control",attrs:{id:"Username",placeholder:"Username",type:"text"}}),t._v(" "),s("input",{ref:"password",staticClass:"form-control",attrs:{id:"Password",placeholder:"Password",type:"password"}}),t._v(" "),s("input",{staticClass:"form-control",attrs:{id:"Submit",placeholder:"Create account",type:"submit"}})])])])])},I=[],K={render:z,staticRenderFns:I},Q=K,X=s("VU/8"),tt=i,et=X(W,Q,!1,tt,"data-v-2726f662",null),st=et.exports,nt={name:"Toolbar",data:function(){return{}},methods:{logOut:function(){alert("Logging out"),yt.push({name:"Points"})}}},at=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"toolbar"},[s("a",{on:{click:t.logOut}},[t._v("Log Out")])])},ot=[],rt={render:at,staticRenderFns:ot},it=rt,ct=s("VU/8"),lt=c,dt=ct(nt,it,!1,lt,"data-v-2a9d5364",null),ut=dt.exports,ht={name:"Admin",components:{AdminToolbar:ut},data:function(){return{users:[]}},methods:{checkPrivileges:function(){this.$http.post("http://localhost:3000/admin",{}).then(function(t){t.body.success||(alert(t.body.message),yt.push({name:"Login"}))})},getUsers:function(){var t=this;this.$http.get("http://localhost:3000/api/points").then(function(e){t.users=e.body})},incrementPoints:function(t){var e=this;this.$http.post("http://localhost:3000/increment",{_id:t}).then(function(t){t.body.success?e.getUsers():alert(t.body.message)})},decrememtPoints:function(t){var e=this;this.$http.post("http://localhost:3000/decrement",{_id:t}).then(function(t){t.body.success?e.getUsers():alert(t.body.message)})}},mounted:function(){this.checkPrivileges(),this.getUsers()}},vt=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"admin h-100"},[s("div",{staticClass:"col h-100"},[s("AdminToolbar",{staticClass:"row w-100"}),t._v(" "),s("div",{staticClass:"body"},[s("h1",[t._v("Points")]),t._v(" "),s("table",{staticClass:"table table-bordered"},[t._m(0,!1,!1),t._v(" "),s("tbody",t._l(t.users,function(e){return s("tr",[s("td",[t._v(t._s(e.name))]),t._v(" "),s("td",[s("p",{on:{click:function(s){t.decrememtPoints(e._id)}}},[t._v("-")]),s("p",[t._v(" "+t._s(e.points)+" ")]),s("p",{on:{click:function(s){t.incrementPoints(e._id)}}},[t._v("+")])])])}))])])],1)])},mt=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("th",[t._v("Name")]),t._v(" "),s("th",[t._v("Points")])])])}],pt={render:vt,staticRenderFns:mt},ft=pt,_t=s("VU/8"),bt=l,gt=_t(ht,ft,!1,bt,"data-v-0c945a78",null),wt=gt.exports;d.a.use(w.a);var yt=new w.a({hashbang:!1,history:!0,mode:"history",routes:[{path:"/rewards",name:"Rewards",component:S},{path:"/login",name:"Login",component:st},{path:"/admin",name:"Admin",component:wt},{path:"*",name:"Points",component:G}]}),Ct=s("ORbq");d.a.config.productionTip=!1,d.a.use(Ct.a),new d.a({el:"#app",router:yt,template:"<App/>",components:{App:g}})},gHxH:function(t,e){},rGAT:function(t,e){},vZYg:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.286db54b06e51c97bd91.js.map