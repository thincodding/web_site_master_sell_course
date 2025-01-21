<template>
    <div class="w-[88%] mx-auto hidden lg:block">
        <div class="course-related-category">
            <h2 class="text-center text-[20px] font-bold my-2">វគ្គសិក្សាដែលទាក់ទង</h2>
            <div v-if="isLoading" class="my-5">
                <p class="text-center text-gray-500">សូមរងចាំ.....</p>
            </div>
            <div v-else>
                <div v-if="productDetails && productDetails.length">
                    <div v-for="category in productDetails" :key="category.id">
                        <!-- <h3 class="text-xl font-bold">{{ category.categoryName }}</h3> -->
                        <div v-for="product in category.product" :key="product.id" class="px-4 my-4">
                            <div class="">
                                <div v-if="product.productDetail && product.productDetail.some(detail => detail.id !== $route.params.id)"
                                    class="flex flex-wrap justify-center gap-4 xl:gap-5">
                                    <div v-for="detail in product.productDetail" :key="detail.id" class=""
                                        :class="{ 'border w-[250px] xl:w-[300px] h-full': detail.id !== $route.params.id }">
                                        <!-- Show product details if the ID does not match params.id -->
                                        <div v-if="detail.id !== $route.params.id" class="space-y-4">
                                            <!-- Image Section -->
                                            <div class="w-[250px] h-[250px] xl:w-[300px] xl:h-[300px]">
                                                <!-- <img :src="detail.imageUrl || 'https://placehold.co/400x400'"
                                                    class="w-full h-full" alt="Product Image"> -->

                                                    <img src= 'https://placehold.co/300x300'
                                                    class="w-full h-full" alt="Product Image">
                                            </div>

                                            <!-- Product Info Section -->
                                            <div class="p-4 space-y-2 font-NotoSansKhmer">
                                                <a :href="$router.resolve({ name: 'courseDetail', params: { id: detail.id } }).href"
                                                    class="font-bold line-clamp-1 text-gray-800 transition-colors textfont-bold text-[16px] font-NotoSansKhmer hover:text-background">
                                                    {{ detail.title }}
                                                </a>
                                                <p class="text-sm text-gray-600">{{ detail.lectures }}</p>
                                                <p class="text-[16px] font-bold">{{ '$' +
                                                    detail.price.toFixed(2) }}</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                <div v-else>
                    <p class="text-center text-gray-500">No related product details found.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Mobile View -->
    <div class="block w-full mx-auto lg:hidden">
        <div class="course-related-category">
            <h2 class="text-center text-[20px] font-bold my-2">វគ្គសិក្សាដែលទាក់ទង</h2>
            <div v-if="isLoading" class="my-5">
                <p class="text-center text-gray-500">សូមរងចាំ.....</p>
            </div>
            <div v-else>
                <div v-if="productDetails && productDetails.length">
                    <div v-for="category in productDetails" :key="category.id">
                        <!-- <h3 class="text-xl font-bold">{{ category.categoryName }}</h3> -->
                        <div v-for="product in category.product" :key="product.id" class="my-4 ">
                            <div class="">
                                <div v-if="product.productDetail && product.productDetail.some(detail => detail.id !== $route.params.id)"
                                    class="flex flex-wrap justify-center space-y-5 md:space-y-0 md:gap-4 xl:gap-5">
                                    <div v-for="detail in product.productDetail" :key="detail.id" class=""
                                        :class="{ 'border w-[350px] md:w-[200px]  h-full': detail.id !== $route.params.id }">
                                        <!-- Show product details if the ID does not match params.id -->
                                        <div v-if="detail.id !== $route.params.id" class="space-y-4">
                                            <!-- Image Section -->
                                            <div class="w-[350px] h-[350px] md:w-[200px] md:h-[200px] xl:w-[300px] xl:h-[300px]">
                                                <!-- <img :src="detail.imageUrl || 'https://placehold.co/400x400'"
                                                    class="w-full h-full" alt="Product Image"> -->

                                                    <img src= 'https://placehold.co/300x300'
                                                    class="w-full h-full" alt="Product Image">
                                            </div>

                                            <!-- Product Info Section -->
                                            <div class="p-4 space-y-2 font-NotoSansKhmer">
                                                <a :href="$router.resolve({ name: 'courseDetail', params: { id: detail.id } }).href"
                                                    class="font-bold line-clamp-1 text-gray-800 transition-colors textfont-bold text-[16px] font-NotoSansKhmer hover:text-background">
                                                    {{ detail.title }}
                                                </a>
                                                <p class="text-sm text-gray-600">{{ detail.lectures }}</p>
                                                <p class="text-[16px] font-bold">{{ '$' +
                                                    detail.price.toFixed(2) }}</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                <div v-else>
                    <p class="text-center text-gray-500">No related product details found.</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import { useFirestoreCollection, useSubcollection } from '@/firebase/getArrayDocument';
import getNestedSubcollection from '@/firebase/getNestedSubcollection';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
    setup() {
        const productDetails = ref([]);
        const isLoading = ref(true);
        const route = useRoute();

        const targetDetailId = route.params.id;
        const { documents: categoryDocument, fetchCollection } = useFirestoreCollection("categories");

        onMounted(async () => {
            await fetchCollection();
            await fetchCategoryAndProductsByDetailId(targetDetailId);
        });

        const fetchCategoryAndProductsByDetailId = async (detailId) => {
            const orderByField = 'productName';

            try {
                isLoading.value = true;
                const categoryPromises = categoryDocument.value.map(async (cate) => {
                    const { subcollectionData: products, fetchSubcollection } = useSubcollection('categories', cate.id, 'product', orderByField);

                    await fetchSubcollection();

                    const productPromises = products.value.map(async (pro) => {
                        const { subcollectionData: productDetail, fetchSubcollections } = getNestedSubcollection('categories', cate.id, 'product', pro.id, 'productDetail');

                        await fetchSubcollections();

                        // Check if the productDetail ID matches the target ID
                        const hasTargetDetail = productDetail.value.some(detail => detail.id === detailId);

                        if (hasTargetDetail) {
                            return { ...pro, productDetail: productDetail.value };
                        }
                        return null;
                    });

                    const productArray = (await Promise.all(productPromises)).filter(Boolean);
                    if (productArray.length > 0) {
                        return { ...cate, product: productArray };
                    }
                    return null;
                });

                const result = (await Promise.all(categoryPromises)).filter(Boolean);
                productDetails.value = result;
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                isLoading.value = false;
            }
        };

        return {
            productDetails,
            isLoading
        };
    },
};


</script>