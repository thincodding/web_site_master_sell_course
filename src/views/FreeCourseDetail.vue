<template>

    <div>
        <NavbarView/>
    </div>
    
    <div class="flex flex-col h-screen">

        <!-- <div class="sticky top-0 z-10 p-5 bg-background">
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
        </div> -->

        <div v-if="isLoading" class="animate-pulse w-[90%] md:w-[90%] xl:w-[1200px] mx-auto my-2 p-5">
            <LoadingComponent/>
        </div>

        <div v-else class="flex flex-col h-screen">
            <div class="mb-auto">
                <div class=" w-[90%] xl:w-[1200px] mx-auto">
                    <div class="flex items-center gap-1 my-5 text-xl font-bold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-book-open">
                            <path d="M12 7v14" />
                            <path
                                d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
                        </svg>
                        <span>{{ $t('freeCourseType') }}</span>
                    </div>
                    <div v-for="product in products" :key="product.productId" class="my-4 product">
                        <div v-if="product.id === $route.params.id">
                            <div v-if="product.productDetails.filter(detail => detail.price === 0).length > 0">
                                <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                                    <div v-for="detail in product.productDetails.filter(detail => detail.price === 0)"
                                        :key="detail.id" class="border">
                                        <router-link :to="{ name: 'courseDetail', params: { id: detail.id } }"
                                            class="shadow cursor-pointer hover:shadow-lg">
                                            <div class="flex justify-center">
                                                <img :src="detail.imageUrl" alt=""
                                                    class="w-full lg:h-[200px] xl:h-[350px]" />
                                            </div>
                                            <div class="p-4 space-y-2">
                                                <h3 class="font-bold lg:text-md xl:text-lg">{{ detail.title
                                                    }}
                                                </h3>
                                                <p class="text-sm text-justify text-gray-600 line-clamp-4"
                                                    v-html="detail.aboutCourse"></p>
                                            </div>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="flex justify-center">
                                <div>
                                    <div class="flex justify-center mt-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="text-gray-600 lucide lucide-ban">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="m4.9 4.9 14.2 14.2" />
                                        </svg>
                                    </div>
                                    <p class="mt-2 text-gray-600">{{ $t('noCourse') }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <FooterView />
                </div>
            </div>
        </div>


    </div>
</template>





<script>
import { useFirestoreCollection, useSubcollection } from "@/firebase/getArrayDocument";
import getNestedSubcollection from "@/firebase/getNestedSubcollection";
import { ref, onMounted } from "vue";
import FooterView from "./FooterView.vue";
import NavbarView from "./NavbarView.vue";
import LoadingComponent from "@/components/client/LoadingComponent.vue";

export default {
    components: {
        FooterView,
        NavbarView,
        LoadingComponent
    },
    setup() {

        const products = ref([]);
        // const route = useRoute();
        const isLoading = ref(true);
        const { documents: categoryDocument, fetchCollection } = useFirestoreCollection("categories");


        onMounted(() => {
            fetchDataDetails();
        });

        //fetch product Details
        const fetchDataDetails = async () => {
            isLoading.value = true;
            try {

                // Fetch top-level categories
                await fetchCollection();
                const categories = categoryDocument.value || [];
                const categoryPromises = categories.map(async (cate) => {
                    const { subcollectionData: categoryProducts, fetchSubcollection } = useSubcollection(
                        "categories",
                        cate.id,
                        "product"
                    );
                    await fetchSubcollection();

                    const productPromises = categoryProducts.value.map(async (pro) => {
                        const { subcollectionData: productDetails, fetchSubcollections } = getNestedSubcollection(
                            "categories",
                            cate.id,
                            "product",
                            pro.id,
                            "productDetail"
                        );
                        await fetchSubcollections();

                        // Process product details if needed
                        const detailedProducts = productDetails.value.map((detail) => ({
                            ...detail, // Spread details
                            productId: pro.id,
                            categoryId: cate.id,
                        }));

                        return {
                            ...pro,
                            productDetails: detailedProducts,
                        };
                    });

                    return await Promise.all(productPromises);
                });

                const allProducts = await Promise.all(categoryPromises);
                products.value = allProducts.flat();
                isLoading.value = false;
            } catch (err) {
                console.error("Error fetching data:", err);
            }

            finally {
                isLoading.value = false
            }
        };


        const goBack = () => {
            window.history.back();
        }

        return {
            products,
            goBack,
            isLoading
        };
    },
};
</script>
