<template>
    <div class="bg-[#f7f9fa] p-4 mb-10 md:my-5 select-none">
      <div class="xl:w-[1200px] mx-auto md:py-5">
        <!-- Image container with grid layout and overflow-x-auto for horizontal scroll -->
        <div class="grid grid-flow-col gap-5 overflow-x-auto auto-cols-max scrollbar-hide">
          <div v-for="img in image_banner" :key="img.id" class="w-[150px] lg:w-[200px] border">
            <img class="object-contain w-full h-full" :src="img.image" alt="">
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import getCollection from '@/firebase/getCollection';
  
  export default {
    setup() {
      // Fetch the image_banner from Firebase collection
      const { document: image_banner } = getCollection('partner');
      return { image_banner };
    }
  };
  </script>
  
  <!-- Style for hiding the scrollbar -->
  <style>
  /* Optional: Hide the scrollbar */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  </style>
  