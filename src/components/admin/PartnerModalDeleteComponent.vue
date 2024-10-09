<template>
    <div class="h-screen bg-black/20 w-full z-10 fixed top-0 left-0">
        <div class="flex justify-center items-center mt-10">
            <div class="bg-white w-[30%]" v-motion :initial="{ scale: 0.9 }" :visible="{ opacity: 1, scale: 1 }">
                <div class="p-4 space-y-3">
                    <h1 class="font-bold font-NotoSansKhmer">លុបទិន្ន័យ </h1>
                    <div>
                        <h1 class="font-NotoSansKhmer text-xl">
                            តើអ្នកចង់លុបផលិតផល
                            <span class="font-NotoSansKhmer font-bold text-red-500 capitalize"> និង ប្រភេទ </span>
                            នេះមែនទេ?
                        </h1>
                    </div>
                    <div>
                        <div class="flex justify-end gap-2">
                            <button @click="handleClose" class="button_only_close">បោះបង់</button>
                            <button v-if="!isLoading" @click="handleDelete(partners.id, partners.image)"
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
import useStorage from '@/firebase/useStorage';
import { ref } from 'vue';
import { handleMessageSuccess } from '../js/messageHandler';
import useCollection from '@/firebase/useCollection';

export default {
    props: ['partners'],
    setup(props, { emit }) {
      
        const isLoading = ref(false)
        // const products = ref([])
        const {removeImage} = useStorage()
        const {deleteDocs} = useCollection('partner')

        const handleClose = () => {
            emit('close')
        }

        const handleDelete = async (id,url) => {
            try{
                isLoading.value = true
           
                if(url){
                    await removeImage(url)
                }

                handleMessageSuccess(`បានលុប ${props.partners.names} ដោយជោគជ័យ`)
                await deleteDocs(id)
                isLoading.value = false
                handleClose();
            }
            catch(err){
                console.log(err)
            }
        }

        return { handleClose, handleDelete, isLoading }
    }
}
</script>
