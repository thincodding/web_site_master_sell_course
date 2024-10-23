<template>
    <div class="fixed top-0 left-0 z-10 w-full h-screen bg-black/50">
        <div class="flex items-center justify-center mt-10">
            <div class="bg-white w-[40%] " v-motion :initial="{ scale: 0.9 }" :visible="{ opacity: 1, scale: 1 }">
                <div class="p-4 space-y-3">
                    <h1 class="font-bold font-NotoSansKhmer">{{ content ? 'កែប្រែមាតិការ' :
                        'បង្កើតមាតិការ' }}</h1>
                    <div>
                        <form @submit.prevent="handleSubmit" class="space-y-3">
                            <div class="space-y-1">
                                <label for="" class="font-NotoSansKhmer font-[500]">ចំណងជើង: *</label>
                                <input type="text" required placeholder="ចំណងជើង" v-model="title" class="input_text">
                            </div>
                            <div class="space-y-1">
                                <label class="font-NotoSansKhmer font-[500]">ពិពណ៌នា</label>
                                <!-- <textarea type="text" required placeholder="ពិពណ៌នា" v-model="descripton" rows="5"
                                    class="input_text"></textarea> -->
                                <ckeditor class="h-[400px] w-[40px] bg-red-400" :editor="editor" v-model="descripton"
                                    :config="editorConfig" />
                            </div>
                           

                            <div class="flex justify-end gap-2 ">
                                <button @click="handleClose" class="button_only_close">បោះបង់</button>
                                <button v-if="!isLoading" class="button_only_submit">{{ content ? 'កែប្រែ' :
                                    'រក្សាទុក' }}</button>
                                <button v-else disabled
                                    class="bg-blue-400 px-8 py-2.5  text-white flex items-center gap-1  font-NotoSansKhmer font-bold">{{
                                        content ? 'កំពុងកែប្រែ...' : 'កំពុងរក្សាទុក...' }}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import useCollection from '@/firebase/useCollection';
import { timestamp } from '@/config/config';
import { handleMessageError, handleMessageSuccess } from '../js/messageHandler';
import { watchEffect } from 'vue';
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {

    props: ['content'],
    components: {
        ckeditor: CKEditor.component
    },
    setup(props, { emit }) {
        const title = ref("")
        const descripton = ref("")
        const selectFile = ref(null)
        const part_category = ref(null)
        const isLoading = ref(false)
        const imageUrl = ref("")
        const { addcDocs, updateDocs } = useCollection("content")


        const editor = ClassicEditor;

        watchEffect(() => {
            if (props.content) {
                title.value = props.content.title || '';
                descripton.value = props.content.descripton || '';
            }
        });


        //handle select file
        const handleSelectFile = (event) => {
            try {
                const file = event.target.files[0];
                part_category.value = URL.createObjectURL(file)
                selectFile.value = file
            }
            catch (err) {
                console.log(err)
            }
        }

        // handle submit category
        const handleSubmit = async () => {
            try {
                isLoading.value = true;

                const data = {
                    title: title.value.toLowerCase(),
                    descripton: descripton.value,
                    createdAt: timestamp(), 
                };

                if (props.content) {

                    
                    // Update the category data
                    await updateDocs(props.content.id, data);
                    handleMessageSuccess(`បានកែប្រែ ${title.value} ដោយជោគជ័យ`);
                } else {
                    // Creating a new category
                    await addcDocs(data);
                    // await props.dataSaved();
                    handleMessageSuccess(`បានរក្សាទុក ${title.value} ដោយជោគជ័យ`);
                }

                clearCategory();
                handleClose();

            } catch (err) {
                console.error('Error:', err);
                handleMessageError('មានបញ្ហាក្នុងការទិន្នន័យ');
            } finally {
                isLoading.value = false;
            }
        };


        function clearCategory() {
            title.value = ''
            descripton.value = ''
        }

        //handleClose
        const handleClose = async () => {

            emit("close")
        }


        return { editor, handleClose, handleSelectFile, part_category, title, descripton, handleSubmit, isLoading, selectFile, clearCategory, imageUrl }
    }

}
</script>

<style></style>