<template>
    <div class="fixed top-0 left-0 z-10 w-full h-screen bg-black/20">
        <div class="flex items-center justify-center mt-10">
            <div class="bg-white w-[30%]" v-motion :initial="{ scale: 0.9 }" :visible="{ opacity: 1, scale: 1 }">
                <div class="p-4 space-y-3">
                    <h1 class="font-bold font-NotoSansKhmer">លុបទិន្ន័យ </h1>
                    <div>
                        <h1 class="text-xl font-NotoSansKhmer">
                            តើអ្នកចង់លុបផលិតផល
                            <span class="font-bold text-red-500 capitalize font-NotoSansKhmer">{{ product.productName }}
                                និង ប្រភេទ {{ products.categoryName
                                }}</span>
                            នេះមែនទេ?
                        </h1>
                    </div>
                    <div>
                        <div class="flex justify-end gap-2">
                            <button @click="handleClose" class="button_only_close">បោះបង់</button>
                            <button v-if="!isLoading" @click="handleDelete(products.id, product.id, product.proImage)"
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
import { useDeleteDocument } from '@/firebase/useDeleteArrayDocument'
import useStorage from '@/firebase/useStorage';
import { ref } from 'vue';
import { handleMessageError, handleMessageSuccess } from '../js/messageHandler';

import useForValidateProduct from '@/firebase/useValidateExistProduct';

export default {
    props: ['product', 'products', 'handleFetch'],
    setup(props, { emit }) {

        const isLoading = ref(false)
        // const products = ref([])
        const { deleteDocument } = useDeleteDocument()
        const { removeImage } = useStorage()

        const handleClose = () => {
            emit('close')
        }



        const handleDelete = async (categoryId, productId, url) => {
            try {
                isLoading.value = true;
                
                const hasProductExist = await useForValidateProduct(categoryId, productId);

                if (hasProductExist) {
                    handleMessageError(`ផលិតផល ${props.product.productName} មានព័ត៌មានដែលទាក់ទង។ មិនអាចលុបបានទេ!`);
                    isLoading.value = false
                    return;
                }


                await deleteDocument('categories', categoryId, `product/${productId}`);


                await props.handleFetch();
                await removeImage(url)
                handleMessageSuccess(`បានលុបដោយជោគជ័យផលិតផល ${props.product.productName} ដោយជោគជ័យ!`)
                isLoading.value = false;
                handleClose();
            } catch (err) {
                console.log(err);
                isLoading.value = false;
            }
        };

        return { handleClose, handleDelete, isLoading }
    }
}
</script>
