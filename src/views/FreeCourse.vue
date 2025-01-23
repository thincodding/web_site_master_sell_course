<template>


    <div class="flex flex-col h-screen">
        <div class="sticky top-0 z-10 p-5 bg-background">
            <div class="flex items-center gap-2">
                <button @click="goBack" class="p-2 bg-red-500 rounded-md shadow hover:bg-red-600 hover:shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="text-white size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                    </svg>
                </button>
                <div>
                    <p class="font-bold text-white font-NotoSansKhmer">{{ $t('back') }}</p>
                </div>
            </div>
        </div>
        <div v-if="isLoading" class="animate-pulse w-[90%] md:w-[90%] xl:w-[1200px] mx-auto my-2 p-5">
            <div class="h-8 xl:h-9 bg-gray-300 w-72   xl:w-[600px] mb-4"></div>
            <div v-for="n in 5" :key="n" class="mb-4 space-y-6">

                <div class="flex gap-5 mt-2">
                    <div
                        class="relative w-full overflow-hidden   h-6  before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/70  before:animate-[shimmer_1.1s_infinite]">
                        <div class="w-full h-6 bg-gray-300"></div>
                    </div>
                </div>

                <div class="flex gap-5">
                    <div
                        class="relative w-full overflow-hidden   h-4  before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/70  before:animate-[shimmer_1.1s_infinite]">
                        <div class="w-full h-6 bg-gray-300"></div>
                    </div>
                </div>

                <div class="flex gap-5 mt-2">
                    <div
                        class="relative w-full overflow-hidden   h-6  before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/70  before:animate-[shimmer_1.1s_infinite]">
                        <div class="w-full h-6 bg-gray-300"></div>
                    </div>
                </div>
                <div class="flex gap-5 mt-2">
                    <div
                        class="relative w-full overflow-hidden   h-6  before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/70  before:animate-[shimmer_1.1s_infinite]">
                        <div class="w-full h-6 bg-gray-300"></div>
                    </div>
                </div>
                <div class="flex gap-5 mt-2">
                    <div
                        class="relative w-full overflow-hidden   h-6  before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/70  before:animate-[shimmer_1.1s_infinite]">
                        <div class="w-full h-6 bg-gray-300"></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>

            <div class="mb-auto xl:w-[1200px] mx-auto p-5">
                <h1 class="flex items-center gap-2 mt-5 text-[24px] font-bold font-NotoSansKhmer">

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-book-open-text">
                        <path d="M12 7v14" />
                        <path d="M16 12h2" />
                        <path d="M16 8h2" />
                        <path
                            d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
                        <path d="M6 12h2" />
                        <path d="M6 8h2" />
                    </svg>
                    <span>{{ $t('freeCourseType') }}</span>
                </h1>
                <hr class="my-4">
                <div v-for="category in products" :key="category.id" class="mb-6">
                    <!-- Category Header with Divider -->
                    <div class="relative flex items-center gap-1 pb-2 mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                        </svg>
                        <h2 class="text-xl font-bold capitalize font-nato">{{ category.categoryName }}</h2>

                    </div>

                    <!-- Product Grid -->
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        <router-link :to="`/freeCourseDetail/${pro.id}`" v-for="pro in category.product" :key="pro.id"
                            class="p-4 shadow cursor-pointer hover:shadow-lg">
                            <div class="flex justify-center">
                                <img :src="pro.proImage" alt="" class="object-cover w-32 h-32 mb-2 rounded" />
                            </div>
                            <div class="space-y-2">
                                <h3 class="text-lg font-bold">វគ្គសិក្សា {{ pro.productName }}</h3>
                                <p class="text-justify text-gray-600 text-md line-clamp-4" v-html="pro.description"></p>
                                <p class="text-sm text-gray-400">
                                    {{ date(pro.createdAt.seconds * 1000).format('LL') }}
                                </p>
                            </div>
                        </router-link>
                    </div>

                    <!-- Horizontal Divider -->
                    <!-- <div class="my-3 border-t border-gray-300 "></div> -->
                </div>
            </div>
            <div>
                <FooterView/>
            </div>

        </div>
    </div>
</template>

<script>
import FooterView from './FooterView.vue'
import { useFirestoreCollection, useSubcollection } from '@/firebase/getArrayDocument';

import moment from 'moment';
import { onMounted, ref } from 'vue';

export default {
    components: {
        FooterView
    },
    setup() {
        const products = ref([]);
        const currentComponents = ref("");
        const isOpenAction = ref({});
        const product = ref(null);
        const arrProducts = ref(null);
        const editData = ref(null);
        const editCategory = ref(null);
        const searchText = ref("");
        const isLoading = ref(true)
        const date = moment;
        const { documents: categoryDocument, fetchCollection } = useFirestoreCollection("categories");

        onMounted(async () => {
            await fetchCollection();
            await fetchCategoryProduct();
        });

        const onMountedCurrentComponents = async (component) => {
            currentComponents.value = component;
            editData.value = null;
        };

        const handleFetch = async () => {
            await fetchCollection();
            await fetchCategoryProduct();
        };

        const fetchCategoryProduct = async () => {
            isLoading.value = true;
            const orderByField = 'productName';

            try {
                // Fetch all categories and products concurrently
                const categoryPromises = categoryDocument.value.map(async (cate) => {
                    const { subcollectionData: product, fetchSubcollection } = useSubcollection('categories', cate.id, 'product', orderByField);

                    // Fetch products for the category
                    await fetchSubcollection();

                    // Return the category and its products
                    return {
                        id: cate.id,
                        categoryName: cate.categoryName,
                        description: cate.description,
                        image: cate.image,
                        product: product.value,
                    };
                });

                // Wait for all categories and products to be fetched
                const result = await Promise.all(categoryPromises);

                // Filter out categories without products
                products.value = result.filter(category => category.product.length > 0);

                isLoading.value = false;
            } catch (err) {
                isLoading.value = false;
                console.error('Error fetching categories and products:', err);
            }
        };


        const goBack = () => {
            window.history.back();
        }

        return {
            onMountedCurrentComponents,
            currentComponents,
            products,
            handleFetch,
            isOpenAction,
            product,
            arrProducts,
            date,
            editData,
            editCategory,
            searchText,
            isLoading,
            goBack
        };
    },
};
</script>