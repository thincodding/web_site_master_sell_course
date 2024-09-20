<template>
    <div class="hidden lg:block">
        <div class="group w-full sticky top-[86px] z-10 -right-20">
            <div class="flex group">
                <!-- Categories -->
                <div style="box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;"
                    class="h-[500px] bg-white flex justify-center" @mouseleave="hoveredCategoryId = null" 
                    v-motion
                    :initial="{ scale: 0.9 }" :visible="{ opacity: 1, scale: 1 }"
                    >
                    <div class="p-4 w-60">
                        <div v-for="cate in category" :key="cate.id" class="cursor-pointer"
                            @mouseover="hoveredCategoryId = cate.id">
                            <router-link to="#"
                                class="text-[14px] text-[#2D2f31] font-[400] leading-8 hover:text-indigo-600 flex justify-between items-center">
                                <p :class="{ 'text-indigo-600': cate.id === hoveredCategoryId }">{{ cate.categoryName }}
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
                    <div class="p-4 border-l w-60" v-if="filteredSubcategories.length">
                        <p class="text-[14px] mt-1 font-bold text-[#6b6b6b]">Popular Topics</p>
                        <div v-for="sub in filteredSubcategories" :key="sub.id" class="relative mt-1">
                            <router-link to="#"
                                class="text-[14px] text-[#2D2f31] font-[400] leading-8 hover:text-indigo-600"
                                @mouseover="activeSubcategoryId = sub.id"
                                :class="{ 'text-indigo-600': sub.id === activeSubcategoryId }">
                                <p>{{ sub.subName }}</p>
                            </router-link>

                            <div v-if="isLoading" class="absolute top-0">
                                <div style="background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);"
                                    class="h-5 w-52 mt-2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- mobile  -->
    <div class="w-full lg:hidden h-screen overflow-hidden relative">
        <div class="flex flex-col space-y-3 p-4">
            <router-link to="#" class="text-indigo-600 text-[15px]">Log in</router-link>
            <router-link to="#" class="text-indigo-600 text-[15px]">Sign up</router-link>
        </div>
        <hr>
        <div class="p-4">
            <p class="font-bold text-sm text-background my-1">Most Popular</p>
            <div v-for="cat in category" :key="cat.id">
                <div @click="handleIsopen(cat.id)" class="leading-9 text-[14px] flex justify-between items-center">
                    <p>{{ cat.categoryName }}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>
        </div>

        <!-- Subcategories panel -->
        <div
            :class="isOpen ? 'w-full bg-white shadow-md h-full top-0 absolute transition-transform duration-300 ease-out transform translate-x-0' : 'w-full bg-white shadow-md h-screen top-0 absolute transition-transform duration-300 ease-out transform translate-x-full'">
            <div class="bg-[#F7F9FA] p-4 flex items-center space-x-4">
                <svg @click="handleIsopen(null)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="size-5 font-bold">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                <p class="text-[15px] text-background">Menu</p>
            </div>

            <div v-if="selectedCategory" class="px-5 mt-2">
                <div v-for="sub in selectedCategory.subCategory" :key="sub.id" class="leading-9 text-[14px]">
                    <p>{{ sub.subName }}</p>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
import { ref, computed, watch } from 'vue'

export default {
    setup() {
        const isLoading = ref(true);
        const hoveredCategoryId = ref(null);
        const activeSubcategoryId = ref(null);
        const isOpen = ref(false);
        const selectedCategory = ref(null);

        const category = ref([
            {
                id: 1,
                categoryName: "Web Development",
                subCategory: [
                    { id: 1, subName: "Javascript", detail: "Hello Javascript" },
                    { id: 2, subName: "Vue js", detail: "Hello Vue js" },
                    { id: 3, subName: "Angular", detail: "Hello Angular js" },
                ]
            },
            {
                id: 2,
                categoryName: "Data Science",
                subCategory: [
                    { id: 4, subName: "Machine Learning", detail: "Hello Machine Learning" },
                    { id: 5, subName: "AI Programming", detail: "Hello AI Programming" },
                    { id: 6, subName: "Data Hacking", detail: "Hello Data Hacking" },
                ]
            },
            {
                id: 3,
                categoryName: "Mobile Developer",
                subCategory: [
                    { id: 7, subName: "Flutter", detail: "Hello Machine Learning" },
                    { id: 8, subName: "Java", detail: "Hello AI Programming" },
                    { id: 9, subName: "Kotlin Hacking", detail: "Hello Data Hacking" },
                    { id: 10, subName: "React Native", detail: "Hello Machine Learning" },
                    { id: 11, subName: "Ionic", detail: "Hello AI Programming" },
                    { id: 12, subName: "C# Hacking", detail: "Hello Data Hacking" },
                ]
            }
        ]);

        const filteredSubcategories = computed(() => {
            const selectedCategory = category.value.find(cate => cate.id === hoveredCategoryId.value);
            return selectedCategory ? selectedCategory.subCategory : [];
        });

        const handleIsopen = (categoryId) => {
            isOpen.value = !isOpen.value;
            if (categoryId) {
                selectedCategory.value = category.value.find(cat => cat.id === categoryId);
            } else {
                selectedCategory.value = null; 
            }
        };

        watch(hoveredCategoryId, (newVal) => {
            if (newVal !== null) {
                isLoading.value = true;
                setTimeout(() => {
                    isLoading.value = false;
                }, 500);
            }
        });


        return {
            category,
            hoveredCategoryId,
            activeSubcategoryId,
            filteredSubcategories,
            isLoading,
            isOpen,
            selectedCategory,
            handleIsopen
        };
    }
}
</script>
