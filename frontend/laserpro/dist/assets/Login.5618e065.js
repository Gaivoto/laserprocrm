import{_ as n,z as i,k as l,l as d,m as e,a7 as r,a8 as c}from"./index.d2ea66b6.js";const m={name:"sign-in",components:{},created(){this.$store.getters.getUser.id?this.$router.push({name:"dashboard"}):window.addEventListener("keydown",s=>{s.key=="Enter"&&this.login()})},methods:{login(){this.$refs.loginUsername.value!=""&&this.$refs.loginPassword.value!=""?i({method:"post",url:"http://64.225.109.57:4000/api/auth/login",data:{username:this.$refs.loginUsername.value,password:this.$refs.loginPassword.value}}).then(s=>{this.$store.commit("setUser",s.data.user),this.$store.commit("setRefreshToken",s.data.refresh_token),this.$store.commit("setAccessToken",s.data.access_token),this.$router.push({name:"dashboard"})}).catch(s=>{s.code?(console.log(s.response.data),this.$emit("open-modal",s.response.data.message)):console.log(s)}):this.$emit("open-modal","Preencha todos os campos.")}}},o=s=>(r("data-v-537618db"),s=s(),c(),s),_={class:"w-lg-500px p-10"},p=o(()=>e("p",{class:"title"},"Bem-vindo",-1)),f={class:"form w-100",id:"kt_login_signin_form"},h={class:"fv-row mb-10"},u=o(()=>e("label",{class:"form-label fs-6 fw-bold text-dark"},"Nome de utilizador",-1)),b={tabindex:"1",class:"form-control form-control-lg form-control-solid",type:"text",name:"username",ref:"loginUsername",autocomplete:"off"},g={class:"fv-row mb-10"},v=o(()=>e("div",{class:"d-flex flex-stack mb-2"},[e("label",{class:"form-label fw-bold text-dark fs-6 mb-0"},"Palavra-passe")],-1)),w={tabindex:"2",class:"form-control form-control-lg form-control-solid",type:"password",name:"password",ref:"loginPassword",autocomplete:"off"},$={class:"text-center"},k=o(()=>e("span",{class:"indicator-label"}," Iniciar sess\xE3o ",-1)),x=[k];function y(s,t,B,I,P,U){return l(),d("div",_,[p,e("div",f,[e("div",h,[u,e("input",b,null,512)]),e("div",g,[v,e("input",w,null,512)]),e("div",$,[e("button",{tabindex:"3",type:"submit",ref:"submitButton",id:"kt_sign_in_submit",class:"btn btn-lg btn-primary w-100 mb-5",onClick:t[0]||(t[0]=(...a)=>this.login&&this.login(...a))},x,512)])])])}const L=n(m,[["render",y],["__scopeId","data-v-537618db"]]);export{L as default};
