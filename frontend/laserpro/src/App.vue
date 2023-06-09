<template>
  <div>
      <router-view v-on:open-modal="this.openMessageModal"/>
      <MessageModal :class="{ 'show': this.messageModalOpen }" v-bind:msg="this.modalMessage" v-on:close-modal="this.closeMessageModal" />  
  </div>
</template>

<script lang="ts">
import { nextTick, onBeforeMount, onMounted } from "vue";
import { useConfigStore } from "@/stores/config";
import { useThemeStore } from "@/stores/theme";
import { themeConfigValue } from "@/core/helpers/config";
import { initializeComponents } from "@/core/plugins/keenthemes";
import MessageModal from "@/components/modals/MessageModal.vue";

export default {
  name: "app",
  components: {
    MessageModal
  },
  data() {
    return {
      messageModalOpen: false,
			modalMessage: ""
    }
  },
  setup() {
    const configStore = useConfigStore();
    const themeStore = useThemeStore();

    onBeforeMount(() => {
      /**
       * Overrides the layout config using saved data from localStorage
       * remove this to use static config (@/core/config/DefaultLayoutConfig.ts)
       */
      configStore.overrideLayoutConfig();

      /**
       *  Sets a mode from configuration
       */
      themeStore.setThemeMode(themeConfigValue.value);
    });

    onMounted(() => {
      nextTick(() => {
        initializeComponents();
      });
    });
  },
  methods: {
    openMessageModal(msg) {
			this.modalMessage = msg;
			this.messageModalOpen = true;
		},
		closeMessageModal() {
			this.messageModalOpen = false;
		}
  }
}
</script>

<style lang="scss">
@import "bootstrap-icons/font/bootstrap-icons.css";
@import "apexcharts/dist/apexcharts.css";
@import "quill/dist/quill.snow.css";
@import "animate.css";
@import "sweetalert2/dist/sweetalert2.css";
@import "nouislider/distribute/nouislider.css";
@import "@fortawesome/fontawesome-free/css/all.min.css";
@import "socicon/css/socicon.css";
@import "line-awesome/dist/line-awesome/css/line-awesome.css";
@import "dropzone/dist/dropzone.css";
@import "@vueform/multiselect/themes/default.css";
@import "prism-themes/themes/prism-shades-of-purple.css";
@import "element-plus/dist/index.css";

// Main demo style scss
@import "assets/fonticon/fonticon.css";
@import "assets/keenicons/duotone/style.css";
@import "assets/keenicons/outline/style.css";
@import "assets/keenicons/solid/style.css";
@import "assets/sass/element-ui.dark";
@import "assets/sass/plugins";
@import "assets/sass/style";

#app {
  display: contents;
}
</style>
