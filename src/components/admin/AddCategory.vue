<template>
    <div class="h-screen ">
        <div class="flex justify-center items-center mt-10">
            <div class="bg-white w-[60%] shadow-sm animate-fade-up animate-duration-[1000ms]">
                <div class="p-4 space-y-3">
                    <h1 class="font-bold font-NotoSansKhmer">បង្កើតប្រភេទវគ្គសិក្សា</h1>
                    <div>
                        <form @submit.prevent="handleSubmit" class="space-y-3">
                            <div class="space-y-1">
                                <label for="" class="font-NotoSansKhmer font-[500]">ឈ្មោះប្រភេទ: *</label>
                                <input type="text" required placeholder="ឈ្មោះប្រភេទ" v-model="categoryName"
                                    class="input_text">
                            </div>
                            <div class="space-y-1">
                                <!-- <label class="font-NotoSansKhmer font-[500]">ពិពណ៌នា</label>
                                <textarea type="text" required placeholder="ពិពណ៌នា" v-model="descripton" rows="5"
                                    class="input_text"></textarea> -->
                                <label class="font-NotoSansKhmer font-[500]">ពិពណ៌នា</label>
                                <ckeditor class="" :editor="editor" v-model="descripton"
                                    :config="editorConfig" />

                            </div>
                            <div class="">
                                <label class="font-NotoSansKhmer font-[500]">រូបភាព</label>
                                <input type="file" accept="image/png, image/jpeg" class="input_text"
                                    @change="handleSelectFile" ref="fileInput">
                            </div>
                            <!-- Display img_category if available -->
                            <div v-if="img_category">
                                <img :src="img_category" class="w-40 h-40 object-contain" alt="Category Image">
                            </div>
                            <div v-else-if="selectFile">
                                <img :src="selectFile" class="w-24 h-24 object-contain">
                            </div>


                            <!-- Display selectFile if available, otherwise show "No Image" -->
                            <!-- <div v-if="selectFile">
                                <img :src="selectFile" class="w-24 h-24 object-contain">
                            </div>
                            <div v-else>
                                <p>No Image</p>
                            </div> -->

                            <div class="flex justify-end gap-2 ">
                                <router-link :to="{ name: 'categoryList' }"
                                    class="button_only_close">ត្រលប់ក្រោយ</router-link>
                                <button v-if="!isLoading" class="button_only_submit">រក្សាទុក</button>
                                <button v-else disabled
                                    class="bg-blue-400 px-8 py-2.5  text-white flex items-center gap-1  font-NotoSansKhmer font-bold">កំពុងរក្សាទុក...</button>

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
import useStorage from '@/firebase/useStorage';
import useCollection from '@/firebase/useCollection';
import { timestamp } from '@/config/config';
import { handleMessageError, handleMessageSuccess } from '../js/messageHandler';
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {

    components: {
        ckeditor: CKEditor.component
    },
    setup() {
        const categoryName = ref("")
        const descripton = ref("")
        const selectFile = ref(null)
        const img_category = ref(null)
        const isLoading = ref(false)
        const { uploadImage } = useStorage()
        const { addcDocs } = useCollection("categories")

        const editor = ClassicEditor;
        const editorConfig = {
            height: '300px',
            width: '200px',
        
        };
        //handle select file
        const handleSelectFile = (event) => {
            try {
                const file = event.target.files[0];
                img_category.value = URL.createObjectURL(file)
                selectFile.value = file
            }
            catch (err) {
                console.log(err)
            }
        }


        // handle submit category
        const handleSubmit = async () => {
            try {
                let imageUrl = '';
                isLoading.value = true;

                if (selectFile.value && selectFile.value) {

                    if (selectFile.value.size > 1024 * 1024) {
                        handleMessageError("មិនអាចបញ្ចូលរូបភាពលើសពី 1MB បានទេ");
                        isLoading.value = false;
                        return;
                    }
                    const storagePath = `category/${selectFile.value.name}`;
                    imageUrl = await uploadImage(storagePath, selectFile.value);

                } else {

                    imageUrl = "using_default_Image";
                }

                const data = {
                    categoryName: categoryName.value.toLowerCase(),
                    descripton: descripton.value,
                    image: imageUrl,
                    createdAt: timestamp(),
                };

                await addcDocs(data);

                handleMessageSuccess(`បានរក្សាទុក ${categoryName.value} ដោយជោគជ័យ`);
                clearCategory();
                resetImage();
                isLoading.value = false;

            } catch (err) {
                console.error('Error:', err);
                isLoading.value = false;
            }
        };

        function clearCategory() {
            categoryName.value = ''
            descripton.value = ''
            img_category.value = null
        }


        const resetImage = () => {
            selectFile.value = null;           // Clear the selected file
            img_category.value = null;         // Remove the image preview

            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput) {
                fileInput.value = '';          // Reset the file input field
            }
        };



        return { editor,editorConfig, handleSelectFile, img_category, categoryName, descripton, handleSubmit, isLoading, selectFile, clearCategory, resetImage }
    }

}
</script>

<style scoped>


</style>