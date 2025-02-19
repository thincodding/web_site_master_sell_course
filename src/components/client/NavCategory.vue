<template>
    <div class="relative">
        <!-- Navbar -->
        <div ref="navbar" class="flex items-center justify-between">
            <!-- Logo -->
            <router-link to="/">
                <img class="w-[91px] h-[50px] object-contain" src="@/assets/logo_mater_it.jpg" alt="">
            </router-link>

            <!-- Categories Scrollable -->
            <div class="w-full max-w-[80vw] lg:w-[85%] xl:max-w-[80%] mx-auto overflow-x-auto py-3">
                <div class="flex items-center justify-center gap-4 ml-20 flex-nowrap "
                    @mouseleave="hoveredCategoryId = null">
                    <div v-for="cat in category" :key="cat.id" class="relative flex-shrink-0 px-2 text-center"
                        @mouseover="hoveredCategoryId = cat.id">
                        <div class="flex items-center gap-1 cursor-pointer hover:text-gray-500">
                            <!-- <div>
                                <img class="w-5" :src="cat.image" alt="">
                            </div> -->
                            <h1 class="font-[500] capitalize lg:text-sm xl:text-lg">
                                {{ cat.categoryName }}
                            </h1>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-chevron-down">
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </div>

                        <!-- Dropdown for Subcategories -->
                        <div class="h-2 bg-transparent"> </div>
                        <div class="fixed z-20 top-14">
                            <div v-if="hoveredCategoryId === cat.id && filteredSubcategories.length && isNavbarVisible"
                                class="w-[200px] p-4 space-y-2 bg-white rounded-sm" v-motion :initial="{ scale: 0.9 }"
                                :visible="{ opacity: 1, scale: 1 }"
                                style="box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;">
                                <div v-for="sub in filteredSubcategories" :key="sub.id"
                                    class="w-full transition-colors duration-200 hover:text-red-600 text-start">
                                    <a :href="`/productdetail/${sub.id}`"
                                        class="text-gray-700 capitalize text-[15px] hover:text-gray-500 text-wrap">
                                        {{ sub.productName }}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- User/Login & Language -->
            <div class="flex items-center justify-end gap-3">
                <!-- Free Course Icon -->
                <div v-if="user" class="relative flex cursor-pointer group">
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

                <!-- Help Icon -->
                <div class="relative flex cursor-pointer group">
                    <router-link :to="{ name: 'help' }" class="px-2 py-1 text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                        </svg>
                    </router-link>
                    <span
                        class="absolute px-1 m-4 mx-auto text-sm text-gray-100 transition-opacity -translate-x-1/2 translate-y-full bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 left-1/2">ជំនួយ</span>
                </div>

                <!-- Login/Signup or User Dropdown -->
                <div v-if="!user" class="flex items-center space-x-2">
                    <div class="border-[1px] border-black p-[6px] px-5 hover:bg-gray-200 cursor-pointer">
                        <router-link to="/login" class="font-bold text-[14px] text-[#2D2f31] text-nowrap">{{
                            $t('login') }}</router-link>
                    </div>
                    <div class="bg-black p-[7px] px-5 cursor-pointer">
                        <router-link to="/signup" class="font-bold text-[14px] text-white text-nowrap">{{
                            $t('signup') }}</router-link>
                    </div>
                </div>
                <div v-else class="relative" @mouseenter="isOpens = true" @mouseleave="isOpens = false">
                    <router-link :to="{ name: 'userProfile' }"
                        class="border-[1px] border-background bg-gray-50 w-10 h-10 flex justify-center items-center rounded-full hover:bg-gray-200 cursor-pointer">
                        <div class="capitalize">{{ user?.displayName?.[0] || '' }}</div>
                    </router-link>

                    <div class="h-1.5 bg-transparent "></div>
                    <div v-if="isOpens" v-motion :initial="{ scale: 0.9 }" :visible="{ opacity: 1, scale: 1 }"
                        class="absolute top-10 border right-5 w-28 shadow p-3 z-[10] bg-white flex items-center gap-2 cursor-pointer hover:text-gray-400">
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
            </div>
        </div>
    </div>
</template>


<script>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue';
import getCollection from '@/firebase/getCollection';
import getDocument from '@/firebase/getDocument';
import getUser from '@/firebase/getUser';
import useSignout from '@/firebase/useSignout'
import { useRouter } from 'vue-router';

export default {
    setup() {
        const isLoading = ref(true);
        const hoveredCategoryId = ref(null);
        const activeSubcategoryId = ref(null);
        const isOpen = ref(false);
        const selectedCategory = ref(null);
        const isNavbarVisible = ref(true);
        const navbar = ref(null);
        const isDrowdown = ref(false)
        const isOpens = ref(false);

        const filteredSubcategories = ref([]);
        const { user } = getUser();
        const { signOut } = useSignout()
        const router = useRouter();

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
                        }
                    });
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

        // Computed property to check if a category has products
        const categoriesWithProducts = computed(() => {
            return (category.value || []).filter(cat =>
                filteredSubcategories.value.some(sub => sub.categoryId === cat.id)
            );
        });

        // Handle scroll event
        const handleScroll = () => {
            if (navbar.value) {
                const navbarRect = navbar.value.getBoundingClientRect();
                isNavbarVisible.value = navbarRect.top >= 0 && navbarRect.bottom <= window.innerHeight;
            }
        };

        onMounted(() => {
            window.addEventListener('scroll', handleScroll);

            console.log("user", user)

        });

        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll);
        });

        const handleSignout = async () => {
            if (window.confirm('Are you sure to sign out')) {
                await signOut()
                router.push({ name: 'login' });
                isDrowdown.value = false
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
            user,
            isNavbarVisible,
            navbar,
            categoriesWithProducts,
            isDrowdown,
            handleSignout,
            isOpens
        };
    }
};
</script>
