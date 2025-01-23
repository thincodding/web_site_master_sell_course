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
        <div class="absolute mt-2 top-52 left-24">
          <div class="px-5 py-3 bg-white shadow-xl w-96">
            <div>
              <h2 class="text-[20px]  font-bold font-KhmerMoul text-background">{{ img.title }}</h2>
              <p class="text-[15px] text-background my-2" v-html="img.descripton"></p>
            </div>
            <div class="mt-5 mb-4">
              <a href="/advisorRegister"
                class="bg-background hover:bg-background/90 w-full p-3 font-bold text-white text-[15px]">
                {{ $t('register') }}
                </a>
            </div>
          </div>
        </div>
      </swiper-slide>
      <div class="button-pre-slide cursor-pointer rounded-full text-white absolute top-[43%] left-4 z-10">
        <div class="flex items-center justify-center rounded-full w-9 h-9 bg-background hover:bg-background/90">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </div>
      </div>

      <div class="button-next-slide cursor-pointer rounded-full text-white absolute top-[43%] right-4 z-10">
        <div class="flex items-center justify-center rounded-full w-9 h-9 bg-background hover:bg-background/90">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="font-bold size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>

        </div>
      </div>

    </swiper>
  </div>

  <!-- laptop -->
  <div class="hidden xl:hidden lg:block md:hidden">
    <swiper :navigation="{
      nextEl: '.button-next-slide',
      prevEl: '.button-pre-slide'

    }" :loop="true" :modules="modules" :speed="800" class="mySwiper relative  xl:w-[1200px] ">

      <swiper-slide v-for="img in arr_image" :key="img">
        <div class="flex justify-center">
          <img :src="img.image" class="w-full" alt="">
        </div>
        <div class="absolute mt-2 top-48 left-24">
          <div class="px-5 py-3 bg-white shadow-xl w-96">
            <div>
              <h2 class="text-[20px]  font-bold font-KhmerMoul text-background">{{ img.title }}</h2>
              <p class="text-[15px] text-background my-2" v-html="img.descripton"></p>
            </div>
            <div class="mt-5 mb-4">
              <!-- <router-link to="#"
                class="bg-background hover:bg-background/90  w-full p-3 font-bold text-white text-[15px]">
                ចុះឈ្មោះឥឡូវនេះ
                </router-link> -->
                <a href="/advisorRegister"
                class="bg-background hover:bg-background/90 w-full p-3 font-bold text-white text-[15px]">
                {{ $t('register') }}
                </a>
            </div>
          </div>
        </div>
      </swiper-slide>

    </swiper>
  </div>


  <!-- template, ipad -->
  <div class="relative hidden w-full xl:hidden lg:hidden md:block">
    <swiper :navigation="{
      nextEl: '.button-next-slide',
      prevEl: '.button-pre-slide'
    }" :loop="true" :modules="modules" :speed="800" class="mySwiper ">

      <swiper-slide v-for="img in arr_image" :key="img">
        <div class="flex justify-center">
          <img :src="img.image" class="w-full " alt="">
        </div>

        <div class="relative p-6 -mt-52">
          <div class="p-5 py-3 bg-white shadow-md w-80 ml-7 ">
            <div>
              <h2 class="text-[18px]  font-bold font-KhmerMoul text-background">{{ img.title }}</h2>
              <p class="text-[14px] text-background my-2" v-html="img.descripton"></p>
            </div>
            <div class="mt-5 mb-4">
              <a href="/advisorRegister"
                class="bg-background hover:bg-background/90 w-full p-3 font-bold text-white text-[15px]">
                {{ $t('register') }}
                </a>
            </div>
          </div>
        </div>
      </swiper-slide>

    </swiper>
  </div>

  <!-- mobile phone  -->

  <div class="w-full xl:hidden lg:hidden md:hidden">
    <swiper :navigation="{
      nextEl: '.button-next-slide',
      prevEl: '.button-pre-slide'
    }" :loop="true" :modules="modules" :speed="800" class="mySwiper ">

      <swiper-slide v-for="img in arr_image" :key="img">
        <div class="">
          <img :src="img.image" class="w-full h-[250px] object-cover" alt="">
        </div>

        <div class="">
          <div class="w-full p-6 ">
            <div>
              <h2 class="text-[16px]  font-bold font-KhmerMoul text-background">{{ img.title }}</h2>
              <p class="text-[14px] text-background my-2" v-html="img.descripton"></p>
            </div>
            <div class="flex justify-center w-full p-3 mt-5 mb-4 bg-background hover:bg-background/90">
              <!-- <router-link to="#" class="">ចុះឈ្មោះឥឡូវនេះ</router-link> -->
              <a href="/advisorRegister"
                class="font-bold text-white text-[16px]]">
                {{ $t('register') }}
                </a>
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

import getCollection from '@/firebase/getCollection';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {


    const {document:arr_image } = getCollection('banners')
    
    // const arr_image = ref([
    //   {
    //     image: 'https://firebasestorage.googleapis.com/v0/b/quasar-master-it-learn-online.appspot.com/o/files%2F2024-04-09T08%3A36%3A57.990Zphoto_2024-04-09_15-34-43.jpg?alt=media&token=6a7130d0-bc6a-40a4-a57c-c3097b3ff7dc',
    //     re_image: "https://firebasestorage.googleapis.com/v0/b/quasar-master-it-learn-online.appspot.com/o/files%2F2024-04-09T08%3A36%3A57.990Zphoto_2024-04-09_15-34-43.jpg?alt=media&token=6a7130d0-bc6a-40a4-a57c-c3097b3ff7dc",
    //     title: 'វគ្គជំនាញគ្រប់គ្រងទិន្ន័យ',
    //     subTitle: 'ជួយឱ្យលោកអ្នកចេះបង្កើតប្រព័ន្ធគ្រប់គ្រងទិន្នន័យមានលក្ខណៈបត់បែនដោយខ្លួនឯង និងត្រូវតាមតម្រូវការ',
    //     button: "ចុះឈ្មោះឥឡូវនេះ"
    //   },
    //   {
    //     image: 'https://firebasestorage.googleapis.com/v0/b/quasar-master-it-learn-online.appspot.com/o/files%2F2024-04-09T08%3A32%3A42.169Zphoto_2024-04-09_15-27-46.jpg?alt=media&token=7eb1341c-bc24-4a6f-b20e-6863ffec46fd',
    //     re_image: 'https://firebasestorage.googleapis.com/v0/b/quasar-master-it-learn-online.appspot.com/o/files%2F2024-04-09T08%3A32%3A42.169Zphoto_2024-04-09_15-27-46.jpg?alt=media&token=7eb1341c-bc24-4a6f-b20e-6863ffec46fd',
    //     title: 'សិក្សាលើវគ្គរចនាគេហទំព័រ',
    //     subTitle: 'លោកអ្នកអាចចេះរចនានិងបង្កើតគេហទំព័របានស្រស់ស្អាត ទាក់ទាញ ទាន់សម័យ ។',
    //     button: "ចុះឈ្មោះឥឡូវនេះ"
    //   }
    // ])

    return {
      modules: [Navigation],
      arr_image
    };
  },
};
</script>

<style scoped></style>
