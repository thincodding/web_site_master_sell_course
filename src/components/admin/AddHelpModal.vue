<template>
    <div class="fixed top-0 left-0 z-10 w-full h-screen bg-black/50">
        <div class="flex items-center justify-center mt-10">
            <div class="bg-white w-[40%] " v-motion :initial="{ scale: 0.9 }" :visible="{ opacity: 1, scale: 1 }">
                <div class="p-4 space-y-3">
                    <h1 class="font-bold font-NotoSansKhmer">{{ banners ? 'កែប្រែផ្ទាំងបង្ហាញ' :
                        'បង្កើតជំនួយ' }}</h1>
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
                            <div class="space-y-1">
                                <label for="" class="font-NotoSansKhmer font-[500]">លីងវីដេអូជំនួយ: *</label>
                                <input type="text" required placeholder="លីងវីដេអូជំនួយ" v-model="linkVideo"
                                    class="input_text">
                            </div>

                            <div v-if="isValidIntroDetailLinkLession" class="mt-4">
                                <h4>វីដេអូពិពណ៌នា:</h4>

                                <video v-if="isDirectIntroDetailLinkLession" :src="linkVideo" controls
                                    class="w-full max-w-sm"></video>

                                <iframe v-else :src="youtubeEmbedIntroLinkLession" frameborder="0"
                                    allow="autoplay; encrypted-media" allowfullscreen
                                    class="w-full max-w-md aspect-video"></iframe>
                            </div>
                            <p v-else-if="linkVideo" class="mt-2 text-red-500">
                                សូមបញ្ចូលលីងវីដេអូឲបានត្រឹមត្រូវ
                            </p>



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
import useCollection from '@/firebase/useCollection';
import { timestamp } from '@/config/config';
import { handleMessageError, handleMessageSuccess } from '../js/messageHandler';
import { watchEffect } from 'vue';
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { computed } from 'vue';

export default {

    props: ['help'],
    components: {
        ckeditor: CKEditor.component
    },
    setup(props, { emit }) {
        const title = ref("")
        const descripton = ref("")
        const selectFile = ref(null)

        const isLoading = ref(false)
        const linkVideo = ref("")
        const { addcDocs, updateDocs } = useCollection("helps")


        const editor = ClassicEditor;

        watchEffect(() => {
            if (props.help) {
                title.value = props.help.title || '';
                descripton.value = props.help.descripton || '';
                linkVideo.value = props.help.linkVideo || '';
            }
        });



        // handle submit category
        const handleSubmit = async () => {
            try {
               
                isLoading.value = true;

                // Data to be saved or updated
                const data = {
                    title: title.value.toLowerCase(),
                    descripton: descripton.value,
                    linkVideo: linkVideo.value,
                    createdAt: timestamp(), 
                };

                if (props.help) {

                    // Update the category data
                    await updateDocs(props.help.id, data);
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

        
        //fetch display video
        const isValidIntroDetailLinkLession = computed(() => {
            const videoPatterns = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|.*\.(mp4|webm|ogg|m4v))(.*)?$/i;
            return videoPatterns.test(linkVideo.value);
        });

        // Check if the link is a direct video file
        const isDirectIntroDetailLinkLession = computed(() => {
            const directVideoExtensions = /\.(mp4|webm|ogg|m4v)$/i;
            return directVideoExtensions.test(linkVideo.value);
        });

        // Generate YouTube embed link for YouTube URLs
        const youtubeEmbedIntroLinkLession = computed(() => {
            if (!isValidIntroDetailLinkLession.value || isDirectIntroDetailLinkLession.value) return "";
            const youtubeRegex = /(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/;
            const match = linkVideo.value.match(youtubeRegex);
            return match ? `https://www.youtube.com/embed/${match[1]}` : "";
        });

        //handleClose
        const handleClose = async () => {
            emit("close")
        }


        return { editor, handleClose, youtubeEmbedIntroLinkLession, isValidIntroDetailLinkLession, isDirectIntroDetailLinkLession, title, descripton, handleSubmit, isLoading, selectFile, clearCategory, linkVideo }
    }

}
</script>

<style></style>