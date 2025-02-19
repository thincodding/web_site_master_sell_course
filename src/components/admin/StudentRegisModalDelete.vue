<template>
    <div class="fixed top-0 left-0 z-10 w-full h-screen bg-black/20">
        <div class="flex items-center justify-center mt-10">
            <div class="bg-white w-[30%]" v-motion :initial="{ scale: 0.9 }" :visible="{ opacity: 1, scale: 1 }">
                <div class="p-4 space-y-3">
                    <h1 class="font-bold font-NotoSansKhmer">លុបទិន្ន័យ </h1>
                    <div>
                        <h1 class="text-xl capitalize font-NotoSansKhmer">
                            តើអ្នកចង់លុបសិស្សឈ្មោះ
                            <span class="font-bold text-red-500 capitalize font-NotoSansKhmer">
                                {{ student.studentName }}
                            </span>
                            នេះមែនទេ?
                        </h1>
                    </div>
                    <div>
                        <div class="flex justify-end gap-2">
                            <button @click="handleClose" class="button_only_close">បោះបង់</button>
                            <button v-if="!isLoading"
                                @click="handleDelete(categoryId.id, productId.id, detail.id, student.id, student.studentId)"
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
import useNestedSubDocument from '@/firebase/useNestedSubcollectionDocument';
import { handleMessageSuccess } from '../js/messageHandler';
import { ref } from 'vue';
import useCollection from '@/firebase/useCollection';
export default {
    props: ['student', 'categoryId', 'productId', 'detail', 'handleLoadStudent'],
    setup(props, { emit }) {

        const isLoading = ref(false)
        const { deleteDocs: deleteStudent } = useCollection("studentInfo")
      

        const handleClose = () => {
            emit('close')
        }

        const handleDelete = async (categoryId, productId, detailId, studentId, stuId) => {
             const { deleteDocs } = await useNestedSubDocument('categories', categoryId, 'product', productId, 'productDetail', detailId, 'student')

            isLoading.value = true
            try {
           
                await deleteDocs(studentId)
                await deleteStudent(stuId)
               

                await handleMessageSuccess(`បានលុបសិស្សឈ្មោះ ${props.student.studentName} ដោយជោគជ័យ`)

                await props.handleLoadStudent();
                handleClose();
                isLoading.value = false

            }
            catch (err) {
                console.log(err)
            }
        }


        return { handleClose, handleDelete, isLoading }

    }
}
</script>
