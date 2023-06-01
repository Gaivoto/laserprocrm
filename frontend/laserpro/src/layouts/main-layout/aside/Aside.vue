<template>
  <!--begin::Aside-->
  <div id="kt_aside" class="aside overflow-visible bg-primary" data-kt-drawer="true" data-kt-drawer-name="aside" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_aside_toggle">
    <!--begin::Logo-->
    <div class="aside-logo d-none d-lg-flex flex-column align-items-center flex-column-auto py-8" id="kt_aside_logo" >
      <router-link to="/dashboard">
        <img alt="Logo" :src="getAssetPath('media/logos/demo4.svg')" class="h-55px" />
      </router-link>
    </div>
    <!--end::Logo-->

    <!--begin::Nav-->
    <div class="aside-nav d-flex flex-column align-lg-center flex-column-fluid w-100 pt-5 pt-lg-0" id="kt_aside_nav" >
      <KTMenu />
    </div>
    <!--end::Nav-->

    <!--begin::Footer-->
    <div class="aside-footer d-flex flex-column align-items-center flex-column-auto" id="kt_aside_footer" >
      <!--begin::Menu-->
      <div class="mb-7" v-on:click="this.logout">
        <button type="button" class="btn btm-sm btn-icon btn-color-white btn-active-color-primary btn-active-light" data-kt-menu-trigger="click" data-kt-menu-placement="top-start">
          <KTIcon icon-name="reply" icon-class="fs-2 fs-lg-1" />
          <i class="la la-power-off fs-2x"></i>
        </button>
      </div>
      <!--end::Menu-->
    </div>
    <!--end::Footer-->
  </div>
  <!--end::Aside-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { useI18n } from "vue-i18n";
import KTMenu from "@/layouts/main-layout/aside/Menu.vue";
import { asideTheme } from "@/core/helpers/config";
import axios from 'axios';

export default {
  name: "KTAside",
  components: {
    KTMenu,
  },
  props: {
    lightLogo: String,
    darkLogo: String,
  },
  setup() {
    const { t } = useI18n();

    return {
      asideTheme,
      t,
      getAssetPath,
    };
  },
  methods: {
    logout() {
      axios({
          method: 'delete',
          url: `${import.meta.env.VITE_HOST}/auth/logout`,
          headers: {
            Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
            refreshtoken: this.$store.getters.getRefreshToken
          }
        })
        .then(value => {
          this.$router.push({ name: "login" });
			    this.$store.commit('resetUser');
        })
        .catch(error => {
          if(error.code) {
            console.log(error.response.data);
          } else console.log(error);

          this.$router.push({ name: "login" });
			    this.$store.commit('resetUser');
        });
    }
  }
}
</script>
