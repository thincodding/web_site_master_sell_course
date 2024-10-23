<template>
    <div class="fixed top-0 left-0 z-10 w-full h-screen bg-black/20">
        <div class="flex items-center justify-center mt-10">
            <div class="bg-white w-[30%]" v-motion :initial="{ scale: 0.9 }" :visible="{ opacity: 1, scale: 1 }">
                <div class="p-4 space-y-3">
                    <h1 class="font-bold font-NotoSansKhmer">លុបទិន្ន័យ </h1>
                    <div>
                        <h1 class="text-xl capitalize font-NotoSansKhmer">
                            តើអ្នកចង់លុបចំណងជើង
                            <span class="font-bold text-red-500 capitalize font-NotoSansKhmer">
                                {{ productDetail.title }}
                                និង ថ្នាក់សិក្សា {{ product.productName }}
                            </span>
                            នេះមែនទេ?
                        </h1>
                    </div>
                    <div>
                        <div class="flex justify-end gap-2">
                            <button @click="handleClose" class="button_only_close">បោះបង់</button>
                            <button v-if="!isLoading"
                                @click="handleDelete(category.id, product.id, productDetail.id, productDetail.imageUrl)"
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

import { ref } from 'vue';
import useNestedDocument from '@/firebase/useNestedSubcollection';
import { handleMessageError, handleMessageSuccess } from '../js/messageHandler';
import useStorage from '@/firebase/useStorage';

import checkValidateExistStudents from '@/firebase/useValidateStudent';


export default {
    props: ['category', 'product', 'productDetail', 'products', 'handleFetch', 'handleLoadProductDetail'],
    setup(props, { emit }) {

        const isLoading = ref(false)
        // const products = ref([])
        const { removeImage } = useStorage()


        const handleClose = () => {
            emit('close')
        }


        const handleDelete = async (categoryId, productId, productDetailId, imageUrl) => {

            try {
                isLoading.value = true
                const { deleteDocs } = useNestedDocument('categories', categoryId, 'product', productId, 'productDetail');
                const hasEnrolledStudents = await checkValidateExistStudents(categoryId, productId, productDetailId);

                if (hasEnrolledStudents) {
                    handleMessageError(`មេរៀន ${props.productDetail.title} មានសិស្សចុះឈ្មោះរៀនរួចហើយ។ មិនអាចលុបបានទេ!`);
                    isLoading.value = false
                    return;
                }


                await deleteDocs(productDetailId);
                // Success message
                handleMessageSuccess(`បានលុបមេរៀន ${props.productDetail.title} ដោយជោគជ័យ`);
                await removeImage(imageUrl)
                // Close the modal or perform any cleanup actions
                isLoading.value = false
                handleClose();
                await props.handleLoadProductDetail();
            } catch (err) {
                console.log('Error deleting product detail:', err);
            }
        };

        return { handleClose, isLoading, handleDelete }
    }
}
</script>
