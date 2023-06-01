<template>
  <!--begin::Toolbar wrapper-->
  <div class="d-flex align-items-stretch flex-shrink-0">

    <!--begin::Theme mode-->
    <div class="d-flex align-items-center ms-1 ms-lg-3">
      <!--begin::Menu toggle-->
      <a href="#" class="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px" data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
        <KTIcon icon-name="night-day" icon-class="theme-light-show fs-2 fs-md-1" />
        <KTIcon icon-name="moon" icon-class="theme-dark-show fs-2 fs-md-1" />
      </a>
      <!--begin::Menu toggle-->
      <KTThemeModeSwitcher></KTThemeModeSwitcher>
    </div>
    <!--end::Theme mode-->

    <!--begin::User-->
    <div class="d-flex align-items-center ms-1 ms-lg-3" id="kt_header_user_menu_toggle" >
      <!--begin::Menu-->
      <div class="cursor-pointer symbol symbol-30px symbol-md-40px" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end" data-kt-menu-flip="bottom" >
        <p class="username">{{ this.$store.getters.getUser.username }}</p>
      </div>
      <!--end::Menu-->
    </div>
    <!--end::User -->

    <!--begin::Heaeder menu toggle-->
    <div class="d-flex align-items-center d-lg-none ms-2 me-n3" title="Show header menu" >
      <div class="btn btn-icon btn-active-light-primary btn-custom w-30px h-30px w-md-40px h-md-40px" id="kt_header_menu_mobile_toggle" >
        <KTIcon icon-name="text-align-left" icon-class="fs-1" />
      </div>
    </div>
    <!--end::Heaeder menu toggle-->
  </div>
  <!--end::Toolbar wrapper-->
</template>

<script>
import KTThemeModeSwitcher from "@/layouts/main-layout/theme-mode/ThemeModeSwitcher.vue";

export default {
  name: "layout-topbar",
  components: {
    KTThemeModeSwitcher
  }
}
</script>

<style scoped>
  .username {
    margin-bottom: 2px;
    margin-left: 8px;
    font-size: 16px;
  }
</style>