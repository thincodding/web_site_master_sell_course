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
                <thead class="text-[16px] text-black/70 p-2 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                    <tr class="font-NotoSansKhmer">
                        <th class="py-4">ឈ្មោះសិស្ស</th>
                        <th class="py-4">វគ្គសិក្សា</th>
                        <th class="py-4">ចំនួន</th>
                        <th class="py-4">មេរៀន</th>
                        <th class="py-4">សកម្មភាព</th>
                    </tr>
                </thead>

                <tbody>
                    <template v-for="cate in studentDetails" :key="cate">
                        <template v-for="pro in cate.product" :key="pro">
                            <template v-for="detail in pro.productDetail" :key="detail">
                                <tr v-for="stu in detail.student" :key="stu">
                                    <td class="py-3">{{ stu.studentName }}</td>
                                    <td>{{ pro.productName }}</td>
                                    <td>{{ stu.qty }}</td>
                                    <td>{{ stu.title }}</td>
                                    <td>
                                        <div class="flex gap-3">
                                            <svg @click="handleDelete(cate, pro, detail, stu)" xmlns="http://www.w3.org/2000/svg"
                                                fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                class="size-6 hover:text-gray-800 cursor-pointer">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>

                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                class="size-6 hover:text-gray-800 cursor-pointer">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </div>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </template>
                </tbody>
            </table>
        </div>
       
    </div>
    <component :is="currentComponents" @close="currentComponents = ''"
     :documentProducts="products"  
     :categoryId="categoryId" :productId="productId" :detail="productDetailId" :student="student" :handleLoadStudent="handleLoadStudent"/>
</template>


<script>

import { useFirestoreCollection, useSubcollection } from '@/firebase/getArrayDocument';

import AddStudentRegisterModal from '@/components/admin/AddStudentRegisterModal.vue';
import moment from 'moment';
import { onMounted, ref } from 'vue';

import getNestedSubcollection from '@/firebase/getNestedSubcollection';
import getNestedSubSubcollection from '@/firebase/getNestedSubsubCollection';
import StudentRegisModalDelete from '@/components/admin/StudentRegisModalDelete.vue'
export default {
    components: {

        AddStudentRegisterModal,
        StudentRegisModalDelete
    },
    setup() {
        const products = ref([]);
        const currentComponents = ref("");
        const searchText = ref("")
        const isLoading = ref(false)
        const category = ref(null)
        const product = ref(null)
        const date = moment;
        const studentDetails = ref(null)
        const categoryId = ref(null)
        const productId = ref(null)
        const productDetailId = ref(null)
        const student = ref(null)
        const { documents: categoryDocument, fetchCollection, } = useFirestoreCollection("categories");


        onMounted(async () => {
            await fetchCollection();
            await fetchCategoryProduct();
            await fetchCategoryProductAndProductDetail();
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

        const fetchCategoryProductAndProductDetail = async () => {
            isLoading.value = true;

            try {
                const categoryPromises = categoryDocument.value.map(async (cate) => {
                    const { subcollectionData: products, fetchSubcollection } = useSubcollection('categories', cate.id, 'product');

                    try {
                        await fetchSubcollection();

                        const productPromises = products.value.map(async (pro) => {
                            const { subcollectionData: productDetail, fetchSubcollections } = getNestedSubcollection('categories', cate.id, 'product', pro.id, 'productDetail');
                            try {
                                await fetchSubcollections();

                                const productDetailPromises = productDetail.value.map(async (detail) => {
                                    const { subSubcollectionData: studentData, fetchSubSubcollections } = getNestedSubSubcollection('categories', cate.id, 'product', pro.id, 'productDetail', detail.id, 'student');
                                   
                                    try {
                                        await fetchSubSubcollections();

                                        return {
                                            ...detail,
                                            student: studentData.value
                                        };
                                    } catch (err) {
                                        console.error(`Error fetching student data for productDetail ${detail.id}:`, err);
                                        return null;
                                    }
                                });

                                const productDetailArray = await Promise.all(productDetailPromises);

                                return {
                                    ...pro,
                                    productDetail: productDetailArray.filter(Boolean)
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

                studentDetails.value = result.filter(Boolean);
            } catch (err) {
                console.error('Error fetching categories:', err);
            }

            isLoading.value = false;
        };

        const handleDelete = (cate, pro, detail, item) => {
            currentComponents.value = 'StudentRegisModalDelete'
            categoryId.value = cate
            productId.value = pro 
            productDetailId.value = detail
            student.value = item
        }

        const handleLoadStudent = async () => {
            await fetchCategoryProductAndProductDetail();
        }



        return {
            onMountedCurrentComponents,
            currentComponents,
            searchText,
            products,
            date,
            isLoading,
            studentDetails,
            handleDelete,
            student,
            categoryId,
            productId,
            productDetailId,
            handleLoadStudent
        };
    },
};
</script>