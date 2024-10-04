<template>
    <NavbarView />

    <div class=" mx-auto">
        <div v-if="isLoading" class="animate-pulse mt-10 xl:w-[1200px] mx-auto">
            <div class="h-8 xl:h-9 bg-gray-300 w-72   xl:w-[600px] mb-4"></div>
            <div v-for="n in 5" :key="n" class="mb-4 space-y-6">

                <div class="flex gap-5 mt-2">
                    <div
                        class="relative w-full overflow-hidden   h-6  before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/70  before:animate-[shimmer_1.1s_infinite]">
                        <div class="h-6 w-full  bg-gray-300"></div>
                    </div>
                </div>

                <div class="flex gap-5">
                    <div
                        class="relative w-full overflow-hidden   h-4  before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/70  before:animate-[shimmer_1.1s_infinite]">
                        <div class="h-6 w-full  bg-gray-300"></div>
                    </div>
                </div>

                <div class="flex gap-5 mt-2">
                    <div
                        class="relative w-full overflow-hidden   h-6  before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/70  before:animate-[shimmer_1.1s_infinite]">
                        <div class="h-6 w-full  bg-gray-300"></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="bg-background p-5">
            <div class="xl:w-[1200px] h-80 mx-auto  my-2  gap-10">

                <div class="flex justify-between gap-8">

                    <div v-if="productDetails && productDetails.length">
                        <div v-for="category in productDetails" :key="category.id">

                            <div v-for="product in category.product" :key="product.id">

                                <div class="text-white">
                                    <div v-for="detail in product.productDetail" :key="detail.id">
                                        <!-- Display the product detail only if it matches the route param id -->
                                        <div v-if="detail.id === $route.params.id">
                                            <div>
                                            <div class="flex items-center space-x-1">
                                                <h3 class="capitalize text-indigo-300/90 text-sm font-[500]">{{
                                                    category.categoryName }}</h3>
                                                <div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        class="lucide lucide-chevron-right">
                                                        <path d="m9 18 6-6-6-6" />
                                                    </svg></div>
                                                <h3 class="capitalize text-indigo-300/90 text-sm font-[500]">{{
                                                    product.productName }}</h3>
                                            </div>
                                            <div class="">
                                                <div>
                                                    <h1 class="text-[32px] font-bold my-5">
                                                        {{ detail.title }}
                                                    </h1>
                                                    <p v-html="detail.desctiption"
                                                        class="text-[18px] font-[350] text-[#FFFFFF]">

                                                    </p>
                                                </div>
                                                <div class="flex items-center space-x-2 mt-5">
                                                    <div
                                                        class="text-xs px-2 font-bold text-[#3D3C0A] bg-yellow-300/90 p-1">
                                                        Bestseller</div>
                                                    <div class="flex space-x-[2px] items-center">
                                                        <p class="text-xs text-orange-400">5,47</p>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                            class="size-3 text-orange-400">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                        </svg>

                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                            class="size-3 text-orange-400">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                            class="size-3 text-orange-400">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                            class="size-3 text-orange-400">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                            class="size-3 text-orange-400">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                        </svg>
                                                    </div>
                                                    <div class="text-xs flex items-center space-x-2">
                                                        <p class="text-indigo-300 underline">(2,5996, ratings)</p> <span
                                                            class="text-[14px]">334,899 students</span>
                                                    </div>

                                                </div>
                                                <div class="mt-4 space-y-4 mb-10">
                                                    <div class="text-sm">Created by <span
                                                            class="text-indigo-300 underline capitalize cursor-pointer">{{
                                                                detail.lectures }}</span>
                                                    </div>
                                                    <div class="text-sm flex items-center gap-2">
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18"
                                                                height="18" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" stroke-width="2"
                                                                stroke-linecap="round" stroke-linejoin="round"
                                                                class="lucide lucide-octagon-alert">
                                                                <path d="M12 16h.01" />
                                                                <path d="M12 8v4" />
                                                                <path
                                                                    d="M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            Last updated <span class="capitalize cursor-pointer">
                                                                {{ detail.createdAt ? date(detail.createdAt
                                                                    .toDate()).format('D/YYYY') : 'N/A' }}</span>
                                                        </div>

                                                        <div class="flex items-center space-x-2">

                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1.5"
                                                                stroke="currentColor" class="size-4">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                                                            </svg>

                                                            <p>English</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                                <!-- <br />
                            <p>{{ detail.price }} || {{ detail.description }}</p>
                            <p>Lecture {{ detail.lectures }}</p>
                            <p>{{ detail.show_spacial }}</p> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div v-if="productDetails && productDetails.length">
                        <div v-for="category in productDetails" :key="category.id">

                            <div v-for="product in category.product" :key="product.id">

                                <div class="text-white">
                                    <div v-for="detail in product.productDetail" :key="detail.id">
                                        <!-- Display the product detail only if it matches the route param id -->
                                        <div v-if="detail.id === $route.params.id">
                                            <div class="w-80 h-[700px] bg-white shadow-md mr-16">
                                                <div v-if="detail.urlLinkCopy?.length > 0">
                                                    <div class="w-full h-[10px]">
                                                        <div v-html="detail.urlLinkCopy"></div>
                                                    </div>
                                                </div>
                                                <div v-else>
                                                    <p>មិនមានលីងវីដែអូ</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <!-- <div class="w-96 h-[700px] bg-white shadow-md mr-10 ">
                    <div>
                        <div>
                            <img src="" alt="">
                        </div>
                    </div>
                </div> -->
            </div>


        </div>


    </div>
</template>


<script>
import { onMounted, ref } from "vue";
import NavbarView from "./NavbarView.vue";
import {
    fetchCollection,
    fetchSubcollection,
    fetchNestedSubcollection
} from "@/firebase/getNestedSubcollectionWhere"; // Import the reusable functions

import moment from "moment";


export default {
    components: {
        NavbarView,
    },
    setup() {
        const productDetails = ref([]); // Initialize as an empty array
        const isLoading = ref(true);

        // const route = useRoute()

        const date = moment

        onMounted(() => {
            fetchCategoryProductAndProductDetail();
        });
        // Fetch category, product, and product detail
        const fetchCategoryProductAndProductDetail = async () => {
            isLoading.value = true;
            const categoryProduct = [];

            try {
                // Fetch all categories
                const categories = await fetchCollection("categories");

                const fetchPromises = categories.map(async (category) => {
                    // Fetch products under each category
                    const products = await fetchSubcollection("categories", category.id, "product");

                    const productArray = await Promise.all(products.map(async (product) => {
                        // Fetch product details based on the specific ID
                        const productDetail = await fetchNestedSubcollection(
                            "categories",
                            category.id,
                            "product",
                            product.id,
                            "productDetail",

                        );
                        return {
                            ...product,
                            productDetail: productDetail, // Add the filtered product detail
                        };
                    }));

                    if (productArray.length) {
                        categoryProduct.push({
                            id: category.id,
                            categoryName: category.categoryName,
                            description: category.description,
                            image: category.image,
                            product: productArray,
                        });
                    }
                });

                await Promise.all(fetchPromises);
                productDetails.value = categoryProduct;
            } catch (error) {
                console.error("Error fetching product details:", error);
            } finally {
                isLoading.value = false; // Ensure loading state is reset
            }

            console.log("Product Details Fetched:", productDetails.value); // Debugging log
        };


        return { productDetails, isLoading, date };
    },
};
</script>
