<template>
    <div class="xl:w-[1200px] mx-auto my-10 px-10 lg:px-10 xl:px-0">
        <div>
            <div class="my-4">
            <h1 class="text-[18px] lg:text-[20px]  md:text-[20px] font-KhmerMoul font-bold text-background">ប្រភេទវគ្គសិក្សាពេញនិយម</h1>
        </div>

            <div class="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-4">
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

export default {
    setup() {
        const products = ref([]);
        const productDetails = ref([]);
        const isLoading = ref(false);

        const { documents: categoryDocument, fetchCollection } = useFirestoreCollection("categories");

        onMounted(async () => {
            await fetchCollection();
            await fetchCategoryProduct();
            await fetchCategoryProductAndProductDetail();
        });

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
        };
    },
};
</script>


<style scoped></style>
