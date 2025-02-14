<template>
  <div class="hidden px-6 py-2 bg-white lg:block"
    style="box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;">
    <div class="flex items-center justify-between">

      <div class="flex items-center w-full space-x-5 xl:mr-5 ">
        <!-- <router-link to="/">
          <img class="w-[91px] h-[50px] object-contain" src="../assets/logo_mater_it.jpg" alt="">
        </router-link> -->
        <!-- <div class="text-[14px] font-[400] text-[#2D2f31] cursor-pointer hover:text-indigo-400"></div> -->

        <!-- <div class="relative group ">
          <div
            class="text-[15px] font-bold group-hover:block   text-[#2D2f31] cursor-pointer group-hover:text-background/70 text-nowrap">
            {{ $t('category') }}</div>

          <div class="absolute right-0 z-10 w-20 bg-transparent cursor-pointer h-14 top-5 ">
          </div>
          <div class="absolute hidden top-14 group-hover:block ">
            <CategoryDropdownVue />
          </div>
        </div> -->

        <div class="w-full px-1 ">
          <!-- <SearchComponentsVue /> -->
          <NavCategory />
        </div>
      </div>


      <div class="flex items-center space-x-5">
        <div class="relative group lg:hidden xl:block">
          <div
            class="text-[14px] group-hover:block font-[400] text-[#2D2f31] cursor-pointer group-hover:text-indigo-400 text-nowrap lg:hidden xl:block">
          </div>

          <!-- <div class="absolute right-0 z-10 bg-transparent cursor-pointer h-14 w-28 top-2">
          </div>
          <div class="absolute hidden right-60 top-14 group-hover:block ">
            <BussinessDropdownVue />
          </div> -->
        </div>

        <div v-if="user" class="relative group ">
          <!-- <router-link :to="{ name: 'freeCourse' }"
            class="text-[16px] group-hover:block font-bold  text-[#2D2f31] cursor-pointer group-hover:text-background/70 text-nowrap">
            {{ $t('free') }}
          </router-link> -->

          <!-- <div class="absolute right-0 z-10 bg-transparent cursor-pointer h-14 w-28 top-2">
          </div>
          <div class="absolute hidden right-64 top-14 group-hover:block ">
            <TeachUdemyDropdownVue />

          </div> -->
        </div>





        <!-- <div class="cursor-pointer hover:text-indigo-400">

        </div> -->

        <!-- <div class="relative">
          <div class="flex items-center space-x-2">

            <div v-if="!user" class="flex items-center space-x-2">
              <div class="border-[1px] border-black p-[6px] px-5 hover:bg-gray-200 cursor-pointer">
                <router-link to="/login" class="font-bold text-[14px] text-[#2D2f31] text-nowrap">{{ $t('login')
                  }}</router-link>
              </div>
              <div class=" bg-black p-[7px] px-5  cursor-pointer">
                <router-link to="/signup" class="font-bold text-[14px] text-white text-nowrap">{{ $t('signup')
                  }}</router-link>
              </div>
            </div>
            <div v-else class="">
            
              <div @click="isDrowdown = !isDrowdown"
                class="border-[1px] border-background bg-gray-50 w-10 h-10 mr-5 flex justify-center items-center rounded-full  hover:bg-gray-200 cursor-pointer">
                <div class="capitalize">{{ user?.displayName[0] }}</div>
           
              </div>
            </div>

            <div @click="handleSwitchLanguage"
              class="border-[1px] border-black p-[8px] px-2 hover:bg-gray-200 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-[20px] h-[20px]">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            </div>


          </div>
          <div v-if="isOpenDropdownFlag" class="absolute top-16 -right-0">
            <SwitchLanguage :handleSwitchLanguages="handleSwitchLanguage" />
          </div>
          <div v-if="isDrowdown">
            <div
              class=" w-28 shadow p-3 z-[10] absolute top-16 right-5 bg-white flex items-center gap-2 cursor-pointer hover:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-log-out">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" x2="9" y1="12" y2="12" />
              </svg>
              <p @click="handleSignout">{{ $t("logout") }}</p>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>


  <!-- mobile -->
  <div class="lg:hidden">
    <!-- Navigation bar -->
    <div style="box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;"
      class="px-5 py-3 bg-white">
      <div class="flex items-center justify-between">
        <div @click="handleIsopen">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>

        <div class="ml-10">
          <router-link to="/" class="flex items-center">
            <img class="w-[80px] h-[40px] object-contain" src="../assets/logo_mater_it.jpg" alt="">
            <p class="font-[600] text-background/90">{{ $t('logo') }}</p>
          </router-link>
        </div>

        <div class="flex gap-3 md:gap-6">
          <div>
            <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg> -->

            <div class="relative flex cursor-pointer group">
              <router-link :to="{ name: 'freeCourse' }" class="px-2 py-1 text-black">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
              </router-link>
              <span
                class="absolute px-1 m-4 mx-auto text-sm text-gray-100 transition-opacity -translate-x-1/2 translate-y-full bg-gray-800 rounded-md opacity-0 text-nowrap group-hover:opacity-100 left-1/2">ឥតគិតថ្លៃ</span>
            </div>

          </div>
          <div>
            <div class="relative flex cursor-pointer group">
              <router-link :to="{ name: 'help' }" class="py-1 text-black ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                </svg>
              </router-link>
              <span
                class="absolute px-1 m-4 mx-auto text-sm text-gray-100 transition-opacity -translate-x-1/2 translate-y-full bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 left-1/2">ជំនួយ</span>
            </div>

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
          class="absolute flex items-center justify-center w-12 h-12 bg-white rounded-full top-4 -right-16">
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
import { ref } from 'vue'

import CategoryDropdownVue from '@/components/client/CategoryDropdown.vue'
import getUser from '@/firebase/getUser'
import useSignout from '@/firebase/useSignout'
import { useRouter } from 'vue-router'
// import SearchComponent from '@/components/client/SearchComponent.vue'
// import SwitchLanguage from '@/components/client/SwitchLanguage.vue'
import NavCategory from '@/components/client/NavCategory.vue'
export default {
  components: {
    CategoryDropdownVue,
    // SearchComponent,
    // SwitchLanguage,
    NavCategory
  },

  setup() {

    const isOpen = ref(false)
    const isDrowdown = ref(false)
    const { user } = getUser()
    const router = useRouter();
    const { signOut } = useSignout()

    const isOpenDropdownFlag = ref(false)

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

    const handleSignout = async () => {
      if (window.confirm('Are you sure to sign out')) {
        await signOut()
        router.push({ name: 'login' });
        isDrowdown.value = false
      }
    }


    const handleSwitchLanguage = () => {
      isOpenDropdownFlag.value = !isOpenDropdownFlag.value;
    }
    return { isOpen, handleIsopen, isDrowdown, user, handleSignout, isOpenDropdownFlag, handleSwitchLanguage }
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