<template>
    <div>
      <div class="sticky z-10 group">
        <div
          style="box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;"
          class="bg-white shadow-lg "
          v-motion
          :initial="{ scale: 0.9 }"
          :visible="{ opacity: 1, scale: 1 }"
        >
          <div class="flex justify-center p-2 space-x-1">
            <button
              class="flex items-center gap-1 p-2 px-5 text-sm border border-background hover:bg-gray-50"
              @click="handleSwitchLanguage('en')"
              :class="{ 'bg-gray-100 ': locale === 'en' }"
            >
              <!-- <img
                class="w-4"
                src="https://cdn.britannica.com/79/4479-050-6EF87027/flag-Stars-and-Stripes-May-1-1795.jpg"
                alt="English"
              /> -->
              <span class="capitalize">{{ $t('en') }}</span>
            </button>
  
            <!-- <div>{{ $t('free') }}</div> -->
            <button
              class="flex items-center justify-between p-2 px-6 text-sm border 1 just border-background hover:bg-gray-50"
              @click="handleSwitchLanguage('kh')"
              :class="{ 'bg-gray-100': locale === 'kh' }"
            >
             
              <span class="capitalize">{{ $t('kh') }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
<script>
import { useI18n } from 'vue-i18n';
import {handleMessageSuccess } from '../js/messageHandler';

export default {
    props:["handleSwitchLanguages"],
  setup(props) {
    const {t, locale } = useI18n({ useScope: 'global' });
    
    locale.value = localStorage.getItem('locale') || 'en';

    const handleSwitchLanguage = (language) => {
      locale.value = language; 
      localStorage.setItem('locale', language); 
      handleMessageSuccess(t('languageChange'));
      props.handleSwitchLanguages();
    };

    return {
      handleSwitchLanguage,
      locale,
    };
  },
};
</script>
  