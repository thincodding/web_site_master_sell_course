<template>

    <div class="bg-white  shadow-sm p-5 border-t-2 border-t-blue-500  animate-fade-up animate-duration-[2000ms]">

        <div class="flex justify-between my-5">
            <h1 class="text-[20px] font-NotoSansKhmer font-bold">តារាងបញ្ជីមេរៀន</h1>

            <div class="flex gap-3">
                <button @click="onMountedCurrentComponents('AddLessionModal')"
                    class="bg-background px-5 py-2.5  text-white flex items-center gap-1 hover:bg-background/90"> <svg
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <p class="font-NotoSansKhmer">បង្កើតមេរៀនថ្មី</p>
                </button>

            </div>
        </div>
        <div class="flex justify-between">
            <div>
                <select class="p-2 px-5 border-2 outline-none bg-gray-50/20 focus:border-blue-500">
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>

            <div class="relative">
                <input v-model="searchText" type="text"
                    class="p-2 pl-4 border-2 outline-none w-96 placeholder:font-NotoSansKhmer bg-gray-50/40 focus:border-blue-500"
                    placeholder="ស្វែងរក...">
                <div class="absolute top-2.5 right-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="text-gray-400 size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>

                </div>
            </div>
        </div>

        <div class="relative mt-3 overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400 ">
                <thead class="text-[16px] text-black/70 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                    <tr class="font-NotoSansKhmer">
                        <th width="20%" class="py-4">ចំណងជើងមេរៀន</th>
                        <th width="10%" class="py-4">ថ្នាក់សិក្សា</th>
                        <th width="10%" class="py-4">បង្រៀនដោយ</th>
                        <th width="7%" class="py-4">តម្លៃសិក្សា</th>
                        <th width="7%" class="py-4">បញ្ចុះតម្លៃ</th>
                        <!-- <th width="10%" class="py-4">លក្ខណ:ផលិតផល</th> -->
                        <th width="15%" class="py-4">ពិពណ៌នា</th>
                        <!-- <th width="10%" class="py-4">វីដេអូមេរៀន</th> -->
                        <th width="5%" class="py-4">រូបភាព</th>
                        <th width="15%" class="py-4">កាលបរិច្ឆេត</th>
                        <th width="5%" class="py-4">សកម្មភាព</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-if="isLoading" class="text-center">
                        <td colspan="10" class="my-2 text-center text-md font-NotoSansKhmer">សូមរងចាំ...</td>
                    </tr>
                    <template v-else>
                        <template v-for="cat in filterProductDetail" :key="cat.id">
                            <template v-for="pro in cat.product" :key="pro.id">
                                <template v-for="detail in pro.productDetail" :key="detail.id">
                                    <tr v-if="detail.id !== 'dummy'">
                                        <td>
                                            {{ detail.title }}
                                            <span v-if="detail.isBestSeller"
                                                class="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs font-semibold rounded">
                                                លក់ដាច់បំផុត
                                            </span>
                                        </td>
                                        <td>
                                            <p class="bg-blue-500 pl-2 text-xs p-0.5 text-white rounded-full">
                                                {{ pro.productName }}
                                            </p>
                                        </td>
                                        <td>{{ detail.lectures }}</td>
                                        <td>{{ detail.price }} ដុល្លា</td>
                                        <td>{{ detail.discount }} ភាគរយ</td>
                                        <td>
                                            <div v-if="detail.desctiption?.length > 0">
                                                <p v-html="detail.desctiption" class="line-clamp-2"></p>
                                            </div>
                                            <div v-else>
                                                <p>មិនមានទិន្ន័យ</p>
                                            </div>
                                        </td>

                                        <td>
                                            <div v-if="detail.imageUrl?.length > 0">
                                                <img :src="detail.imageUrl" class="object-contain w-10 h-10" alt="">
                                            </div>

                                            <div v-else>
                                                <img class="w-10 h-10"
                                                    src="https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
                                                    alt="">
                                            </div>
                                        </td>
                                        <td>
                                            {{ detail.createdAt ? date(detail.createdAt.toDate()).format(`ddd D, MMM
                                            YYYY ម៉ោង hh:mm`) : 'N/A' }}
                                        </td>
                                        <td align="center">
                                            <div class="flex items-center justify-center">
                                                <div v-if="isOpenAction[detail.id]" class="relative inline-block"
                                                    v-motion :initial="{ scale: 0.9 }"
                                                    :visible="{ opacity: 1, scale: 1 }">
                                                    <!-- Your action menu goes here -->
                                                    <div
                                                        class="absolute flex items-center justify-center w-28 p-3 text-gray-600 bg-gray-100 shadow-lg 
                                                            -left-[8.2rem] -top-8 dark:shadow-none shadow-gray-200 dark:bg-gray-800 dark:text-white">
                                                        <div class="space-y-2">
                                                            <button @click="handleDelete(cat, pro, detail)"
                                                                class="flex items-center gap-2 hover:text-red-500">
                                                                <!-- Delete button -->
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                    viewBox="0 0 24 24" stroke-width="1.5"
                                                                    stroke="currentColor" class="size-4">
                                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                </svg>
                                                                <span class="text-sm font-NotoSansKhmer">លុប</span>
                                                            </button>
                                                            <button @click="handleEditProductDetail(cat, pro, detail)"
                                                                class="flex items-center gap-2 hover:text-red-500">
                                                                <!-- Edit button -->
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                    viewBox="0 0 24 24" stroke-width="1.5"
                                                                    stroke="currentColor" class="size-4">
                                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                                </svg>
                                                                <span class="text-sm font-NotoSansKhmer">កែប្រែ</span>
                                                            </button>
                                                        </div>
                                                        <!-- Arrow pointing to the action menu -->
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                            class="absolute w-8 h-6 text-gray-100 transform rotate-45 -translate-y-1/2 fill-current -right-3 top-1/2 dark:text-gray-800"
                                                            stroke="currentColor" viewBox="0 0 24 24">
                                                            <path
                                                                d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z">
                                                            </path>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <!-- Button to trigger action menu -->
                                                <svg @click="handleIsOpenAction(detail.id)"
                                                    xmlns="http://www.w3.org/2000/svg" width="26" height="26"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="cursor-pointer lucide lucide-ellipsis hover:text-red-700">
                                                    <circle cx="12" cy="12" r="1" />
                                                    <circle cx="19" cy="12" r="1" />
                                                    <circle cx="5" cy="12" r="1" />
                                                </svg>
                                            </div>
                                        </td>

                                    </tr>
                                </template>
                            </template>
                        </template>
                    </template>
                </tbody>
            </table>
        </div>
    </div>

    <component :is="currentComponents" @close="currentComponents = ''" :documentProducts="products"
        :productDetails="productDetails" :category='category' :categories='category' :product='product'
        :productDetail="productDetail" :handleLoadProductDetail="handleLoadProductDetail" />
