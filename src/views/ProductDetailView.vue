<template>

    <NavbarView />
    <div class="bg-white  shadow-sm p-5 border-t-2 border-t-blue-500  animate-fade-up animate-duration-[2000ms]">
        <div class="relative overflow-x-auto mt-3">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                <thead class="text-[16px] text-black/70 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                    <tr class="font-NotoSansKhmer">
                        <th width="20%" class="py-4">ចំណងជើងមេរៀន</th>
                        <th width="10%" class="py-4">ថ្នាក់សិក្សា</th>
                        <th width="10%" class="py-4">បង្រៀនដោយ</th>
                        <th width="7%" class="py-4">តម្លៃសិក្សា</th>
                        <th width="7%" class="py-4">បញ្ចុះតម្លៃ</th>

                    </tr>
                </thead>

                <tbody>

                    <tr v-if="isLoading" class="text-center">
                        <td colspan="10" class="text-center">សូមរងចាំ...</td>
                    </tr>

                    <template v-else>
                        <template v-for="cat in productDetails" :key="cat.id">
                            <tr v-for="pro in cat.product" :key="pro.id">

                                <template v-for="detail in pro.productDetail" :key="detail.id">
                                    <td>{{ pro.productName }}</td>
                                    <td v-if="detail">{{ detail.title }}</td>
                                    <td v-else>No details available</td>
                                </template>
                            </tr>
                        </template>
                    </template>
                </tbody>
            </table>
        </div>
    </div>

</template>


<script>
import NavbarView from './NavbarView.vue';
import { useFirestoreCollection, useSubcollection } from '@/firebase/getArrayDocument';
import getNestedSubcollection from '@/firebase/getNestedSubcollection';
import moment from 'moment';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
export default {
    components: {
        NavbarView
    },
    setup() {
        const products = ref([]);
        const productDetails = ref([])

        const isLoading = ref(false)
        const category = ref(null)
        const product = ref(null)
        const productDetail = ref(null)
        const date = moment;

        const route = useRoute();

        const { documents: categoryDocument, fetchCollection, } = useFirestoreCollection("categories");
        onMounted(async () => {
            await fetchCollection();
            await fetchCategoryProductAndProductDetail();
        });

        


        const fetchCategoryProductAndProductDetail = async () => {
            isLoading.value = true;
            const categoryProduct = [];
            const orderByField = 'productName';

            const fetchPromises = categoryDocument.value.map(async (cate) => {
                const { subcollectionData: products, fetchSubcollection } = useSubcollection('categories', cate.id, 'product', orderByField);
                await fetchSubcollection();

                const productArray = products.value.filter(pro => pro.id === route.params.id).map(async (pro) => {
                    const { subcollectionData: productDetail, fetchSubcollections } = getNestedSubcollection(
                        'categories',
                        cate.id,
                        'product',
                        pro.id,
                        'productDetail',
                    );

                    try {
                        await fetchSubcollections();
                        return {
                            ...pro,
                            productDetail: productDetail.value
                        };
                    } catch (err) {
                        console.error(`Error processing product ${pro.id}:`, err);
                        return null; // Return null if there's an error
                    }
                });

                // Wait for all product details to be fetched
                const fetchedProducts = await Promise.all(productArray);
                // Filter out null results
                const validProducts = fetchedProducts.filter(p => p !== null);
                if (validProducts.length) {
                    categoryProduct.push({
                        id: cate.id,
                        categoryName: cate.categoryName,
                        description: cate.description,
                        image: cate.image,
                        product: validProducts
                    });
                }
            });

            await Promise.all(fetchPromises);
            isLoading.value = false;
            productDetails.value = categoryProduct;
        };



        return {
            products,
            fetchCategoryProductAndProductDetail,
            date,
            productDetails,
            isLoading,
            category,
            product,
            productDetail,
        };
    },
};
</script>