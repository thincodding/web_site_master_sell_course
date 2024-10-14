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
  <div>
    <SelectionCourse/>
  </div>
  <div>
    <LearnerViewingView/>
  </div>
  
  <div class="mt-5">
    <TopCategory/>
  </div>

  <div>
    <FeaturedTopicByCategory/>
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
import LearnerViewingView from '@/components/client/LearnerViewingView.vue'
import TopCategory from '@/components/client/TopCategory.vue'
import FeaturedTopicByCategory from '@/components/client/FeaturedTopicByCategory.vue'
import SelectionCourse from '@/components/client/SelectionCourse.vue'

export default {
  name: 'HomeView',
  components: {
    FooterViewVue,
    // BussinessDropdownVue,
    NavbarViewVue,
    SlideComponentVue,
    BannerHomeView,
    LearnerViewingView,
    TopCategory,
    FeaturedTopicByCategory,
    SelectionCourse
  }
}
</script>
