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
                    <div class="relative p-4 border-l w-60" v-if="filteredSubcategories.length">
                        <p class="text-[14px] mt-1 font-bold text-[#6b6b6b]">{{ $t('popular') }}</p>
                        <div v-for="sub in filteredSubcategories" :key="sub.id" class="relative mt-1">
                            <router-link :to="{ name: 'productdetail', params: { id: sub.id } }"
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





    <div class="relative flex flex-col w-full h-screen overflow-hidden lg:hidden">
        <div v-if="user" class="max-w-full p-4 bg-neutral-50 lg:hidden">
            <div class="flex justify-center">
                <div class="">
                    <div class="flex justify-center ">
                        <div class="p-4 bg-gray-100 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="text-gray-500 lucide lucide-user">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>

                        </div>
                    </div>
                    <div class="flex-grow mt-2 text-center md:text-left">
                        <p class="font-bold">{{ $t('hi') }}, {{ user?.displayName }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="flex flex-col p-4 space-y-3">
            <router-link to="/login" class="text-indigo-600 text-[15px]">{{ $t('login') }}</router-link>
            <router-link to="/signup" class="text-indigo-600 text-[15px]">{{ $t('signup') }}</router-link>
        </div>
        <hr>
        <div class="p-4 mb-auto">
            <p class="my-1 text-sm font-bold text-background">{{ $t('popular') }}</p>
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
                    stroke-width="1.5" stroke="currentColor" class="font-bold cursor-pointer size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                <p class="text-[15px] text-background">{{ $t('Menu') }}</p>
            </div>

            <div v-if="selectedCategory" class="px-5 mt-2 capitalize">
                <div v-for="sub in selectedCategory" :key="sub.id" class="leading-9 text-[14px]">
                    <router-link :to="{ name: 'productdetail', params: { id: sub.id } }"
                        @click="handleClickSideBar(sub.id)">{{ sub.productName }}</router-link>
                </div>
            </div>
        </div>

        <div v-if="user">
            <button @click="handleSignout" class="flex items-center gap-1 my-2 ml-2 hover:text-gray-700"> 
                <svg xmlns="http://www.w3.org/2000/svg" width="20"
                    height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" x2="9" y1="12" y2="12" />
                </svg> <span class="font-bold">{{ $t('logout') }}</span> </button>
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import getCollection from '@/firebase/getCollection';
import getDocument from '@/firebase/getDocument';
import { useRoute, useRouter } from 'vue-router';
import getUser from '@/firebase/getUser'
import useSignout from '@/firebase/useSignout'
;



export default {
    setup() {
        const isLoading = ref(true);
        const hoveredCategoryId = ref(null);
        const activeSubcategoryId = ref(null);
        const isOpen = ref(false);
        const selectedCategory = ref(null);

        const filteredSubcategories = ref([]);
        const { user } = getUser();
        const router = useRouter();
        const route = useRoute();
        const { signOut } = useSignout();
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
                setTimeout(() => {
                    window.location.reload();
                }, 100)
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
                setTimeout(() => {
                    window.location.reload();
                }, 100)
            }
        }


        const handleSignout = async () => {
            if (window.confirm('Are you sure to sign out')) {
                await signOut()
                router.push({ name: 'login' });
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
            handleClickSideBar,
            user,
            handleSignout
        };
    }
};
</script>
