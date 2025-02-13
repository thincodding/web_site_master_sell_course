<template>
    <div class="xl:w-[1200px] mx-auto my-10 px-10 lg:px-10 xl:px-0">
        <div>
            <div class="my-4">

                <div v-for="con in content" :key="con.id">
                    <!-- <h1 class="text-[18px] lg:text-[20px] md:text-[20px] font-bold font-KhmerMoul text-background">
                        {{ con.data.title }}</h1>
                    <p v-html="con.data.descripton" class="my-3 text-md text-background font-NotoSansKhmer ">

                    </p> -->

                    <h1 class="text-[18px] flex items-center gap-2 lg:text-[20px] md:text-[20px] font-bold font-NotoSansKhmer text-background">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-to-line"><path d="M17 12H3"/><path d="m11 18 6-6-6-6"/><path d="M21 5v14"/></svg>
                        <span>{{ $t('popularCourse') }}</span>
                    </h1>
                </div>
            </div>

            <div v-if="isLoading">
                    <div class="flex gap-2 text-center">
                        <div
                            class="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
                            <svg class="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                                <path
                                    d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                                    stroke="currentColor" stroke-width="5" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                                <path
                                    d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                                    stroke="currentColor" stroke-width="5" stroke-linecap="round"
                                    stroke-linejoin="round" class="text-gray-900">
                                </path>
                            </svg>
                            <p class="font-bold">{{ $t('loading') }}</p>
                        </div>
                    </div>
                </div>

            <div v-else class="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div v-for="category in filteredCategories" :key="category.id">
                    <div class="p-4 bg-[#E4E8EB]/30">
                        <img :src="category.image" alt="" class="object-contain w-full h-40 mb-4 rounded-md" />
                    </div>
                    <h2 class="text-sm my-2 mb-2 capitalize font-[500]">{{ category.categoryName }}</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useFirestoreCollection, useSubcollection } from '@/firebase/getArrayDocument';
import getNestedSubcollection from '@/firebase/getNestedSubcollection';
import getNestedSubSubcollection from '@/firebase/getNestedSubsubCollection';
import { onMounted, ref, computed } from 'vue';
import getCollectionWhere from '@/firebase/getCollectionWhere';

export default {
    setup() {
        const products = ref([]);
        const productDetails = ref([]);
        const isLoading = ref(true);
        const content = ref(null)

        const { documents: categoryDocument, fetchCollection } = useFirestoreCollection("categories");

        onMounted(async () => {
            await fetchContent();

            await fetchCollection();
            await fetchCategoryProduct();
            await fetchCategoryProductAndProductDetail();
        });

        //fetct category
        const fetchContent = async () => {
            const results = await getCollectionWhere('content', "Uqoh6AFeCeSwGHOC7ClL");
            console.log(results);
            content.value = results
        };


        const fetchCategoryProduct = async () => {
            const orderByField = 'productName';

            try {
                const categoryPromises = categoryDocument.value.map(async (cate) => {
                    const { subcollectionData: product, fetchSubcollection } = useSubcollection('categories', cate.id, 'product', orderByField);
                    await fetchSubcollection();
                    return {
                        id: cate.id,
                        categoryName: cate.categoryName,
                        description: cate.description,
                        image: cate.image,
                        product: product.value,
                    };
                });

                const result = await Promise.all(categoryPromises);
                products.value = result;
            } catch (err) {
                console.error('Error fetching categories and products:', err);
            }
        };

        const fetchCategoryProductAndProductDetail = async () => {
            isLoading.value = true;
            const orderByField = 'productName';

            try {
                const categoryPromises = categoryDocument.value.map(async (cate) => {
                    const { subcollectionData: products, fetchSubcollection } = useSubcollection('categories', cate.id, 'product', orderByField);

                    try {
                        await fetchSubcollection();

                        const productPromises = products.value.map(async (pro) => {
                            const { subcollectionData: productDetail, fetchSubcollections } = getNestedSubcollection('categories', cate.id, 'product', pro.id, 'productDetail');

                            try {
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

                                    try {
                                        await fetchSubSubcollections();

                                        const studentCount = students.value.length;
                                        const isBestSeller = studentCount > 1;

                                        return {
                                            ...detail,
                                            student: students.value,
                                            studentCount,
                                            isBestSeller
                                        };
                                    } catch (err) {
                                        console.error(`Error fetching students for productDetail ${detail.id}:`, err);
                                        return {
                                            ...detail,
                                            student: [],
                                            studentCount: 0,
                                            isBestSeller: false
                                        };
                                    }
                                }));

                                // Filter out product details that are not best sellers
                                const bestSellingDetails = productDetailWithStudents.filter(detail => detail.isBestSeller);

                                if (bestSellingDetails.length > 0) {
                                    return {
                                        ...pro,
                                        productDetail: bestSellingDetails
                                    };
                                } else {
                                    return null;
                                }
                            } catch (err) {
                                console.error(`Error fetching productDetail for product ${pro.id}:`, err);
                                return null;
                            }
                        });

                        const productArray = await Promise.all(productPromises);
                        const bestSellingProducts = productArray.filter(Boolean);

                        if (bestSellingProducts.length > 0) {
                            return {
                                id: cate.id,
                                categoryName: cate.categoryName,
                                description: cate.description,
                                image: cate.image,
                                product: bestSellingProducts
                            };
                        } else {
                            return null;
                        }
                    } catch (err) {
                        console.error(`Error fetching products for category ${cate.id}:`, err);
                        return null;
                    }
                });

                const result = await Promise.all(categoryPromises);
                productDetails.value = result.filter(Boolean);
            } catch (err) {
                console.error('Error fetching categories:', err);
            }

            isLoading.value = false;
        };

        const filteredCategories = computed(() => {
            return productDetails.value.filter(category => {
                const totalStudents = category.product.reduce((sum, product) => {
                    return sum + product.productDetail.reduce((detailSum, detail) => detailSum + detail.studentCount, 0);
                }, 0);
                return totalStudents > 10;
            });
        });

        return {
            filteredCategories,
            isLoading,
            content
        };
    },
};
</script>


<style scoped></style>
