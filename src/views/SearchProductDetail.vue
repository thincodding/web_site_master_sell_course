<template>
    <div class="flex flex-col h-screen ">
        <NavbarView />
        <div class="p-10 xl:p-0">
            <div v-if="isLoading" class="animate-pulse p-5 md:mt-3 mb-4 xl:w-[1200px] mx-auto md:p-5">
                <div class="h-8 xl:h-9 bg-gray-300 w-72 xl:w-[600px] mb-4"></div>
                <div v-for="n in 4" :key="n" class="mb-4 space-y-6">
                    <div class="flex gap-5 ">
                        <div
                            class="relative w-full overflow-hidden h-6 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/70 before:animate-[shimmer_1.1s_infinite]">
                            <div class="w-full h-6 bg-gray-300"></div>
                        </div>
                    </div>
                    <div class="flex gap-5">
                        <div
                            class="relative w-full overflow-hidden h-4 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/70 before:animate-[shimmer_1.1s_infinite]">
                            <div class="w-full h-6 bg-gray-300"></div>
                        </div>
                    </div>
                    <div class="flex gap-5 mt-2">
                        <div
                            class="relative w-full overflow-hidden h-6 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/70 before:animate-[shimmer_1.1s_infinite]">
                            <div class="w-full h-6 bg-gray-300"></div>
                        </div>
                    </div>


                    
                    <div class="flex gap-5">
                        <div
                            class="relative w-full overflow-hidden h-4 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/70 before:animate-[shimmer_1.1s_infinite]">
                            <div class="w-full h-6 bg-gray-300"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="xl:w-[1200px] mx-auto ">
                <div v-if="currentProduct">
                    <div class="flex items-center gap-1 mb-10 text-lg md:text-2xl lg:my-5">
                        <p>{{ $t('result') }} <b>{{ currentProduct.productDetail.length }}</b> </p>
                        <p>{{ $t('ofStudy') }} "<b>{{ currentProduct.productName }}</b>"</p>
                    </div>
                    <div class="grid grid-cols-1 gap-5 lg:grid-cols-4 md:grid-cols-3">
                        <div v-for="detail in currentProduct.productDetail" :key="detail.id" class="p-2 mb-5 border">
                            <div class="border-[1px]">
                                <div v-if="detail.imageUrl">
                                    <img :src="detail.imageUrl" alt="Course Image"
                                        class="object-center w-full h-full" />
                                </div>
                                <div v-else>
                                    <img src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
                                        alt="">
                                </div>
                            </div>
                            <div class="mt-2 space-y-1">
                                <router-link :to="{ name: 'courseDetail', params: { id: detail.id } }"
                                    class="text-[14px] font-semibold  cursor-pointer text-background line-clamp-1">
                                    {{ detail.title }}
                                </router-link>
                                <div class="space-y-1.5">
                                    <p class="text-gray-500 text-[12px] line-clamp-1">{{ $t('lectures') }} {{
                                        detail.lectures }}</p>
                                    <div class="flex space-x-[2px] items-center">

                                        <div v-if="!detail.studentCount">
                                            <p class="text-xs">មិនមាន</p>
                                        </div>
                                        <div v-else>
                                            <p class="text-xs">({{ detail.studentCount }}) នាក់</p>
                                        </div>

                                    </div>
                                    <div>
                                        <p class="text-lg font-bold">${{ detail.price }}</p>
                                    </div>
                                    <div v-if="detail.studentCount > 2"
                                        class="text-xs w-20 text-center font-bold text-[#3D3C0A] bg-yellow-300/60 p-1">
                                        {{ $t('bestSeller') }}</div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="mb-auto"></div>
        <FooterView />

    </div>
</template>

<script>
import { useFirestoreCollection, useSubcollection } from '@/firebase/getArrayDocument';
import getNestedSubcollection from '@/firebase/getNestedSubcollection';
import getNestedSubSubcollection from '@/firebase/getNestedSubsubCollection';
import { onMounted, ref, computed } from 'vue';

import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import getCollectionWhere from '@/firebase/getCollectionWhere';
import NavbarView from './NavbarView.vue';
import { useRoute } from 'vue-router';
import FooterView from './FooterView.vue';
export default {
    components: {

        NavbarView,
        FooterView
    },
    setup() {
        const products = ref([]);
        const isLoading = ref(false);
        const error = ref(null);
        const content = ref(null);

        const route = useRoute();

        const { documents: categoryDocument, fetchCollection } = useFirestoreCollection("categories");

        const fetchContent = async () => {
            const results = await getCollectionWhere('content', "Z6TSQWgyq3fI71FrpAVd");
            content.value = results;
        };

        onMounted(async () => {
            try {
                await fetchContent();
                isLoading.value = true;
                await fetchCollection();
                await fetchAllProducts();
            } catch (err) {
                console.error('Error during initialization:', err);
                error.value = 'Failed to load data.';
            } finally {
                isLoading.value = false;
            }
        });

        const fetchAllProducts = async () => {
            const orderByField = 'productName';
            try {
                const categoryPromises = categoryDocument.value.map(async (cate) => {
                    const { subcollectionData: categoryProducts, fetchSubcollection } = useSubcollection('categories', cate.id, 'product', orderByField);
                    await fetchSubcollection();

                    const productPromises = categoryProducts.value.map(async (pro) => {
                        const { subcollectionData: productDetails, fetchSubcollections } = getNestedSubcollection(
                            'categories',
                            cate.id,
                            'product',
                            pro.id,
                            'productDetail'
                        );
                        await fetchSubcollections();

                        const detailPromises = productDetails.value.map(async (detail) => {
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

                            const studentCount = students.value.length;

                            return {
                                ...detail,
                                student: students.value,
                                studentCount
                            };
                        });

                        const productDetailWithStudents = await Promise.all(detailPromises);

                        return {
                            ...pro,
                            productDetail: productDetailWithStudents
                        };
                    });

                    const productsWithDetails = await Promise.all(productPromises);
                    return productsWithDetails.filter(Boolean);
                });

                const categoriesProducts = await Promise.all(categoryPromises);
                products.value = categoriesProducts.flat();
            } catch (err) {
                console.error('Error fetching products and details:', err);
                error.value = 'Failed to fetch products and details.';
            }
        };

        const allProducts = computed(() => {
            return products.value.filter(product => product.productDetail && product.productDetail.length > 0);
        });

        const currentProduct = computed(() => {
            return allProducts.value.find(pro => pro.id === route.params.id);
        });

        return {
            allProducts,
            currentProduct,
            isLoading,
            error,
            content,
            modules: [Navigation],
        };
    },
};
</script>

<style scoped></style>
