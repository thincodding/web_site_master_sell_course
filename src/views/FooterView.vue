<template>
  <div class="px-5 bg-background md:px-12 py-7">
    <div class="md:flex md:justify-between ">
      <div class="mb-5 md:hidden">
    
        <div class="flex p-2 space-x-1">
            <button
              class="flex items-center justify-between gap-1 p-2 px-6 text-sm text-white border border-white hover:bg-gray-500"
              @click="handleSwitchLanguage('en')"
              :class="{ 'bg-gray-600 text-background': locale === 'en' }"
            >
            <img class="w-5" src="@/assets/flag-Stars-and-Stripes-May-1-1795.webp" alt="">

              <span class="capitalize">{{ $t('en') }}</span>
            </button>
  
            <!-- <div>{{ $t('free') }}</div> -->
            <button
              class="flex items-center justify-between gap-1 p-2 px-6 text-sm text-white border border-white hover:bg-gray-500"
              @click="handleSwitchLanguage('kh')"
              :class="{ 'bg-gray-600 text-background': locale === 'kh' }"
            >
            <img class="w-5" src="@/assets/Flag_of_Cambodia.svg.png" alt="">
        
              <span class="capitalize">{{ $t('kh') }}</span>
            </button>
          </div>
      </div>
      <div class=" md:flex md:justify-between lg:gap-40 md:grap-10 md:space-x-10 lg:space-x-0 md:space-y-0">
        <div class="flex flex-col space-y-2 md:flex md:flex-col md">
          <router-link to="#" class="hover-text-underline">{{ $t('Master-IT_Bussiness') }}</router-link>
          <router-link to="#" class="hover-text-underline">{{ $t('Teach_on') }}</router-link>
          <router-link to="#" class="hover-text-underline">{{ $t('Get_the_app') }}</router-link>
          <router-link to="#" class="hover-text-underline">{{ $t('About_us') }}</router-link>
          <router-link to="#" class="hover-text-underline">{{ $t('Contact_us') }}</router-link>

        </div>
        <div class="flex flex-col mt-2 space-y-2 md:flex md:flex-col md:mt-0">
          <router-link to="#" class="hover-text-underline">{{ $t('Careers') }}</router-link>
          <router-link to="#" class="hover-text-underline">{{ $t('Blog') }}</router-link>
          <router-link to="#" class="hover-text-underline">{{ $t('Help_and_Support') }}</router-link>
          <router-link to="#" class="hover-text-underline">{{ $t('Affiliate') }}</router-link>
          <router-link to="#" class="hover-text-underline">{{ $t('Inventors') }}</router-link>
        </div>
        <div class="flex flex-col mt-2 space-y-2 md:flex md:flex-col md:mt-0">
          <router-link to="#" class="hover-text-underline">{{ $t('Terms') }}</router-link>
          <router-link to="#" class="hover-text-underline">{{ $t('Privacy_Policy') }}</router-link>
          <router-link to="#" class="hover-text-underline">{{ $t('Cookies_Settings') }}</router-link>
          <router-link to="#" class="hover-text-underline">{{ $t('Sitemap') }}</router-link>
          <router-link to="#" class="hover-text-underline">{{ $t('Accessibility') }}</router-link>
        </div>
      </div>
      <div>
      </div>
      <div class="hidden mb-5 md:block">
     

     <div class="flex p-2 space-x-1">
         <button
           class="flex items-center justify-between gap-1 p-2 px-6 text-sm text-white border border-white hover:bg-gray-500"
           @click="handleSwitchLanguage('en')"
           :class="{ 'bg-gray-600 text-background': locale === 'en' }"
         >
         <img class="w-5" src="@/assets/flag-Stars-and-Stripes-May-1-1795.webp" alt="">

           <span class="capitalize">{{ $t('en') }}</span>
         </button>

         <!-- <div>{{ $t('free') }}</div> -->
         <button
           class="flex items-center justify-between gap-1 p-2 px-6 text-sm text-white border border-white hover:bg-gray-500"
           @click="handleSwitchLanguage('kh')"
           :class="{ 'bg-gray-600 text-background': locale === 'kh' }"
         >
         <img class="w-5" src="@/assets/Flag_of_Cambodia.svg.png" alt="">
     
           <span class="capitalize">{{ $t('kh') }}</span>
         </button>
       </div>
   </div>
    </div>


    <div class="items-center justify-between mt-5 mb-3 space-y-2 md:flex md:mb-5 md:mt-14 md:space-y-0">
      <div>
        <img class="w-[91px] h-[34px] object-contain lg:w-full rounded-full" src="../assets/logo_mater_it.jpg" alt="">
      </div>
      <div class="">
        <p class="text-white text-[12px]">© {{ currentYear }} {{ $t('masterFooter') }}</p>
      </div>
    </div>


  </div>

</template>

<script>
import { useI18n } from 'vue-i18n';
import { handleMessageSuccess } from '@/components/js/messageHandler';

export default {

  setup() {
    const { t, locale } = useI18n({ useScope: 'global' });

    locale.value = localStorage.getItem('locale') || 'en';

    const handleSwitchLanguage = (language) => {
      locale.value = language;
      localStorage.setItem('locale', language);
      handleMessageSuccess(t('languageChange'));
  
    };


    return {
      currentYear: new Date().getFullYear(),
      handleSwitchLanguage,
      locale,
    }
  }
}
</script>

<style></style>