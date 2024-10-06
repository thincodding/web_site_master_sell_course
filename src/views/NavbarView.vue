<template>
  <div class="hidden lg:block px-6 py-4 bg-white"
    style="box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;">
    <div class="flex justify-between items-center">

      <div class="flex space-x-5 items-center w-full  xl:mr-5 ">
        <router-link to="/">
          <img class="w-[91px] h-[34px]" src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg" alt="">
        </router-link>
        <!-- <div class="text-[14px] font-[400] text-[#2D2f31] cursor-pointer hover:text-indigo-400"></div> -->

        <div class="relative group ">
          <div
            class="text-[14px] group-hover:block  font-[400] text-[#2D2f31] cursor-pointer group-hover:text-indigo-400 text-nowrap">
            Categories</div>

          <div class="h-14 w-20 right-0 bg-transparent absolute top-5 z-10 cursor-pointer ">
          </div>
          <div class="absolute top-14 hidden group-hover:block  ">
            <CategoryDropdownVue />
          </div>
        </div>

        <div class="px-1 w-full ">
          <SearchComponentsVue />

        </div>
      </div>


      <div class="flex space-x-5 items-center">
        <div class="relative group lg:hidden xl:block">
          <div
            class="text-[14px] group-hover:block font-[400] text-[#2D2f31] cursor-pointer group-hover:text-indigo-400 text-nowrap lg:hidden xl:block">
            Udemy Business</div>

          <div class="h-14 w-28 right-0  bg-transparent absolute top-2 cursor-pointer z-10">
          </div>
          <div class="absolute right-60 top-14 hidden group-hover:block ">
            <BussinessDropdownVue />
          </div>
        </div>

        <div class="relative group ">
          <div
            class="text-[14px] group-hover:block  font-[400] text-[#2D2f31] cursor-pointer group-hover:text-indigo-400 text-nowrap">
            Teach on
            Udemy</div>

          <div class="h-14 w-28 right-0  bg-transparent absolute top-2 cursor-pointer z-10">
          </div>
          <div class="absolute right-64 hidden top-14 group-hover:block ">
            <TeachUdemyDropdownVue />
          </div>
        </div>


        <div class="relative group  ">
          <div
            class="text-[14px] group-hover:block  font-[400] text-[#2D2f31] cursor-pointer group-hover:text-indigo-400 text-nowrap">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-[24px] h-[24px] ">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </div>

          <div class="h-14 w-10 right-0  bg-transparent absolute top-2 cursor-pointer ">
          </div>
          <div class="absolute right-64 top-14 hidden  group-hover:block ">
            <CartDropdownVue />
          </div>
        </div>


        <div class="cursor-pointer hover:text-indigo-400">

        </div>

        <div class="flex items-center space-x-2">
          <div class="border-[1px] border-black p-[6px] px-5 hover:bg-gray-200 cursor-pointer">
            <router-link to="/" class="font-bold text-[14px] text-[#2D2f31] text-nowrap">Log in</router-link>
          </div>
          <div class=" bg-black p-[7px] px-5  cursor-pointer">
            <router-link to="/" class="font-bold text-[14px] text-white text-nowrap">Sign up</router-link>
          </div>
          <div class="border-[1px] border-black p-[8px] px-2 hover:bg-gray-200 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-[20px] h-[20px]">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>

          </div>
        </div>
      </div>


    </div>
  </div>



  <!-- mobile -->

  <div class="lg:hidden">
    <!-- Navigation bar -->
    <div style="box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;"
      class="bg-white px-5 py-3">
      <div class="flex justify-between items-center">
        <div @click="handleIsopen">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>

        <div class="ml-10">
          <router-link to="/">
          <img class="w-[80px] h-[30px]" src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg" alt="">
        </router-link>
        </div>

        <div class="flex gap-7 md:gap-6">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Sidebar and Overlay -->

    <div :class="isOpen ? 'fixed inset-0 bg-black/65 z-10 transition-opacity duration-300 ease-out' : 'hidden'"
      @click="handleIsopen"></div>

    <div
      :class="isOpen ? 'w-[65%] md:w-[37%] bg-white shadow-sm fixed top-0 left-0 h-screen z-20 transition-transform duration-300 ease-out transform translate-x-0' : 'w-[65%] md:w-[37%] bg-white shadow-sm fixed top-0 left-0 h-screen z-20 transition-transform duration-300 ease-out transform -translate-x-full'">
      <div class="">

        <div>
          <CategoryDropdownVue />
        </div>
        <button @click="handleIsopen" :class="!isOpen ? 'hidden' : ''" v-motion :initial="{ scale: 0.9, opacity: 0 }"
          :visible="{ opacity: 1, scale: 1, transition: { delay: 450, ease: 'easeInOut', duration: 140 } }"
          class="bg-white w-12 h-12 rounded-full absolute top-4 -right-16 flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>





</template>

<script>
import SearchComponentsVue from '@/components/client/SearchComponent.vue'
import BussinessDropdownVue from '@/components/client/BussinessDropdown.vue'
import TeachUdemyDropdownVue from '@/components/client/TeachUdemyDropdown.vue'
import CartDropdownVue from '@/components/client/CartDropdown.vue'
import CategoryDropdownVue from '@/components/client/CategoryDropdown.vue'
import { ref } from 'vue'
export default {
  components: {
    SearchComponentsVue,
    BussinessDropdownVue,
    TeachUdemyDropdownVue,
    CartDropdownVue,
    CategoryDropdownVue
  },

  setup() {

    const isOpen = ref(false)


    const handleIsopen = () => {
      isOpen.value = !isOpen.value
      toggleScroll(isOpen.value);

    }



    //disable scroll
    const disableScroll = () => {
      document.body.style.overflow = 'hidden';
    };


    const enableScroll = () => {
      document.body.style.overflow = '';
    };

    const toggleScroll = (disable) => {
      if (disable) {
        disableScroll();
      } else {
        enableScroll();
      }
    };

    return { isOpen, handleIsopen }
  }
}
</script>

<style>
::-webkit-scrollbar {
  display: none;
}

* {
  scrollbar-width: none;
}

.slide-fade-enter-active {
  transition: all 0.3s;
}

.slide-fade-leave-active {
  transition: all 0.3s;
  transform: translateX(-20px);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  /* transform: translateX(-20px); */
  opacity: 0;
}
</style>