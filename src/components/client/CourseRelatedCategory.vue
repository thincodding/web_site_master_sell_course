<template>
    <div class="w-[88%] mx-auto hidden lg:block">
        <div class="course-related-category">
            <h2 class="flex justify-center text-[20px] font-bold my-2  gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-chevrons-left-right">
                    <path d="m9 7-5 5 5 5" />
                    <path d="m15 7 5 5-5 5" />
                </svg>
                <span>{{ $t('courseRelated') }}</span>
            </h2>
            <div v-if="isLoading" class="my-5">
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

                                                <img src='https://placehold.co/300x300' class="w-full h-full"
                                                    alt="Product Image">
                                            </div>

                                            <!-- Product Info Section -->
                                            <div class="p-4 space-y-2 font-NotoSansKhmer">
                                                <a :href="$router.resolve({ name: 'courseDetail', params: { id: detail.id } }).href"
                                                    class="font-bold line-clamp-1 text-gray-800 transition-colors textfont-bold text-[16px] font-NotoSansKhmer hover:text-background">
                                                    {{ detail.title }}
                                                </a>
                                                <p class="font-mono text-sm text-gray-600">{{ detail.lectures }}</p>

                                                <div
                                                    v-if="uniqueStudents.some(student => student.productDetailId === detail.id)">
                                                    <div>
                                                        <!-- {{uniqueStudents.find(student =>
                                                                                student.productDetailId === detail.id).title
                                                                            }} -->
                                                        <p class="font-bold text-gray-600">បានទិញមេរៀន</p>
                                                    </div>
                                                </div>
                                                <div v-else>
                                                    <p v-if="detail.price === 0"
                                                        class="text-lg font-bold text-green-600">
                                                        {{ $t('freeCourse') }}
                                                    </p>
                                                    <p v-else class="text-lg font-bold text-gray-600">
                                                        ${{ detail.price }}
                                                    </p>
                                                </div>

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

            <h2 class="flex justify-center text-[20px] font-bold my-2  gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-chevrons-left-right">
                    <path d="m9 7-5 5 5 5" />
                    <path d="m15 7 5 5-5 5" />
                </svg>
                <span>{{ $t('courseRelated') }}</span>
            </h2>
            <div v-if="isLoading" class="my-5">
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
                                            <div
                                                class="w-[350px] h-[350px] md:w-[200px] md:h-[200px] xl:w-[300px] xl:h-[300px]">
                                                <!-- <img :src="detail.imageUrl || 'https://placehold.co/400x400'"
                                                    class="w-full h-full" alt="Product Image"> -->

                                                <img src='https://placehold.co/300x300' class="w-full h-full"
                                                    alt="Product Image">
                                            </div>

                                            <!-- Product Info Section -->
                                            <div class="p-4 space-y-2 font-NotoSansKhmer">
                                                <a :href="$router.resolve({ name: 'courseDetail', params: { id: detail.id } }).href"
                                                    class="font-bold line-clamp-1 text-gray-800 transition-colors textfont-bold text-[15px] font-NotoSansKhmer hover:text-background">
                                                    {{ detail.title }}
                                                </a>
                                                <p class="text-sm text-gray-600">{{ detail.lectures }}</p>

                                                <div
                                                    v-if="uniqueStudents.some(student => student.productDetailId === detail.id)">
                                                    <div>
                                                        <p class="font-bold text-[14px] text-gray-600">បានទិញមេរៀន</p>
                                                    </div>
                                                </div>
                                                <div v-else>
                                                    <p v-if="detail.price === 0"
                                                        class="text-[16px] font-bold text-green-600">
                                                        {{ $t('freeCourse') }}
                                                    </p>
                                                    <p v-else class="text-[14px] font-bold">
                                                        ${{ detail.price }}
                                                    </p>
                                                </div>


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
import { collection, query, where, getDocs } from 'firebase/firestore';
import { projectFirestore } from '@/config/config';
import getNestedSubcollection from '@/firebase/getNestedSubcollection';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import getUser from '@/firebase/getUser';

export default {
    setup() {
        const productDetails = ref([]);
        const isLoading = ref(true);
        const route = useRoute();

        const targetDetailId = route.params.id;
        const { documents: categoryDocument, fetchCollection } = useFirestoreCollection("categories");

        const { user } = getUser();
        const uniqueStudents = ref([])

        onMounted(async () => {
            await displayStudentByEmailCourse();
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



        const displayStudentByEmailCourse = async () => {
            const studentDocs = [];

            // Query Firestore with the email filter
            const q = query(
                collection(projectFirestore, "studentInfo"),
                where("email", "==", user.value.email) // Fetch students matching the logged-in user's email
            );

            const querySnapshot = await getDocs(q);

            // Push data into studentDocs array
            querySnapshot.forEach((doc) => {
                studentDocs.push({ id: doc.id, ...doc.data() });
            });

            // Assign the fetched data to uniqueStudents
            uniqueStudents.value = studentDocs;
        };


        return {
            productDetails,
            isLoading,
            uniqueStudents
        };
    },
};


</script>