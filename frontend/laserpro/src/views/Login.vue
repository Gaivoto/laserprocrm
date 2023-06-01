<template>
  <div class="w-lg-500px p-10">
    <div class="form w-100" id="kt_login_signin_form">
      <div class="fv-row mb-10">
        <label class="form-label fs-6 fw-bold text-dark">Nome de utilizador</label>
        <input tabindex="1" class="form-control form-control-lg form-control-solid" type="text" name="username" ref="loginUsername" autocomplete="off" />
      </div>

      <div class="fv-row mb-10">
        <div class="d-flex flex-stack mb-2">
          <label class="form-label fw-bold text-dark fs-6 mb-0">Palavra-passe</label>
        </div>
        <input tabindex="2" class="form-control form-control-lg form-control-solid" type="password" name="password" ref="loginPassword" autocomplete="off" />
      </div>

      <div class="text-center">
        <button tabindex="3" type="submit" ref="submitButton" id="kt_sign_in_submit" class="btn btn-lg btn-primary w-100 mb-5" v-on:click="this.login">
          <span class="indicator-label"> Iniciar sessão </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "sign-in",
  components: {
  },
  created() {
    if(this.$store.getters.getUser.id) {
      this.$router.push({ name: "dashboard"});
    } else {
      window.addEventListener('keydown', (e) => {
        if(e.key == 'Enter') this.login();
      });
    }
  },
  methods: {
    login() {
      if(this.$refs.loginUsername.value != "" && this.$refs.loginPassword.value != "") {
        axios({
          method: 'post',
          url: `${import.meta.env.VITE_HOST}/auth/login`,
          data: {
            username: this.$refs.loginUsername.value,
            password: this.$refs.loginPassword.value
          }
        })
        .then(value => {
          this.$store.commit('setUser', value.data.user);
          this.$store.commit('setRefreshToken', value.data.refresh_token);
          this.$store.commit('setAccessToken', value.data.access_token);
          this.$router.push({ name: "dashboard" });
        })
        .catch(error => {
            if(error.code) {
              console.log(error.response.data);
              this.$emit("open-modal", error.response.data.message);
            } else console.log(error);
        });
      } else {
        this.$emit("open-modal", "Preencha todos os campos.");
      }
    }
  }
}
</script>
