<template>
  <!-- begin:: Body -->
  <div class="page d-flex flex-row flex-column-fluid" v-on:open-modal="bruh">
    <!-- begin:: Aside Left -->
    <KTAside v-if="asideEnabled" :lightLogo="themeLightLogo" :darkLogo="themeDarkLogo" />
    <!-- end:: Aside Left -->

    <div id="kt_wrapper" class="d-flex flex-column flex-row-fluid wrapper">
      <KTHeader />

      <KTToolbar v-if="subheaderDisplay" />

      <!-- begin:: Content -->
      <div id="kt_content" class="content d-flex flex-column flex-column-fluid">
        <!-- begin:: Content Body -->
        <div class="post d-flex flex-column-fluid">
          <div id="kt_content_container" :class="{ 'container-fluid': contentWidthFluid, 'container-xxl': !contentWidthFluid, }" >
            <router-view v-on:open-modal="openModal" />
          </div>
        </div>
        <!-- end:: Content Body -->
      </div>
      <!-- end:: Content -->
      <KTFooter />
    </div>
  </div>
  <!-- end:: Body -->
  <KTScrollTop />
</template>

<script lang="ts">
import {
  defineComponent,
  nextTick,
  onBeforeMount,
  onMounted,
  watch,
} from "vue";
import { useRoute } from "vue-router";
import KTAside from "@/layouts/main-layout/aside/Aside.vue";
import KTHeader from "@/layouts/main-layout/header/Header.vue";
import KTFooter from "@/layouts/main-layout/footer/Footer.vue";
import KTToolbar from "@/layouts/main-layout/toolbar/Toolbar.vue";
import KTScrollTop from "@/layouts/main-layout/extras/ScrollTop.vue";
import { reinitializeComponents } from "@/core/plugins/keenthemes";
import {
  asideEnabled,
  contentWidthFluid,
  loaderEnabled,
  loaderLogo,
  subheaderDisplay,
  themeDarkLogo,
  themeLightLogo,
  toolbarDisplay,
} from "@/core/helpers/config";
import LayoutService from "@/core/services/LayoutService";

export default defineComponent({
  name: "main-layout",
  components: {
    KTAside,
    KTHeader,
    KTFooter,
    KTToolbar,
    KTScrollTop,
  },
  methods: {
    openModal(info) {
      this.$emit("open-modal", info)
    }
  },
  setup() {
    const route = useRoute();

    onBeforeMount(() => {
      LayoutService.init();
    });

    onMounted(() => {
      nextTick(() => {
        reinitializeComponents();
      });
    });

    watch(
      () => route.path,
      () => {
        nextTick(() => {
          reinitializeComponents();
        });
      }
    );

    return {
      toolbarDisplay,
      loaderEnabled,
      contentWidthFluid,
      loaderLogo,
      asideEnabled,
      subheaderDisplay,
      themeLightLogo,
      themeDarkLogo,
    };
  }
});
</script>
