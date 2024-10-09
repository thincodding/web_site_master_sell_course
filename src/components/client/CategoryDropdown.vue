<template>
    <div class="hidden lg:block">
        <div class="group w-full sticky top-[86px] z-10 -right-20">
            <div class="flex group">
                <!-- Categories -->
                <div style="box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;"
                    class="h-[500px] bg-white flex justify-center" @mouseleave="hoveredCategoryId = null" v-motion
                    :initial="{ scale: 0.9 }" :visible="{ opacity: 1, scale: 1 }">
                    <div class="p-4 w-60">
                        <div v-for="cate in category" :key="cate.id" class="cursor-pointer"
                            @mouseover="hoveredCategoryId = cate.id">
                            <router-link to="/"
                                class="text-[14px] text-[#2D2f31] font-[400] leading-8 hover:text-indigo-400 flex justify-between items-center capitalize">
                                <p :class="{ 'text-indigo-400': cate.id === hoveredCategoryId }">{{ cate.categoryName }}
                                </p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="size-3">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </router-link>
                        </div>
                    </div>

                    <!-- Subcategories -->
                    <div class="p-4 border-l w-60 relative" v-if="filteredSubcategories.length">
                        <p class="text-[14px] mt-1 font-bold text-[#6b6b6b]">Popular Topics</p>
                        <div v-for="sub in filteredSubcategories" :key="sub.id" class="relative mt-1">
                            <router-link :to="{ name: 'productdetail', params: { id: sub.id }  }"
                                class="text-[14px] text-[#2D2f31] font-[400] leading-8 hover:text-indigo-400"
                                @mouseover="activeSubcategoryId = sub.id" @click="handleClick(sub.id)"
                                :class="{ 'text-indigo-600': sub.id === activeSubcategoryId }">
                                <p>{{ sub.productName }}</p>
                            </router-link>

                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>

    <!-- Mobile View -->
    <div class="w-full lg:hidden h-screen overflow-hidden relative">
        <div class="flex flex-col space-y-3 p-4">
            <router-link to="/login" class="text-indigo-600 text-[15px]">Log in</router-link>
            <router-link to="/signup" class="text-indigo-600 text-[15px]">Sign up</router-link>
        </div>
        <hr>
        <div class="p-4">
            <p class="font-bold text-sm text-background my-1">Most Popular</p>
            <div v-for="cat in category" :key="cat.id">
                <div @click="handleIsopen(cat.id)"
                    class="leading-9 text-[14px] cursor-pointer flex justify-between capitalize items-center">
                    <p>{{ cat.categoryName }}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>
        </div>

        <!-- Subcategories Panel -->
        <div
            :class="isOpen ? 'w-full bg-white shadow-md h-full top-0 absolute transition-transform duration-300 ease-out transform translate-x-0' : 'w-full bg-white shadow-md h-screen top-0 absolute transition-transform duration-300 ease-out transform translate-x-full'">
            <div class="bg-[#F7F9FA] p-4 flex items-center space-x-4">
                <svg @click="handleIsopen(null)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="size-5 font-bold cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                <p class="text-[15px] text-background">Menu</p>
            </div>

            <div v-if="selectedCategory" class="px-5 mt-2 capitalize">
                <div v-for="sub in selectedCategory" :key="sub.id" class="leading-9 text-[14px]">
                    <router-link  :to="{name: 'productdetail', params: {id: sub.id} }" @click="handleClickSideBar(sub.id)">{{ sub.productName }}</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import getCollection from '@/firebase/getCollection';
import getDocument from '@/firebase/getDocument';
import {useRoute, useRouter } from 'vue-router';



export default {
    setup() {
        const isLoading = ref(true);
        const hoveredCategoryId = ref(null);
        const activeSubcategoryId = ref(null);
        const isOpen = ref(false);
        const selectedCategory = ref(null);

        const filteredSubcategories = ref([]);

        const router = useRouter();
        const route = useRoute();
        // Fetch categories
        const { document: category } = getCollection('categories');
        // Watch for hoveredCategoryId changes to fetch subcategories
        watch(hoveredCategoryId, async (newCategoryId) => {

            if (newCategoryId) {

                try {
                    isLoading.value = true;
                    const { documents: subcategories } = await getDocument('categories', newCategoryId, 'product');
                    watch(subcategories, () => {
                        if (subcategories.value?.length > 0) {
                            filteredSubcategories.value = subcategories.value || [];
                            isLoading.value = false;
                            console.log("sub : ", filteredSubcategories.value.value)
                        }
                    })
                } catch (error) {
                    console.error("Error fetching subcategories:", error);
                    filteredSubcategories.value = [];
                } finally {
                    isLoading.value = false;
                }

            } else {
                filteredSubcategories.value = [];
            }
        });

        // Handle opening and closing of mobile view subcategory panel
        const handleIsopen = async (categoryId) => {
            isOpen.value = !isOpen.value;  // Toggle panel

            if (categoryId) {

                try {
                    // Fetch subcategories
                    const { documents: subcategories } = await getDocument('categories', categoryId, 'product');

                    watch(subcategories, () => {
                        isLoading.value = true
                        if (subcategories.value?.length > 0) {
                            selectedCategory.value = subcategories.value || [];
                            console.log("sub category : ", selectedCategory.value.value)
                        }
                        isLoading.value = false
                    })

                } catch (error) {
                    console.error("Error fetching subcategories:", error);
                    selectedCategory.value = [];
                } finally {
                    isLoading.value = false;  // End loading
                }
            } else {
                selectedCategory.value = null;
            }

            console.log("Selected category ID: ", categoryId);
        };

        const handleClick = (id) => {

            // Check if the current route's params.id matches the clicked product ID
            if (route.params.id === id) {
               
                const anotherId = route.params.id; // Set this to your desired fallback ID
                router.push({ name: 'productdetail', params: { id: anotherId } });
            } else {
                // If it doesn't match, navigate to the selected product detail page
                router.push({ name: 'productdetail', params: { id } });
               setTimeout(()=>{
                window.location.reload();
               },100)
            }
        };

        const handleClickSideBar = (id) => {
              // Check if the current route's params.id matches the clicked product ID
              if (route.params.id === id) {
               
               const anotherId = route.params.id; // Set this to your desired fallback ID
               router.push({ name: 'productdetail', params: { id: anotherId } });
           } else {
               // If it doesn't match, navigate to the selected product detail page
               router.push({ name: 'productdetail', params: { id } });
              setTimeout(()=>{
               window.location.reload();
              },100)
           }
        }



        return {
            category,
            hoveredCategoryId,
            activeSubcategoryId,
            filteredSubcategories,
            isLoading,
            isOpen,
            selectedCategory,
            handleIsopen,
            handleClick,
            handleClickSideBar
        };
    }
};
</script>
