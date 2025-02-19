<template>
    <div class="fixed top-0 left-0 z-10 w-full h-screen select-none bg-black/50">
        <div class="flex items-center justify-center mt-5">
            <div class="bg-white w-[60%] overflow-y-auto" v-motion :initial="{ scale: 0.9 }"
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
                        <form @submit.prevent="handleSubmitStudent" class="mt-3">
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
                                    <div class="grid h-[700px] grid-cols-3 gap-3 p-4 overflow-y-auto ">

                                        <div v-for="detail in selectedProductDetail" :key="detail.id">
                                            <div @click="handleOpen(detail)"
                                                class="flex justify-center p-1 mt-10 border rounded-md cursor-pointer hover:bg-gray-50" v-if="detail.price !== 0">
                                                <div v-if="detail.imageUrl" class="p-2 ">
                                                    <div class="space-y-2" >
                                                        <img class="object-contain w-full" :src="detail.imageUrl"
                                                            alt="Lesson image">

                                                        <div class="flex items-center gap-1 ">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                height="24" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" stroke-width="2"
                                                                stroke-linecap="round" stroke-linejoin="round"
                                                                class="lucide lucide-chevrons-left-right">
                                                                <path d="m9 7-5 5 5 5" />
                                                                <path d="m15 7 5 5-5 5" />
                                                            </svg>
                                                            <p
                                                                class="text-sm line-clamp-2 font-playfair font-[500] text-background">
                                                                {{ detail.title }}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-else class="flex items-center justify-center">
                                                    <p>មិនមានមេរៀន</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div v-if="openModalSave"
                                class="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black/30">
                                <div class="h-[500px] overflow-y-auto  bg-white border-t-2 border-t-blue-500  shadow-md w-[70%] p-4"
                                    v-motion :initial="{ scale: 0.9 }" :visible="{ opacity: 1, scale: 1 }">
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

                                    <div class="grid grid-cols-2 gap-2 ">

                                        <div class="p-4 m-3 space-y-3 border">
                                            <div>
                                                <div class="flex items-center justify-center">
                                                    <img class="w-52 border-[1px]" :src="items.imageUrl" alt="">

                                                </div>
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

                                            <div class="flex gap-1">
                                                <p>មេរៀន៖</p>
                                                <p class="font-bold line-clamp-3">{{ items.title }}</p>
                                            </div>

                                            <div class="flex gap-1">
                                                <p>តម្លៃសិក្សា៖</p>
                                                <p class="font-bold line-clamp-3">${{ items.price }}</p>
                                            </div>
                                        </div>

                                        <div class="mt-4 space-y-1">
                                            <input type="text" hidden readonly v-model="productDetailId"
                                                class="input_text">
                                            <div class="space-y-1">
                                                <label for="" class="font-NotoSansKhmer font-[500]">ចំនួន:*</label>
                                                <input type="number" readonly required placeholder="ចំនួន"
                                                    class="bg-gray-100 input_text" v-model="qty">
                                            </div>

                                            <div class="space-y-1">
                                                <label for="" class="font-NotoSansKhmer font-[500]">អុីម៉ែលសិស្ស: *</label>
                                                <input type="text"  required placeholder="អុីម៉ែលសិស្ស"
                                                    class=" input_text" v-model="email">
                                            </div>
                                        </div>

                                    </div>

                                    <div class="flex justify-end">
                                        <button v-if="!isLoading" class="fixed button_only_submit">រក្សាទុក</button>
                                        <button v-else disabled
                                            class="bg-blue-400 px-8 py-2.5  text-white flex items-center gap-1  font-NotoSansKhmer font-bold">កំពុងរក្សាទុក...</button>
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
import useNestedSubDocument from '@/firebase/useNestedSubcollectionDocument';
import { handleMessageSuccess } from '../js/messageHandler';
import { timestamp,projectFirestore } from '@/config/config';
// import useCollection from '@/firebase/useCollection';
import { collection, doc, setDoc } from 'firebase/firestore';

export default {
    props: ['documentProducts', 'handleLoadStudent'],

    setup(props, { emit }) {
        const isLoading = ref(false);
        const categoryId = ref('');
        const productId = ref("");
        const category = ref([]);
        const productDetails = ref([]);
        const studentName = ref('');
        const selectedProductDetail = ref([]);
        const openModalSave = ref(false)
        const items = ref(null)
        const title = ref(null)
        const productDetailId = ref(null)
        const qty = ref(1)
        const email = ref("")
        const imageUrl = ref("")

        const { documents: categoryDocument, fetchCollection } = useFirestoreCollection("categories");
        // const {addcDocs: createDoc} = useCollection("studentInfo")
        

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
                    selectedProductDetail.value = product.productDetail || [];
                    break;
                }
            }
            console.log('Selected Product Details:', selectedProductDetail.value);
        };


        const handleOpen = (item) => {
            openModalSave.value = !openModalSave.value
            items.value = item
            productDetailId.value = item.id
            title.value = item.title
            imageUrl.value = item.imageUrl
        }

        const handleCloseX = () => {
            openModalSave.value = false
        }


        const studentId = doc(collection(projectFirestore, "students")).id; // Generate unique ID

        const handleSubmitStudent = async () => {
            isLoading.value = true
            const { addDocs } = useNestedSubDocument('categories', categoryId.value, 'product', productId.value, 'productDetail', productDetailId.value, 'student')

            const data = {
                
                studentId: studentId,
                studentName: studentName.value,
                title: title.value,
                qty: qty.value,
                email: email.value.toLocaleLowerCase(),
                categoryId: categoryId.value,
                productId: productId.value,
                productDetailId: productDetailId.value,
                imageUrl: imageUrl.value,
                createdAt: timestamp(),
            }

            await addDocs(data)

            //for custom data
            await setDoc(doc(projectFirestore, "studentInfo", studentId), data);

            handleMessageSuccess(`បានរក្សាទុក ${studentName.value} ដោយជោគជ័យ`)
            handleCloseX();
            await props.handleLoadStudent();
            studentName.value = ''
            isLoading.value = false
            
            email.value = ""
            handleClose();
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
            showProductDetail,
            openModalSave,
            handleOpen,
            items,
            productDetailId,
            qty,
            handleSubmitStudent,
            email
        };
    }
};
</script>