</template>






<script>
import AddProductModalVue from '@/components/admin/AddProductModal.vue';
import ProductModalDeleteComponent from '@/components/admin/ProductModalDeleteComponent.vue';
import { useFirestoreCollection, useSubcollection } from '@/firebase/getArrayDocument';
import getNestedSubcollection from '@/firebase/getNestedSubcollection';
import AddLessionModal from '@/components/admin/AddLessionModal.vue';
import LessionModalDeleteComponent from '@/components/admin/LessionModalDeleteComponent.vue';
import getNestedSubSubcollection from '@/firebase/getNestedSubsubCollection';

import moment from 'moment';
import { onMounted, ref, computed } from 'vue';

export default {
    components: {
        AddProductModalVue,
        ProductModalDeleteComponent,
        AddLessionModal,
        LessionModalDeleteComponent
    },
    setup() {
        const products = ref([]);
        const productDetails = ref([]);
        const currentComponents = ref("");
        const isOpenAction = ref({});
        const searchText = ref("");
        const isLoading = ref(false);
        const category = ref(null);
        const product = ref(null);
        const productDetail = ref(null);
        const date = moment;

        // Pagination States
        const currentPage = ref(1);  // Current page
        const itemsPerPage = ref(10); // Number of items per page

        // Firestore Collections
        const { documents: categoryDocument, fetchCollection } = useFirestoreCollection("categories");

        onMounted(async () => {
            await fetchCollection();
            await fetchCategoryProduct();
            await fetchCategoryProductAndProductDetail();
        });

        const onMountedCurrentComponents = async (component) => {
            currentComponents.value = component;
            category.value = null;
            product.value = null;
            productDetail.value = null;
        };

        // Fetch Categories and Products
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

        // Fetch ProductDetails and Students, and Compute isBestSeller
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

                                // Fetch students for each productDetail
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

                                        // Compute the count of students with the same title
                                        const titleCounts = students.value.reduce((acc, stu) => {
                                            const title = stu.title || 'Unknown';
                                            acc[title] = (acc[title] || 0) + 1;
                                            return acc;
                                        }, {});

                                        const isBestSeller = titleCounts[detail.title] > 2;

                                        return {
                                            ...detail,
                                            student: students.value,
                                            isBestSeller
                                        };
                                    } catch (err) {
                                        console.error(`Error fetching students for productDetail ${detail.id}:`, err);
                                        return {
                                            ...detail,
                                            student: [],
                                            isBestSeller: false
                                        };
                                    }
                                }));

                                return {
                                    ...pro,
                                    productDetail: productDetailWithStudents
                                };
                            } catch (err) {
                                console.error(`Error fetching productDetail for product ${pro.id}:`, err);
                                return null;
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

        // Filter Logic Based on Search Text and Pagination
        const filterProductDetail = computed(() => {
            let filteredData = productDetails.value;

            if (searchText.value) {
                const lowerSearch = searchText.value.toLowerCase();
                filteredData = filteredData.map(category => ({
                    ...category,
                    product: category.product.map(pro => ({
                        ...pro,
                        productDetail: pro.productDetail.filter(detail =>
                            detail.title.toLowerCase().includes(lowerSearch) ||
                            pro.productName.toLowerCase().includes(lowerSearch)
                        )
                    })).filter(pro => pro.productDetail.length > 0)
                })).filter(category => category.product.length > 0);
            }

            // Paginate
            const start = (currentPage.value - 1) * itemsPerPage.value;
            const end = start + itemsPerPage.value;
            return filteredData.slice(start, end);
        });

        // Handle Action Buttons
        const handleIsOpenAction = (id) => {
            if (id) {
                if (isOpenAction.value[id]) {
                    isOpenAction.value = {};
                } else {
                    isOpenAction.value = { [id]: true };
                }
            } else {
                isOpenAction.value = {};
            }
        };

        const handleLoadProductDetail = async () => {
            await fetchCategoryProductAndProductDetail();
        };

        const handleDelete = (cat, pro, detail) => {
            currentComponents.value = 'LessionModalDeleteComponent';
            category.value = cat;
            product.value = pro;
            productDetail.value = detail;
        };

        const handleEditProductDetail = (cat, pro, detail) => {
            currentComponents.value = 'AddLessionModal';
            category.value = cat;
            product.value = pro;
            productDetail.value = detail;
        };

        // Pagination Controls
        const nextPage = () => {
            if (currentPage.value * itemsPerPage.value < productDetails.value.length) {
                currentPage.value++;
            }
        };

        const prevPage = () => {
            if (currentPage.value > 1) {
                currentPage.value--;
            }
        };

        return {
            onMountedCurrentComponents,
            currentComponents,
            searchText,
            products,
            filterProductDetail,
            handleIsOpenAction,
            isOpenAction,
            fetchCategoryProductAndProductDetail,
            date,
            productDetails,
            isLoading,
            handleDelete,
            category,
            product,
            productDetail,
            handleLoadProductDetail,
            handleEditProductDetail,
            nextPage,
            prevPage,
            currentPage,
            itemsPerPage
        };
    },
};
</script>
