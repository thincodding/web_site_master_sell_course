<template>
  <div class="">
    <NavbarViewVue />

  </div>
  <!-- <div class="mb-auto h-screen">
    <SlideComponentVue/>

  </div> -->
  <div>
    <SlideComponentVue />
  </div>
  <div>
    <BannerHomeView />
  </div>

  <div class="">
    <FooterViewVue />
  </div>
</template>

<script>
import SlideComponentVue from '@/components/client/SlideComponent.vue'
// import BussinessDropdownVue from '@/components/client/BussinessDropdown.vue'
import FooterViewVue from './FooterView.vue'

import NavbarViewVue from './NavbarView.vue'
import BannerHomeView from '@/components/client/BannerHomeView.vue'


export default {
  name: 'HomeView',
  components: {
    FooterViewVue,
    // BussinessDropdownVue,
    NavbarViewVue,
    SlideComponentVue,
    BannerHomeView
  }
}
</script>
