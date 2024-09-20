<template>

  <!-- desk top -->
  <div class="hidden xl:block">
    <swiper :navigation="{
      nextEl: '.button-next-slide',
      prevEl: '.button-pre-slide'

    }" :loop="true" :modules="modules" :speed="800" :allowTouchMove="false" class="mySwiper relative  xl:w-[1200px] ">

      <swiper-slide v-for="img in arr_image" :key="img">
        <div class="flex justify-center">
          <img :src="img.image" class="w-full" alt="">
        </div>
          <div class="absolute top-12 mt-2 left-16">
              <div class="w-96 bg-white shadow-xl py-3 px-5">
                <div>
                  <h2 class="text-[30px] font-nato font-bold">{{ img.title }}</h2>
                 <p class="text-[15px] text-background my-2">{{ img.subTitle }}</p>
                </div>
                  <div class="mt-5 mb-4">
                    <router-link to="#" class="bg-background hover:bg-background/90 w-full p-3 font-bold text-white text-[15px]">{{ img.button }}</router-link>
                  </div>
              </div>
          </div>
      </swiper-slide>
      <div class="button-pre-slide cursor-pointer rounded-full text-white absolute top-[43%] left-4 z-10">
        <div class="flex justify-center w-9 h-9 items-center  bg-background rounded-full hover:bg-background/90">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        </div>
      </div>

      <div class="button-next-slide cursor-pointer rounded-full text-white absolute top-[43%] right-4 z-10">
        <div class="flex justify-center w-9 h-9 items-center  bg-background rounded-full hover:bg-background/90">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-5 font-bold">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>

        </div>
      </div>

    </swiper>
  </div>

<!-- laptop -->
  <div class="xl:hidden lg:block hidden md:hidden">
    <swiper :navigation="{
      nextEl: '.button-next-slide',
      prevEl: '.button-pre-slide'

    }" :loop="true" :modules="modules" :speed="800"  class="mySwiper relative  xl:w-[1200px] ">

      <swiper-slide v-for="img in arr_image" :key="img">
        <div class="flex justify-center">
          <img :src="img.image" class="w-full" alt="">
        </div>
          <div class="absolute top-8 mt-2 left-16">
              <div class="w-96 bg-white shadow-xl py-3 px-5">
                <div>
                  <h2 class="text-[30px] font-nato font-bold">{{ img.title }}</h2>
                 <p class="text-[15px] text-background my-2">{{ img.subTitle }}</p>
                </div>
                  <div class="mt-5 mb-4">
                    <router-link to="#" class="bg-background hover:bg-background/90  w-full p-3 font-bold text-white text-[15px]">{{ img.button }}</router-link>
                  </div>
              </div>
          </div>
      </swiper-slide>
      
    </swiper>
  </div>


<!-- template, ipad -->
<div class="xl:hidden lg:hidden w-full hidden relative  md:block">
  <swiper :navigation="{
      nextEl: '.button-next-slide',
      prevEl: '.button-pre-slide'
    }" :loop="true" :modules="modules" :speed="800" class="mySwiper ">
    
    <swiper-slide v-for="img in arr_image" :key="img">
      <div class="flex justify-center">
        <img :src="img.image" class="w-full " alt="">
      </div>
  
      <div class="relative -mt-52  p-6">
        <div class="w-80 bg-white shadow-md py-3 ml-7 p-5 ">
          <div>
            <h2 class="text-[24px] font-nato font-bold">{{ img.title }}</h2>
            <p class="text-[14px] text-background my-2">{{ img.subTitle }}</p>
          </div>
          <div class="mt-5 mb-4">
            <router-link to="#" class="bg-background w-full p-3 font-bold text-white text-[15px]">{{ img.button }}</router-link>
          </div>
        </div>
      </div>
    </swiper-slide>
    
  </swiper>
</div>

<!-- mobile phone  -->

<div class="xl:hidden lg:hidden w-full     md:hidden">
  <swiper :navigation="{
      nextEl: '.button-next-slide',
      prevEl: '.button-pre-slide'
    }" :loop="true" :modules="modules" :speed="800" class="mySwiper ">
    
    <swiper-slide v-for="img in arr_image" :key="img">
      <div class="">
        <img :src="img.re_image" class="w-full h-[250px] object-cover " alt="">
      </div>
  
      <div class="">
        <div class="w-full  p-6  ">
          <div>
            <h2 class="text-[24px] font-nato font-bold">{{ img.title }}</h2>
            <p class="text-[14px] text-background my-2">{{ img.subTitle }}</p>
          </div>
          <div class="mt-5 mb-4 w-full bg-background flex justify-center p-3 hover:bg-background/90" >
            <router-link to="#" class=" font-bold text-white text-[16px] ">{{ img.button }}</router-link>
          </div>
        </div>
      </div>
    </swiper-slide>
    
  </swiper>
</div>


</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/navigation';



// import required modules
import { Navigation } from 'swiper/modules';
import { ref } from 'vue';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {

    const arr_image = ref([
      {
        image: 'https://img-b.udemycdn.com/notices/home_carousel_slide/image/12c0830f-aa27-4843-993d-b440aa389991.jpeg',
        re_image: "https://img-b.udemycdn.com/notices/home_carousel_slide/image_responsive/bc821b9d-badc-4c76-a6b5-b6d241834e11.jpeg",
        title: 'Skills that drive you forward',
        subTitle: 'Technology and the world of work change fast — with us, you’re faster. Get the skills to achieve goals and stay competitive.',
        button: "Plan for organizations "
      },
      {
        image: 'https://img-b.udemycdn.com/notices/home_carousel_slide/image/bb0acdaf-d3e9-41dc-9d51-bfcf2b526ba1.jpg',
        re_image: 'https://img-b.udemycdn.com/notices/home_carousel_slide/image_responsive/77a9388f-7601-4394-9288-21004e2f8a57.jpg',
        title: 'This podcast is for the leaders',
        subTitle: 'And those who will be. Learn to work, lead, and live better with new episodes of Leading Up dropping each Wednesday.',
        button: "Liten now "
      }
    ])

    return {
      modules: [Navigation],
      arr_image
    };
  },
};
</script>
