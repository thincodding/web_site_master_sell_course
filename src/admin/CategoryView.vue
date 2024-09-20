<template>

    <div class="bg-white  shadow-sm p-5 border-t-2 border-t-blue-500  animate-fade-up animate-duration-[2000ms]">



        <div class="my-5 flex justify-between">
            <h1 class="text-[20px] font-NotoSansKhmer font-bold">តារាងបញ្ជីវគ្គសិក្សា</h1>
            <button @click="addCategory"
                class="bg-blue-500 px-5 py-2.5  text-white flex items-center gap-1 hover:bg-blue-400"> <svg
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>

                <p class="font-NotoSansKhmer">បង្កើតថ្មី</p>
            </button>
        </div>
        <div class="flex justify-between">
            <div>
                <select v-model="pageSize" class="border-2 p-2 px-5 outline-none bg-gray-50/20 focus:border-blue-500">
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>

            <div class="relative">
                <input type="text" v-model="searchText"
                    class="p-2 w-96 border-2 placeholder:font-NotoSansKhmer bg-gray-50/40 outline-none focus:border-blue-500 pl-4"
                    placeholder="ស្វែងរក...">
                <div class="absolute top-2.5 right-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6 text-gray-400">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>

                </div>
            </div>
        </div>

        <div class="relative overflow-x-auto mt-3">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-10">
                <thead class="text-[16px]  text-black/70 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                    <tr class="font-NotoSansKhmer ">
                        <th width="25%" scope="col" class="py-4 font-NotoSansKhmer">
                            ឈ្មោះប្រភេទ
                        </th>
                        <th width="25%" scope="col" class=" py-3 font-NotoSansKhmer">
                            ពិពណ៌នា
                        </th>
                        <th width="20%" scope="col" class=" py-3 font-NotoSansKhmer">
                            រូបភាព
                        </th>
                        <th width="20%" scope="col" class=" py-3 font-NotoSansKhmer">
                            កាលបរិច្ឆេត
                        </th>
                        <th width="5%" scope="col" class=" py-3 font-NotoSansKhmer">
                            សកម្មភាព
                        </th>
                    </tr>
                </thead>
                <tbody>

                    <div v-if="isLoading" class="text-center">
                        <p class="absolute left-1/2 top-16 text-lg font-NotoSansKhmer">សូមរងចាំ...</p>
                    </div>

                    <tr v-else v-for="cat in categories" :key="cat"
                        class="border-b dark:bg-gray-800 dark:border-gray-700 select-none">
                        <td class=" py-2 capitalize">
                            {{ cat.categoryName }}
                        </td>
                        <td class=" py-3">
                            <p v-html="cat.descripton"></p>
                        </td>
                        <td class=" py-2 ">
                            <div class="flex ">
                                <img :src="cat.image" class="w-10 h-10" alt="">
                            </div>
                        </td>
                        <td class=" py-3">
                            <!-- {{ cat.createdAt }} -->
                            {{ cat.createdAt ? date(cat.createdAt.toDate()).format(`ddd D, MMM YYYY ${"ម៉ោង"} hh:mm`) :
                                'N/A' }}
                        </td>
                        <td align="center" class=" py-3 ">
                            <div class="flex justify-center">

                                <div v-if="isOpenAction[cat.id]" class="relative inline-block" v-motion
                                    :initial="{ scale: 0.9 }" :visible="{ opacity: 1, scale: 1 }">
                                    <div class="absolute flex items-center justify-center w-28 p-3 text-gray-600 bg-gray-100 shadow-lg 
                  -left-[8.2rem] -top-4 dark:shadow-none shadow-gray-200 dark:bg-gray-800 dark:text-white">
                                        <div class="space-y-2">
                                            <button @click="handDeleteComponent(cat)"
                                                class="flex items-center gap-2 hover:text-red-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor" class="size-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                                <span class="font-NotoSansKhmer text-sm">លុប</span>
                                            </button>
                                            <button @click="handleEditData(cat)"
                                                class="flex items-center gap-2 hover:text-red-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor" class="size-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>

                                                <span class="font-NotoSansKhmer text-sm">កែប្រែ</span>

                                            </button>
                                        </div>


                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            class="absolute w-8 h-6 text-gray-100 transform rotate-45 -translate-y-1/2 fill-current -right-3 top-1/2 dark:text-gray-800"
                                            stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z">
                                            </path>
                                        </svg>
                                    </div>
                                </div>


                                <svg @click="handleIsOpenAction(cat.id)" xmlns="http://www.w3.org/2000/svg" width="26"
                                    height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round"
                                    class="lucide lucide-ellipsis hover:text-red-700 cursor-pointer">
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="19" cy="12" r="1" />
                                    <circle cx="5" cy="12" r="1" />
                                </svg>
                            </div>
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>


        <div class="mb-10 flex justify-end">

            <div v-if="totalPages > 1" class="flex space-x-2 mt-4 items-center">
                <button @click="loadPreviousPage" :disabled="currentPage === 1" :class="{
                    'bg-blue-400 cursor-not-allowed': currentPage === 1,
                    'bg-blue-500 hover:bg-gray-400': currentPage !== 1
                }" class="p-2 px-4 text-white transition-all duration-150 ease-in-out font-NotoSansKhmer text-sm">
                    ត្រឡប់
                </button>

                <div class="flex space-x-2">
                    <button v-for="page in computedPages" :key="page"
                        :class="{ 'bg-blue-500 text-white': currentPage === page, 'bg-gray-300 text-gray-700': currentPage !== page }"
                        class="p-2 px-4   transition-all duration-150 ease-in-out text-sm">
                        {{ page }}
                    </button>
                </div>

                <button @click="loadNextPage" :disabled="currentPage === totalPages" :class="{
                    'bg-blue-300 cursor-not-allowed': currentPage === totalPages,
                    'bg-blue-500 hover:bg-gray-400': currentPage !== totalPages
                }" class="p-2 px-4 text-white transition-all duration-150 ease-in-out font-NotoSansKhmer text-sm">
                    បន្ទាប់
                </button>

            </div>
        </div>
    </div>


    <component :is="currentComponent" :dataSaved="handleDataSaved" @close="currentComponent = ''"
        :editCategory='editCategory' :handleQueryCategory='handleQueryCategory' :handleBackPaginate="handleBackPaginate"
        :cate="cate" />
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';
import CategoryModalComponent from '@/components/admin/CategoryModalComponent.vue';
import getCollection from '@/firebase/getCollection';
import { limit, orderBy } from 'firebase/firestore';
import getCollectionPaginate from '@/firebase/usePaginate';
import getCollectionSearch from '@/firebase/getCollectionSearch';
import CategoryModalDeleteComponent from '@/components/admin/CategoryModalDeleteComponent.vue';
import moment from 'moment';


