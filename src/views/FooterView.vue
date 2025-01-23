<template>
  <div class="px-5 bg-background md:px-12 py-7">
    <div class="md:flex md:justify-between ">
      <div class="mb-5 md:hidden">
        <div class="border-[1px] border-white w-[140px] pl-2 h-[40px] cursor-pointer flex  space-x-2 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-[20px] h-[20px] text-white">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
          </svg>

          <p class="text-white text-[14px]">English</p>

        </div>
      </div>
      <div class=" md:flex md:justify-between lg:gap-40 md:grap-10 md:space-x-10 lg:space-x-0 md:space-y-0">
        <div class="flex flex-col space-y-2 md:flex md:flex-col md">
          <router-link to="#" class="hover-text-underline">Master-IT Bussiness</router-link>
          <router-link to="#" class="hover-text-underline">Teach on Udemy</router-link>
          <router-link to="#" class="hover-text-underline">Get the app</router-link>
          <router-link to="#" class="hover-text-underline">About us</router-link>
          <router-link to="#" class="hover-text-underline">Contact us</router-link>

        </div>
        <div class="flex flex-col mt-2 space-y-2 md:flex md:flex-col md:mt-0">
          <router-link to="#" class="hover-text-underline">Careers</router-link>
          <router-link to="#" class="hover-text-underline">Blog</router-link>
          <router-link to="#" class="hover-text-underline">Help and Support</router-link>
          <router-link to="#" class="hover-text-underline">Affiliate</router-link>
          <router-link to="#" class="hover-text-underline">Inventors</router-link>
        </div>
        <div class="flex flex-col mt-2 space-y-2 md:flex md:flex-col md:mt-0">
          <router-link to="#" class="hover-text-underline">Terms</router-link>
          <router-link to="#" class="hover-text-underline">Privacy policy</router-link>
          <router-link to="#" class="hover-text-underline">Cookies settings</router-link>
          <router-link to="#" class="hover-text-underline">Sitemap</router-link>
          <router-link to="#" class="hover-text-underline">Accessibility statement</router-link>
        </div>
      </div>
      <div>
      </div>
      <div class="hidden md:block">
        <div class="border-[1px] border-white pl-4 p-[8px] pr-12 cursor-pointer flex  space-x-2 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-[20px] h-[20px] text-white">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
          </svg>
          <p class="text-white text-[14px]">English</p>
        </div>
      </div>
    </div>


    <div class="items-center justify-between mt-5 mb-3 space-y-2 md:flex md:mb-5 md:mt-14 md:space-y-0">
        <div>
          <img class="w-[91px] h-[34px] object-contain lg:w-full rounded-full" src="../assets/logo_mater_it.jpg" alt="">
        </div>
        <div class="">
          <p class="text-white text-[12px]">© 2025 {{ $t('masterFooter') }}</p>
        </div>
    </div>


  </div>

</template>

<script>
export default {

}
</script>

<style></style>