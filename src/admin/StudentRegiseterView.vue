<template>

    <div class="bg-white  shadow-sm p-5 border-t-2 border-t-blue-500  animate-fade-up animate-duration-[2000ms]">

        <div class="my-5 flex justify-between">
            <h1 class="text-[20px] font-NotoSansKhmer font-bold">តារាងបញ្ជីចុះឈ្មោះសិស្ស</h1>

            <div class="flex gap-3">
                <button @click="onMountedCurrentComponents('AddStudentRegisterModal')"
                    class="bg-background px-5 py-2.5  text-white flex items-center gap-1 hover:bg-background/90"> <svg
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                    <p class="font-NotoSansKhmer">បង្កើតសិស្សថ្មី</p>
                </button>

            </div>
        </div>
        <div class="flex justify-between">
            <div>
                <select class="border-2 p-2 px-5 outline-none bg-gray-50/20 focus:border-blue-500">
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            

            <div class="relative">
                <input v-model="searchText" type="text"
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
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
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
               
                </tbody>
            </table>
        </div>
    </div>

    <component :is="currentComponents" @close="currentComponents = ''" :documentProducts="products"  />
</template>


<script>

import { useFirestoreCollection, useSubcollection } from '@/firebase/getArrayDocument';

import AddStudentRegisterModal from '@/components/admin/AddStudentRegisterModal.vue';
import moment from 'moment';
import { onMounted, ref } from 'vue';


export default {
    components: {

        AddStudentRegisterModal,
    },
    setup() {
        const products = ref([]);
        const currentComponents = ref("");
  
        const searchText = ref("")
        const isLoading = ref(false)
        const category = ref(null)
        const product = ref(null)
        const date = moment;
        const { documents: categoryDocument, fetchCollection, } = useFirestoreCollection("categories");


        onMounted(async () => {
            await fetchCollection();
            await fetchCategoryProduct();

        });
        const onMountedCurrentComponents = async (component) => {
            currentComponents.value = component;
            category.value = null
            product.value = null
        };


       
        //fetch subcollection
        const fetchCategoryProduct = async () => {

            const orderByField = 'productName';

            try {
                // Fetch all categories and products concurrently
                const categoryPromises = categoryDocument.value.map(async (cate) => {
                    const { subcollectionData: product, fetchSubcollection } = useSubcollection('categories', cate.id, 'product', orderByField);
                    // Fetch products for the category
                    await fetchSubcollection();
                    // Return the category and its products
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

        return {
            onMountedCurrentComponents,
            currentComponents,
            searchText,
            products,
                    date,
            isLoading,
   

        };
    },
};
</script>