export default {
    components: {
        CategoryModalComponent,
        CategoryModalDeleteComponent
    },
    setup() {

        const categories = ref([]);
        const currentPage = ref(1);
        const totalPages = ref(1);
        const pageSize = ref(25);
        const isLoading = ref(false)
        const currentComponent = ref("")
        const searchText = ref("")
        const date = moment
        const isOpenAction = ref({});
        const cate = ref(null)
        const editCategory = ref(null)

        const { document } = getCollection("categories")



        onMounted(async () => {

            await handleQueryCategory();
            totalPages.value = Math.ceil(await getCollectionLength("categories", []) / pageSize.value);
        });


        watch(pageSize, async () => {
            await handleQueryCategory();
            currentPage.value = 1;
            totalPages.value = Math.ceil(await getCollectionLength("categories", []) / pageSize.value);
        });

        const queryDocs = ref([
            orderBy("categoryName", 'desc'),
            limit(pageSize.value),
        ]);

        const { previousPage, nextPage, getCollectionLength } = getCollectionPaginate("categories", queryDocs.value, (data) => {
            categories.value = data;
        });



        const handleQueryCategory = async () => {
            isLoading.value = true;

            try {
                queryDocs.value = [
                    limit(pageSize.value),
                    orderBy("categoryName", 'desc'),
                ];
                await getCollectionPaginate("categories", queryDocs.value, (data) => {
                    categories.value = data;
                    currentPage.value = 1;
                });

                totalPages.value = Math.ceil(await getCollectionLength("categories", []) / pageSize.value);
            } catch (err) {
                console.log("Failed to fetch data", err);
            }
            finally {
                isLoading.value = false;
            }
        }


        const loadPreviousPage = async () => {
            if (isLoading.value) return; // Prevent if already loading
            isLoading.value = true;
            try {
                const firstDocument = categories.value[0];
                if (firstDocument) {
                    await previousPage(firstDocument.id, pageSize.value);
                    currentPage.value -= 1;
                }
            } catch (err) {
                console.error("Error fetching previous page:", err);
            } finally {
                isLoading.value = false; // Reset loading state
            }
        };

        const loadNextPage = async () => {
            if (isLoading.value) return; // Prevent if already loading
            isLoading.value = true;
            try {
                const lastDocument = categories.value[categories.value.length - 1];
                if (lastDocument) {
                    await nextPage(lastDocument.id, pageSize.value);
                    currentPage.value += 1;
                }
            } catch (err) {
                console.error("Error fetching next page:", err);
            } finally {
                isLoading.value = false; // Reset loading state
            }
        };


        //count paginate
        const computedPages = computed(() => {
            const pages = [];
            const maxPages = 3; // Number of visible pages
            const start = Math.max(1, currentPage.value - Math.floor(maxPages / 2));
            const end = Math.min(totalPages.value, currentPage.value + Math.floor(maxPages / 2));

            if (start > 1) {
                pages.push(1);
                if (start > 3) pages.push('...');
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < totalPages.value) {
                if (end < totalPages.value - 1) pages.push('...');
                pages.push(totalPages.value);
            }

            return pages;
        });


        //handle add modal
        const onMountedComponents = (component) => {
            currentComponent.value = component
        }

        //search
        watch(searchText, async (newVal) => {
            isLoading.value = true;
            if (newVal.trim()) {
                currentPage.value = 1;  // Reset current page to 1 on search
                const { documents } = getCollectionSearch('categories', newVal.trim().toLowerCase(), 'categoryName');
                watch(documents, () => {
                    categories.value = documents.value;
                    totalPages.value = 1;
                    isLoading.value = false;

                });
            } else {
                handleQueryCategory();
            }
        });

        //handle Action delete
        const handleIsOpenAction = (id) => {
            // isOpenAction.value[id] = !isOpenAction.value[id]
            if (id) {
                if (isOpenAction.value[id]) {

                    isOpenAction.value = {};
                } else {
                    isOpenAction.value = { [id]: true };
                }
            } else {
                isOpenAction.value = {};
            }
        }

        //handle delete 
        const handDeleteComponent = async (item) => {
            onMountedComponents("CategoryModalDeleteComponent")
            cate.value = item
        }



        // Back paginate function
        // const handleBackPaginate = async (id) => {
        //     const currentPageCategories = categories.value;
        //     const remainingCategories = currentPageCategories.filter(category => category.id !== id);

        //     categories.value = remainingCategories;

        //     if (remainingCategories.length === 0) {
        //         if (currentPage.value > 1) {
        //             currentPage.value -= 1;
        //             await handleQueryCategory(); // Load the data for the previous page
        //         }
        //     }


        //     else if (currentPage.value === 1) {

        //         await handleQueryCategory(); // Reload the data for the current page
        //     } else {
        //         console.log("No Category delete");
        //     }
        // };


        const handleBackPaginate = async (id) => {
            const currentPageCategories = categories.value;
            const remainingCategories = currentPageCategories.filter(category => category.id !== id);

            // Update categories with the remaining ones after deletion
            categories.value = remainingCategories;

            // Check if the current page is now empty after deletion
            if (remainingCategories.length === 0) {
                if (currentPage.value > 1) {
                    // Move to the previous page if not on the first page
                    currentPage.value--; // Move to the previous page
                    await handleQueryCategory(currentPage.value); // Reload data for the previous page
                    console.log("Back paginated to the previous page");
                } else if (currentPage.value === 1) {
                    // If on the first page and all categories are deleted, reload the first page or show empty state
                    await handleQueryCategory(currentPage.value); // Reload first page data or show empty state
                    console.log("No more categories on the first page");
                }

            } else {
                // There are still categories left on the current page
                console.log("Category deleted, page updated without moving pages");
            }
        };


        //save reload paginate
        const handleDataSaved = async () => {
            const currentPageCategories = categories.value;
            const isCurrentPageFull = currentPageCategories.length === pageSize.value;
            const isLastPage = currentPage.value === totalPages.value;
            const isFirstPage = currentPage.value === 1;

            // Save the category data here
            if (isCurrentPageFull) {
                if (isLastPage) {
                    // window.location.reload();
                    console.log("Current page is full and this is the last page. Refreshing the current page.");
                    await handleQueryCategory(); // Refresh the current page
                    // await handleBackPaginate()
                } else {
                    // window.location.reload();
                    console.log("Current page is full. Moving to the next page.");
                    // await loadPreviousPage()
                    await handleQueryCategory(); // Move to the next page and load data
                    // await handleBackPaginate()
                }
            } else {
                if (isFirstPage) {
                    window.location.reload();
                    await handleQueryCategory(); // Refresh the current page
                    // await handleBackPaginate()
                    console.log("Current page is not full and this is the first page. No need to move back.");
                    // Optionally, you can refresh the current page data if necessary
                    // await loadPreviousPage()

                } else {
                    // await loadPreviousPage();
                    // window.location.reload();
                    await handleQueryCategory();
                    // await handleBackPaginate()
                    console.log("Current page is not full. Moving to the previous page.");

                    // Move to the previous page and load data
                }
            }
        };


        //add category modal
        const addCategory = async () => {
            currentComponent.value = 'CategoryModalComponent'
            editCategory.value = null
        }

        //edit
        const handleEditData = async (item) => {
            currentComponent.value = 'CategoryModalComponent'
            editCategory.value = item
        }



        return { addCategory, handleDataSaved, currentComponent, onMountedComponents, document, loadPreviousPage, loadNextPage, totalPages, currentPage, pageSize, isLoading, categories, computedPages, searchText, date, isOpenAction, handleIsOpenAction, handDeleteComponent, cate, handleQueryCategory, handleBackPaginate, handleEditData, editCategory }

    }
}

</script>
<style></style>