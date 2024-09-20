<template>
    <div class="h-screen bg-black/20 w-full z-10 fixed top-0 left-0">
        <div class="flex justify-center items-center mt-10">
            <div class="bg-white w-[30%]" v-motion :initial="{ scale: 0.9 }" :visible="{ opacity: 1, scale: 1 }">
                <div class="p-4 space-y-3">
                    <h1 class="font-bold font-NotoSansKhmer">លុបទិន្ន័យ</h1>
                    <div>
                        <h1 class="font-NotoSansKhmer text-xl">
                            តើអ្នកចង់លុបប្រភេទ
                            <span class="font-NotoSansKhmer font-bold text-red-500">{{ cate.categoryName }}</span>
                            នេះមែនទេ?
                        </h1>
                    </div>
                    <div>
                        <div class="flex justify-end gap-2">
                            <button @click="handleClose" class="button_only_close">បោះបង់</button>
                            <button v-if="!isLoading" @click="handleDelete(cate.id, cate.image)"
                                class="button_only_submit">
                                លុបទិន្ន័យ
                            </button>
                            <button v-else disabled
                                class="bg-blue-400 px-8 py-2.5 text-white flex items-center gap-1 font-NotoSansKhmer font-bold">
                                កំពុងលុបទិន្ន័យ...
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import useCollection from '@/firebase/useCollection';
import useStorage from '@/firebase/useStorage';
import getCollection from '@/firebase/getCollection';
// import { handleMessageSuccess } from '../js/messageHandler';
import useDocument from '@/firebase/useDocument';
import { projectFirestore } from '@/config/config';
import { collection, getDocs } from 'firebase/firestore';
import { ref } from 'vue';
import { handleMessageError, handleMessageSuccess } from '../js/messageHandler';

export default {
    props: ['cate', 'handleQueryCategory', 'handleBackPaginate'], // Accept handleQueryCategory as a prop
    setup(props, { emit }) {
        // const { deleteDocs } = useCollection("categories");
        const isLoading = ref(false)
        const { deleteDocs } = useDocument()
        const { removeImage } = useStorage();
        const { document } = getCollection("categories")


        // Handle close modal
        const handleClose = () => {
            emit("close");
        };

        // Handle delete only category  collection
        // const handleDelete = async (id, url) => {
        //     try {
        //         // Remove the associated image if it exists
        //         if (url) {
        //             await removeImage(url);
        //         }

        //         await deleteDocs(id);

        //         // Show success message
        //         handleMessageSuccess(`បានលុបប្រភេទ ${props.cate.categoryName} ដោយជោគជ័យ`);

        //         // await props.handleQueryCategory();
        //         await props.handleBackPaginate();

        //         // Close the modal
        //         handleClose();
        //     } catch (err) {
        //         console.log(err);
        //     }
        // };


        //delete Category with associated
        const handleDelete = async (categoryId, url) => {
            try {

                isLoading.value = true
                // Get the 'cateogory' subcollection for the cateogory
                const docRef = collection(projectFirestore, 'categories', categoryId, 'product');
                const categorySnapshot = await getDocs(docRef);

                // Check if the category has any associated cateogory
                if (!categorySnapshot.empty) {
                    
                    // handleMessageError(`មិនអាចលុបប្រភេទ ${props.cate.categoryName} បានទេ។ ដោយសារមានទំនាក់ទំនងរួចហើយ`)
                    handleMessageError(`ប្រភេទ ${props.cate.categoryName} មានផលិតផលដែលទាក់ទង។ មិនអាចលុបបានទេ!`);

                    isLoading.value = false
                    return;
                }

                await deleteDocs('categories', categoryId);
                await removeImage(url)
           
                document.value = document.value.filter(category => category.id !== categoryId);
                
                handleMessageSuccess(`បានលុបប្រភេទ ${props.cate.categoryName} ដោយជោគជ័យ`)
                isLoading.value = false
                handleClose();

            } catch (error) {
                console.error("Error deleting category:", error);
                isLoading.value = false
            }
        };


        return {
            handleClose,
            handleDelete,
            isLoading,
        };
    },
};
</script>
