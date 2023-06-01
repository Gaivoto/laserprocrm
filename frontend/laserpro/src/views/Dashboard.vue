<template>
  <div class="row g-5 g-xl-8">
    <!--
    <div class="col-xxl-4">
      <MixedWidget5
        widget-classes="card-xxl-stretch"
        chart-color="warning"
        chart-height="150"
      />
    </div>
    

    
    <div class="col-xxl-8">
      <TablesWidget9 widget-classes="card-xxl-stretch mb-5 mb-xl-8" />
    </div>
    
  </div>
  

  
  <div class="row gy-5 g-xl-8">
    
    <div class="col-xl-4">
      <ListsWidget5 widget-classes="card-xl-stretch mb-xl-8" />
    </div>
    

    
    <div class="col-xl-4">
      <MixedWidget11
        widget-classes="card-xl-stretch mb-5 mb-xl-8"
        widget-color="primary"
        chart-height="225"
      />
    </div>
    

    
    <div class="col-xl-4">
      <ListsWidget4 widget-classes="card-xl-stretch mb-5 mb-xl-8" />
    </div>
    
  </div>
  

  
  <div class="row gy-0 gx-5 gx-xl-8">
    
    <div class="col-xl-4">
      <MixedWidget9
        widget-classes="card-xl-stretch mb-5 mb-xl-0"
        image="media/svg/brand-logos/plurk.svg"
        time="7 hours ago"
        title="PitStop - Multiple Email Generator"
        description="Pitstop creates quick email campaigns.<br/>
We help to strengthen your brand."
      />
    </div>
    

    
    <div class="col-xl-4">
      <MixedWidget9
        widget-classes="card-xl-stretch mb-5 mb-xl-0"
        image="media/svg/brand-logos/telegram.svg"
        time="10 days ago"
        title="ReactJS Admin Theme"
        description="Keenthemes uses the latest and greatest<br/>
      frameworks for complete modernization."
      />
    </div>
    

    
    <div class="col-xl-4">
      <MixedWidget9
        widget-classes="card-xl-stretch mb-5 mb-xl-0"
        image="media/svg/brand-logos/vimeo.svg"
        time="2 weeks ago"
        title="KT.com - High Quality Templates"
        description="Easy to use, incredibly flexible and secure<br/>
      with in-depth documentation that outlines."
      />
    </div>
    -->
  </div>
</template>

<script>
import { onMounted, onUnmounted } from "vue";
import LayoutService from "@/core/services/LayoutService";
import { LS_CONFIG_NAME_KEY } from "@/stores/config";

export default {
  name: "main-dashboard",
  components: {
  },
  setup() {
    onMounted(() => {
      if (!localStorage.getItem(LS_CONFIG_NAME_KEY)) {
        LayoutService.enableToolbar();
      }
    });

    onUnmounted(() => {
      if (!localStorage.getItem(LS_CONFIG_NAME_KEY)) {
        LayoutService.disableToolbar();
      }
    });
  },
  mounted() {
    this.$emit("open-modal", "usernamePasswordEmpty");
  }
}
</script>
