<template>
    <div class="fixed top-0 left-0 z-10 w-full h-screen bg-black/50">
        <div class="flex items-center justify-center mt-10">
            <div class="bg-white w-[40%] " v-motion :initial="{ scale: 0.9 }" :visible="{ opacity: 1, scale: 1 }">
                <div class="p-4 space-y-3">
                    <h1 class="font-bold font-NotoSansKhmer">{{ banners ? 'កែប្រែផ្ទាំងបង្ហាញ' :
                        'បង្កើតផ្ទាំងបង្ហាញreerererere' }}</h1>
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
                            <div>
                                <label class="font-NotoSansKhmer font-[500]">រូបភាព</label>
                                <input type="file" accept="image/png, image/jpeg" class="input_text"
                                    @change="handleSelectFile">

                                <!-- Display img_category if available -->
                                <div v-if="part_category">
                                    <img :src="part_category" class="object-contain h-40 mt-2" alt="Category Image">
                                </div>
                                <div v-else-if="selectFile">
                                    <img :src="selectFile" class="object-contain w-24 h-24" alt="Selected File Image">
                                </div>
                                <div v-else class="mt-2">
                                    <img src="https://fakeimg.pl/1200x560/" alt="Fallback Image" class="object-contain">
                                </div>
                            </div>

                            <!-- Display selectFile if available, otherwise show "No Image" -->
                            <!-- <div v-if="selectFile">
                                <img :src="selectFile" class="object-contain w-24 h-24">
                            </div>
                            <div v-else>
                                <p>No Image</p>
                            </div> -->


                            <div class="flex justify-end gap-2 ">
                                <button @click="handleClose" class="button_only_close">បោះបង់</button>
                                <button v-if="!isLoading" class="button_only_submit">{{ banners ? 'កែប្រែ' :
                                    'រក្សាទុក' }}</button>
                                <button v-else disabled
                                    class="bg-blue-400 px-8 py-2.5  text-white flex items-center gap-1  font-NotoSansKhmer font-bold">{{
                                        banners ? 'កំពុងកែប្រែ...' : 'កំពុងរក្សាទុក...' }}</button>
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
import { watchEffect } from 'vue';
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {

    props: ['banners'],
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
        const { uploadImage, removeImage } = useStorage()
        const { addcDocs, updateDocs } = useCollection("banners")


        const editor = ClassicEditor;

        watchEffect(() => {
            if (props.banners) {
                title.value = props.banners.title || '';
                descripton.value = props.banners.descripton || '';
                selectFile.value = props.banners.image || 'using_default_Image';
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
                let imageUrl = '';
                isLoading.value = true;

                // Check if a new file is selected and it's different from the current image
                if (selectFile.value && selectFile.value !== (props.banners?.image || "")) {

                    // Check if file size exceeds 1MB
                    if (selectFile.value.size > 1024 * 1024) {
                        handleMessageError("មិនអាចបញ្ចូលរូបភាពលើសពី 1MB បានទេ");
                        isLoading.value = false;
                        return;
                    }

                    const storagePath = `banner/${selectFile.value.name}`;
                    imageUrl = await uploadImage(storagePath, selectFile.value);

                    // If an old image exists, remove it
                    if (props.banners?.image) {
                        await removeImage(props.banners.image);
                    }

                } else if (props.banners?.image) {
                    // Keep the existing image if no new image is selected
                    imageUrl = props.banners.image;
                } else {
                    imageUrl = '';
                }

                // Data to be saved or updated
                const data = {
                    title: title.value.toLowerCase(),
                    descripton: descripton.value,
                    image: imageUrl,
                    createdAt: timestamp(), // Using updatedAt instead of createdAt for updates
                };

                if (props.banners) {

                    
                    // Update the category data
                    await updateDocs(props.banners.id, data);
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