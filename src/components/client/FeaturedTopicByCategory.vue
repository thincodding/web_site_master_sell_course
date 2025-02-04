<template>
    <div class="bg-[#E4E8EB]/30 py-5 ">
        <div class="xl:w-[1200px] mx-auto my-5 px-10 lg:px-10 xl:px-0">
            <div>
                <div v-for="con in content" :key="con.id">
                    <!-- <h1 class="text-[18px] lg:text-[20px] md:text-[20px] font-bold font-KhmerMoul text-background">
                        {{ con.data.title }}</h1>
                    <p v-html="con.data.descripton" class="my-3 text-md text-background font-NotoSansKhmer ">
                        
                    </p> -->

                    <h1 class="text-[18px] my-3 flex items-center gap-2 lg:text-[20px] md:text-[20px] font-bold font-NotoSansKhmer text-background">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-to-line"><path d="M17 12H3"/><path d="m11 18 6-6-6-6"/><path d="M21 5v14"/></svg>
                        <span>{{ $t('popularCourseByType') }}</span>
                    </h1>
                </div>               
                <div class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                    <div v-for="category in filteredCategories" :key="category.id" class="">
                        <h2 class="text-md font-[400] mb-1 capitalize">{{ category.categoryName }}</h2>
                        <div>
                            <div>
                                <div v-for="product in category.product" :key="product.id">
                                    <p class="text-sm text-indigo-600 underline cursor-pointer md:text-md">{{ product.productName }}</p>

                                    <span class="text-gray-500 text-[13px]">
                                        {{ product.productDetail.reduce((sum, detail) => sum + detail.studentCount, 0)}} {{ $t('people') }} 
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
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
        const isLoading = ref(false);
        const content = ref(null)
        
        const { documents: categoryDocument, fetchCollection } = useFirestoreCollection("categories");

        onMounted(async () => {
            await fetchCollection();
            await fetchCategoryProduct();
            await fetchCategoryProductAndProductDetail();
            await fetchContent();
        });

        const fetchContent = async () => {
            const results = await getCollectionWhere('content', "F3lKeVJP1OnVRFbKNF2l");
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
                                        const isBestSeller = studentCount > 2;

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

        // Computed property to gather categories with best selling products
        const filteredCategories = computed(() => {
            return productDetails.value.filter(category => {
                return category.product.some(product => product.productDetail.length > 0);
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

<style scoped>
/* Add your styles here */
</style>