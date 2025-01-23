<template>
  <div class="flex flex-col h-screen">
    <div class="">
      <NavbarViewVue />

    </div>
    <!-- <div class="h-screen mb-auto">
    <SlideComponentVue/>

  </div> -->

    <div>
      <SlideComponentVue />
    </div>
    <div>
      <BannerHomeView />
    </div>
    <div>
      <SelectionCourse />
    </div>
    <div>
      <LearnerViewingView />
    </div>

    <div class="mt-5">
      <TopCategory />
    </div>

    <div class="mb-auto">
      <FeaturedTopicByCategory />
    </div>

    <div class="">
      <FooterViewVue />
    </div>
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
