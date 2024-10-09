<template>
    <div class="h-screen bg-black/50 w-full z-10 fixed top-0 left-0 select-none">
        <div class="flex justify-center items-center mt-5">
            <div class="bg-white w-[50%] overflow-y-auto" v-motion :initial="{ scale: 0.9 }"
                :visible="{ opacity: 1, scale: 1 }">


                <div class="p-4">
                    <div class="flex justify-between">
                        <h1 class="font-bold font-NotoSansKhmer">បង្កើតសិស្សរៀនថ្មី</h1>
                        <p @click="handleClose" class="cursor-pointer hover:text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-x">
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </p>
                    </div>
                    <div>
                        <form class="mt-3">

                            <div class="space-y-2">
                                <div class="grid grid-cols-2 gap-3">
                                    <div class="space-y-1">
                                        <label for="" class="font-NotoSansKhmer font-[500]">ឈ្មោះសិស្ស: *</label>
                                        <input type="text" required placeholder="ឈ្មោះសិស្ស" class="input_text"
                                            v-model="studentName">
                                    </div>

                                    <div class="space-y-1">
                                        <label for="productType" class="font-NotoSansKhmer font-[500]">កម្មវិធីសិក្សា:
                                            *</label>

                                        <select v-model="categoryId" @change="filterSearchCategory" required
                                            class="input_text p-[9.4px] capitalize">
                                            <option selected disabled value="">--ជ្រើសរើសវគ្គសិក្សា--</option>
                                            <option v-for="cat in documentProducts" :key="cat.id" :value="cat.id">
                                                {{ cat.categoryName }}
                                            </option>
                                        </select>

                                        <select v-if="category.length > 0" v-model="productId" required
                                            class="input_text p-[9.4px] capitalize">
                                            <option selected value="">--ជ្រើសរើសផលិតផល--</option>
                                            <option v-for="pro in category" :key="pro.id" :value="pro.id">
                                                {{ pro.productName }}
                                            </option>
                                        </select>

                                    </div>
                                </div>

                                <div v-if="selectedProductDetail.length > 0">
                                    <div class="flex items-center gap-2 my-2"><svg xmlns="http://www.w3.org/2000/svg"
                                            fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                            class="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                                        </svg>
                                        <p class="font-bold">ជ្រើសរើសមេរៀនសិក្សា</p>
                                    </div>
                                    <div class="grid grid-cols-4 gap-3 h-[400px] overflow-y-auto p-4">

                                        <div v-for="detail in selectedProductDetail" :key="detail.id">
                                            <div @click="handleOpen(detail)"
                                                class="shadow bg-white h-44 rounded-md p-1 flex justify-center mt-10 cursor-pointer hover:bg-gray-50">
                                                <div v-if="detail.imageUrl" class="p-2 ">
                                                    <div class="space-y-2">
                                                        <img class="w-full object-contain" :src="detail.imageUrl"
                                                            alt="Lesson image">

                                                        <p
                                                            class="text-sm line-clamp-2 font-playfair font-[500] text-background">
                                                            {{ detail.title }}</p>
                                                    </div>
                                                </div>
                                                <div v-else class="flex justify-center items-center">
                                                    <p>មិនមានមេរៀន</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <!-- <div class="" v-if="selectedProductDetail.length > 0">

                                    <div class="space-y-1">
                                        <label for="" class="font-NotoSansKhmer font-[500]">មេរៀនសិក្សា: *</label>
                                        <select  required
                                            class="input_text p-[9.4px] capitalize">
                                            <option selected value="">--ជ្រើសរើសមេរៀនសិក្សា--</option>
                                            <option v-for="detail in selectedProductDetail" :key="detail.id"
                                                :value="detail.id">
                                                {{ detail.title }} <img :src="detail.imageUrl" />
                                            </option>
                                        </select>
                                    </div>

                                </div> -->
                            </div>

                            <!-- Product Details Section -->

                            <!-- <div class="flex justify-end gap-2 mt-20">
                                <button @click.prevent="handleClose" class="button_only_close">បោះបង់</button>
                                <button class="button_only_submit">រក្សាទុក</button>
                                <button v-else disabled
                                    class="bg-blue-400 px-8 py-2.5 text-white flex items-center gap-1 font-NotoSansKhmer font-bold">
                                    កំពុងរក្សាទុក...
                                </button>
                            </div> -->

                            <div v-if="openModalSave"
                                class="w-full  fixed top-0 left-0 flex justify-center bg-black/15 h-full   items-center">
                                <div class="h-96 bg-white border-t-2 border-t-blue-500  shadow-md w-[90%] p-4" v-motion
                                    :initial="{ scale: 0.9 }" :visible="{ opacity: 1, scale: 1 }">
                                    <div class="flex justify-between">
                                        <div class="flex gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round"
                                                class="lucide lucide-notebook-pen">
                                                <path
                                                    d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
                                                <path d="M2 6h4" />
                                                <path d="M2 10h4" />
                                                <path d="M2 14h4" />
                                                <path d="M2 18h4" />
                                                <path
                                                    d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                                            </svg>
                                            <p class="font-bold">ចុះឈ្មោះ</p>
                                        </div>
                                        <div @click="handleCloseX" class="cursor-pointer hover:text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x">
                                                <path d="M18 6 6 18" />
                                                <path d="m6 6 12 12" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div>
                                        <div class="p-4 mt-3 space-y-3">
                                            <div>
                                                <img class="w-52" :src="items.imageUrl" alt="">
                                                <div class="flex items-center gap-1 mt-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        class="lucide lucide-file-code">
                                                        <path d="M10 12.5 8 15l2 2.5" />
                                                        <path d="m14 12.5 2 2.5-2 2.5" />
                                                        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                                                        <path
                                                            d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
                                                    </svg>
                                                    <p>កញ្ចប់វគ្គសិក្សា</p>
                                                </div>
                                            </div>

                                            <div class="flex w-[40%] gap-1">
                                                <p>មេរៀន៖</p>
                                                <p class="font-bold ">{{ items.title }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';

import getDocument from '@/firebase/getDocument';
import { useFirestoreCollection, useSubcollection } from '@/firebase/getArrayDocument';
import getNestedSubcollection from '@/firebase/getNestedSubcollection';

export default {
    props: ['documentProducts'],

    setup(props, { emit }) {
        const isLoading = ref(true);
        const categoryId = ref('');
        const productId = ref("");
        const category = ref([]);
        const productDetails = ref([]);
        const studentName = ref('');
        const lectures = ref('');
        const selectedProductDetail = ref([]);
        const openModalSave = ref(false)
        const items = ref(null)

        const { documents: categoryDocument, fetchCollection } = useFirestoreCollection("categories");

        onMounted(async () => {
            await fetchCollection();
            await fetchCategoryProductAndProductDetail();
        });

        // Filter display based on selected category
        const filterSearchCategory = () => {
            const { documents } = getDocument('categories', categoryId.value, 'product');
            watch(documents, () => {
                if (documents.value.length > 0) {
                    category.value = documents.value;
                    console.log('category: ', category.value);
                } else {
                    category.value = [];
                }
            });
        };

        // Fetch categories, products, and product details
        const fetchCategoryProductAndProductDetail = async () => {
            isLoading.value = true;

            const orderByField = 'productName';

            try {
                // Fetch all categories first
                const categoryPromises = categoryDocument.value.map(async (cate) => {
                    const { subcollectionData: products, fetchSubcollection } = useSubcollection('categories', cate.id, 'product', orderByField);
                    console.log(products);
                    try {
                        await fetchSubcollection();

                        // Fetch all products and their details concurrently
                        const productPromises = products.value.map(async (pro) => {
                            const { subcollectionData: productDetail, fetchSubcollections } = getNestedSubcollection('categories', cate.id, 'product', pro.id, 'productDetail');

                            try {
                                await fetchSubcollections();

                                return {
                                    ...pro,
                                    productDetail: productDetail.value // Assuming this is an array
                                };
                            } catch (err) {
                                console.error(`Error processing product ${pro.id}:`, err);
                                return null; // Handle failed product fetch
                            }
                        });

                        const productArray = await Promise.all(productPromises);

                        return {
                            id: cate.id,
                            categoryName: cate.categoryName,
                            description: cate.description,
                            image: cate.image,
                            product: productArray.filter(Boolean)
                        };
                    } catch (err) {
                        console.error(`Error processing category ${cate.id}:`, err);
                        return null; // Handle failed category fetch
                    }
                });

                const result = await Promise.all(categoryPromises);

                productDetails.value = result.filter(Boolean);
                console.log(productDetails.value);
            } catch (err) {
                console.error('Error fetching categories:', err);
            }

            isLoading.value = false;
        };

        // Handle closing the modal
        const handleClose = () => {
            emit("close");
        };

        watch(categoryId, (cat) => {
            console.log(cat);
            filterSearchCategory();
            productId.value = "";
            selectedProductDetail.value = [];
        });

        watch(productId, (pro) => {
            console.log(pro);
            showProductDetail();
        });

        // Method to display selected product details
        const showProductDetail = () => {
            if (!productId.value) {
                selectedProductDetail.value = [];
                return;
            }

            // Find the selected product in productDetails
            for (const category of productDetails.value) {
                const product = category.product.find(p => p.id === productId.value);
                if (product) {
                    selectedProductDetail.value = product.productDetail || []; // Ensure it's an array
                    break;
                }
            }

            // If productDetail is nested or requires additional fetching, adjust accordingly
            console.log('Selected Product Details:', selectedProductDetail.value);
        };


        const handleOpen = (item) => {
            openModalSave.value = !openModalSave.value
            items.value = item

        }

        const handleCloseX = () => {
            openModalSave.value = false
        }


        return {
            handleCloseX,
            handleClose,
            isLoading,
            categoryId,
            productId,
            filterSearchCategory,
            category,
            productDetails,
            selectedProductDetail,
            studentName,
            lectures,
            showProductDetail,
            openModalSave,
            handleOpen,
            items
        };
    }
};
</script>
