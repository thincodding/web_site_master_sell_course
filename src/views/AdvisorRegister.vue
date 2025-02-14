<template>
    <div>
        <NavbarView />

        <div class="w-[90%] lg:w-[70%] mx-auto my-10">
            <!-- Loading State -->
            <div v-if="isLoading" class="flex items-center justify-center h-64">
                <div
                    class="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
                    <svg class="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                        <path
                            d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                            stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
                        </path>
                        <path
                            d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                            stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"
                            class="text-gray-900">
                        </path>
                    </svg>
                    <p class="font-bold">{{ $t('loading') }}</p>
                </div>
            </div>

            <!-- Content -->
            <div v-else>
                <div v-for="category in productDetails" :key="category.id" class="mb-5">
                    <div v-for="product in category.product" :key="product.id">
                        <div v-for="detail in product.productDetail" :key="detail.id">
                            <div v-if="detail.id === $route.params.id" class="flex items-center gap-1 text-sm md:text-[17px]">
                                <div @click="goBack" class="font-bold cursor-pointer hover:text-gray-500">{{ category.categoryName }}</div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="lucide lucide-chevron-right">
                                        <path d="m9 18 6-6-6-6" />
                                    </svg>
                                </div>
                                <div class="font-bold">{{ product.productName }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Buttons -->
                <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
                    <div class="w-full">
                        <a href="https://t.me/masteritsystems_saleconsultant" target="_blank" class="w-full">
                            <button
                                class="flex items-center w-full gap-2 p-4 text-white bg-red-500 rounded-sm shadow-lg hover:bg-red-500/90">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-send">
                                    <path
                                        d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                                    <path d="m21.854 2.147-10.94 10.939" />
                                </svg>
                                <span class="font-bold text-md sm:text-sm md:text-[14px] lg:text-md xl:text-lg">{{
                                    $t('telegram') }}</span>
                            </button>
                        </a>
                    </div>

                    <div class="w-full">
                        <router-link to="/" class="w-full">
                            <button
                                class="flex items-center w-full gap-2 p-4 text-white bg-red-500 rounded-sm shadow-lg hover:bg-red-500/90">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                                </svg>
                                <span class="font-bold text-md sm:text-sm md:text-[14px] lg:text-md xl:text-lg">{{
                                    $t('consultantForStudy') }}</span>
                            </button>
                        </router-link>
                    </div>

                    <div class="w-full">
                        <router-link to="/" class="w-full">
                            <button
                                class="flex items-center w-full gap-2 p-4 text-white bg-red-500 rounded-sm shadow-lg hover:bg-red-500/90">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-phone-call">
                                    <path
                                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    <path d="M14.05 2a9 9 0 0 1 8 7.94" />
                                    <path d="M14.05 6A5 5 0 0 1 18 10" />
                                </svg>
                                <span class="font-bold text-md smd:text-sm md:text-[14px] lg:text-md xl:text-lg">{{
                                    $t('phoneNumber') }}</span>
                            </button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import NavbarView from './NavbarView.vue';
import { onMounted } from 'vue';

import { useFirestoreCollection, useSubcollection } from '@/firebase/getArrayDocument';
import getNestedSubcollection from '@/firebase/getNestedSubcollection';
import getNestedSubSubcollection from '@/firebase/getNestedSubsubCollection';

export default {
    components: {
        NavbarView
    },
    setup() {
        const productDetails = ref([]);
        const isLoading = ref(true); // Initialize loading state as true

        const goBack = () => {
            window.history.back();
        };

        const { documents: categoryDocument, fetchCollection } = useFirestoreCollection("categories");

        onMounted(async () => {
            await fetchCollection();
            await fetchCategoryProductAndProductDetail();
        });

        const fetchCategoryProductAndProductDetail = async () => {
            const orderByField = 'productName';
            try {
                isLoading.value = true; // Set loading to true before fetching data
                const categoryPromises = categoryDocument.value.map(async (cate) => {
                    const { subcollectionData: products, fetchSubcollection } = useSubcollection('categories', cate.id, 'product', orderByField);
                    await fetchSubcollection();

                    const productPromises = products.value.map(async (pro) => {
                        const { subcollectionData: productDetail, fetchSubcollections } = getNestedSubcollection('categories', cate.id, 'product', pro.id, 'productDetail');
                        await fetchSubcollections();

                        const productDetailWithStudents = await Promise.all(productDetail.value.map(async (detail) => {
                            const { subSubcollectionData: students, fetchSubSubcollections } = getNestedSubSubcollection(
                                'categories',
                                cate.id,
                                'product',
                                pro.id,
                                'productDetail',
                                detail.id,
                                'student'
                            );
                            await fetchSubSubcollections();

                            const titleCounts = students.value.reduce((acc, stu) => {
                                const title = stu.title || 'Unknown';
                                acc[title] = (acc[title] || 0) + 1;
                                return acc;
                            }, {});

                            const isBestSeller = titleCounts[detail.title] > 2;

                            return {
                                ...detail,
                                student: students.value,
                                isBestSeller
                            };
                        }));

                        return {
                            ...pro,
                            productDetail: productDetailWithStudents
                        };
                    });

                    const productArray = await Promise.all(productPromises);
                    return {
                        id: cate.id,
                        categoryName: cate.categoryName,
                        description: cate.description,
                        image: cate.image,
                        product: productArray.filter(Boolean)
                    };
                });

                const result = await Promise.all(categoryPromises);
                productDetails.value = result.filter(Boolean);
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                isLoading.value = false; // Set loading to false after data is fetched
            }
        };

        return {
            goBack,
            productDetails,
            isLoading
        };
    }
};
</script>