<template>
    <div class="h-screen bg-black/50 w-full z-10 fixed top-0 left-0">
        <div class="flex justify-center items-center mt-5">
            <div class="bg-white w-[45%] overflow-y-auto h-[900px]" v-motion :initial="{ scale: 0.9 }"
                :visible="{ opacity: 1, scale: 1 }">
                <div class="p-4 space-y-3">
                    <!-- <h1 class="font-bold font-NotoSansKhmer">{{ !editData ? ' បង្កើតផលិតផល' : 'កែប្រែផលិតផល' }}</h1> -->
                    <!-- <h1 v-else class="font-bold font-NotoSansKhmer">{{ !enabled ? '' : 'បង្កើតមេរៀន' }}</h1> -->
                    <h1 class="font-bold font-NotoSansKhmer">បង្កើតមេរៀនថ្មី</h1>

                    <div>

                        <form @submit.prevent="handleSubmitLession" class="space-y-3">

                            <div class="space-y-2">
                                <div class="grid grid-cols-2 gap-3">
                                    <div class="space-y-1">
                                        <label for="" class="font-NotoSansKhmer font-[500]">ចំណងជើងមេរៀន: *</label>
                                        <input type="text" v-model="title" required placeholder="ចំណងជើងមេរៀន"
                                            class="input_text">
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
                                <div class="grid grid-cols-2 gap-3">
                                    <div class="space-y-1">
                                        <label for="" class="font-NotoSansKhmer font-[500]">បង្ហាញលក្ខណ: *</label>
                                        <select v-model="show_spacial" class="input_text p-[9.4px]" id="">
                                            <option selected disabled value="">--ជ្រើសរើស--</option>
                                            <option value="Most Popular">Most Popular</option>
                                            <option value="New">New</option>
                                            <option value="Beginer Favorites">Beginer Favorites</option>
                                        </select>

                                    </div>
                                    <div class="space-y-1">
                                        <label for="" class="font-NotoSansKhmer font-[500]">បង្រៀនដោយ: *</label>
                                        <input type="text" v-model="lectures" required placeholder="បង្រៀនដោយ"
                                            class="input_text">

                                       
                                    </div>
                                    <div class="space-y-1">
                                        <label for="" class="font-NotoSansKhmer font-[500]">លីងវីដេអូ: *</label>
                                        <input type="text" v-html="urlCopyLink" v-model="urlCopyLink" placeholder="បញ្ចូលលីងវីដេអូ"
                                            class="input_text">

                                        <!-- for display url video from Input text -->
                                        <div v-if="urlEmbedCodes" v-html="urlEmbedCodes"></div>
                                    </div>

                                    <div class="space-y-1">
                                        <label for="" class="font-NotoSansKhmer font-[500]">តម្លៃសិក្សា</label>
                                        <input type="number" min="0" v-model="price" placeholder="តម្លៃសិក្សា"
                                            class="input_text">
                                        <div class="space-y-1">
                                            <label for="" class="font-NotoSansKhmer font-[500]">បញ្ចុះតម្លៃ</label>
                                            <input type="number" v-model="discount" min="0" placeholder="បញ្ចុះតម្លៃ"
                                                class="input_text">
                                        </div>
                                    </div>
                                </div>


                                <div class="space-y-1">
                                    <label class="font-NotoSansKhmer font-[500]">អំពីវគ្គសិក្សា</label>
                                    <ckeditor class="" :editor="editor" v-model="aboutCourse" :config="editorConfig" />
                                </div>
                                <div class="space-y-1">
                                    <label class="font-NotoSansKhmer font-[500]">ពិពណ៌នាផ្សេងៗ</label>
                                    <ckeditor class="" :editor="editor" v-model="desctiption" :config="editorConfig" />
                                </div>


                                <!-- for display url video from ckeditor -->
                                <div v-if="videoEmbedCodes" v-html="videoEmbedCodes"></div>

                                <div class="">
                                    <label class="font-NotoSansKhmer font-[500]">រូបភាព</label>
                                    <input type="file" @change="handleChangeFile" accept="image/png, image/jpeg"
                                        class="input_text">
                                </div>
                                <div v-if="pre_Image">
                                    <img :src="pre_Image" class="w-20 h-20" alt="">
                                </div>

                                <div v-else-if="selectFile">
                                    <img :src="selectFile" class="w-20 h-20 object-contain" alt="">
                                </div>
                                <div v-else>
                                    <img class="w-20 h-20"
                                        src="https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
                                        alt="">
                                </div>

                            </div>

                            <div class="flex justify-end gap-2 mt-20 ">
                                <button @click="handleClose" class="button_only_close">បោះបង់</button>
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
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { onMounted, ref, watch } from 'vue';
import { handleMessageError, handleMessageSuccess } from '../js/messageHandler';
import useStorage from '@/firebase/useStorage';
import useNestedDocument from '@/firebase/useNestedSubcollection';
import getDocument from '@/firebase/getDocument';
import { timestamp } from '@/config/config';

export default {
    props: ['documentProducts', 'handleLoadProductDetail', 'categories', 'productDetail', 'product', 'handleFetch'],
    components: {
        ckeditor: CKEditor.component,
    },
    setup(props, { emit }) {
        const currentComponent = ref("")
        const isLoading = ref(false)
        const title = ref("")
        const categoryId = ref('')
        const productId = ref("")
        const lectures = ref("")
        const price = ref(0)
        const discount = ref(0)
        const show_spacial = ref("")
        const desctiption = ref("")
        const selectFile = ref("")
        const pre_Image = ref("")
        const category = ref([])
        const urlCopyLink = ref("")
        const urlEmbedCodes = ref("")
        const videoEmbedCodes = ref("")
        const aboutCourse = ref("")

        const editor = ClassicEditor
        const { uploadImage, removeImage } = useStorage()
        onMounted(() => {
            if (props.categories && props.product && props.productDetail) {
                title.value = props.productDetail.title
                categoryId.value = props.categories.id
                productId.value = props.product.id
                lectures.value = props.productDetail.lectures
                price.value = props.productDetail.price
                discount.value = props.productDetail.discount
                aboutCourse.value = props.productDetail.aboutCourse
                show_spacial.value = props.productDetail.show_spacial
                desctiption.value = props.productDetail.desctiption,
                urlCopyLink.value = props.productDetail.urlLinkCopy,
                videoEmbedCodes.value = convertToEmbedCode(props.productDetail.desctiption)
                urlEmbedCodes.value = convertToEmbedCodeText(props.productDetail.urlLinkCopy)

                selectFile.value = props.productDetail.imageUrl
            }
        })


        //fetch url Link when update ckeditor
        const convertToEmbedCode = (url) => {
            const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
            if (videoIdMatch) {
                const videoId = videoIdMatch[1] || videoIdMatch[0].split('/').pop(); // In case of a short link
                return `<figure class="media"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe></figure>`;
            }
            return '';
        };

        //fetch url Link when update ckeditor
        const convertToEmbedCodeText = (url) => {
            const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
            if (videoIdMatch) {
                const videoId = videoIdMatch[1] || videoIdMatch[0].split('/').pop();
                return `<figure class="media"><iframe width="100%" height="300px" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe></figure>`;
            }
            return '';
        }
        
        const handleClose = () => {
            emit("close")
        }

        watch(categoryId, (cat) => {
            console.log(cat)
            filterSearchCategory()

        })

        watch(productId, (pro) => {
            console.log(pro)
        })

        const handleChangeFile = (e) => {
            try {
                const file = e.target.files[0]
                pre_Image.value = URL.createObjectURL(file)
                selectFile.value = file
            }
            catch (err) {
                console.log(err)
            }
        }

        //filter display
        const filterSearchCategory = () => {
            const { documents } = getDocument('categories', categoryId.value, 'product')
            watch(documents, () => {
                if (documents.value.length > 0) {
                    category.value = documents.value
                    console.log('category: ', category.value)
                }
                else {
                    category.value = []
                }
            })
        }


        const handleSubmitLession = async () => {

            //upload video url ckeditor
            const videoUrlMatch = desctiption.value.match(/https?:\/\/(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=|.+\/)([a-zA-Z0-9_-]{11})|https?:\/\/youtu\.be\/([a-zA-Z0-9_-]{11})/);
            let videoEmbedCode = '';
            if (videoUrlMatch) {
                const videoId = videoUrlMatch[1] || videoUrlMatch[2];
                videoEmbedCode = `<figure class="media"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe></figure>`;
            }

            //copy link in Text
            const copyLinkVideo = urlCopyLink.value.match(/https?:\/\/(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=|.+\/)([a-zA-Z0-9_-]{11})|https?:\/\/youtu\.be\/([a-zA-Z0-9_-]{11})/);
            let urlLinkEmbedCode = ''

            if (copyLinkVideo) {
                const videoId = copyLinkVideo[1] || copyLinkVideo[2]
                urlLinkEmbedCode = `<figure class="media"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe></figure>`;
            }



            try {
                isLoading.value = true
                const { addDocs } = useNestedDocument('categories', categoryId.value, 'product', productId.value, 'productDetail');
                let imageUrl = ''

                // Check if file size exceeds 1MB
                if (selectFile.value && selectFile.value !== (props.productDetail?.imageUrl || "")) {
                    // Check if file size exceeds 1MB
                    if (selectFile.value.size > 1024 * 1024) {
                        handleMessageError("មិនអាចបញ្ចូលរូបភាពលើសពី 1MB បានទេ");
                        isLoading.value = false;
                        return;
                    }

                    const storagePath = `productDetail/${selectFile.value.name}`;
                    imageUrl = await uploadImage(storagePath, selectFile.value);

                    // Remove old image if it exists
                    if (props.productDetail?.imageUrl) {
                        await removeImage(props.productDetail.imageUrl);
                    }

                } else if (props.productDetail?.imageUrl) {
                    imageUrl = props.productDetail.imageUrl;
                } else {
                    imageUrl = '';
                }


                const data = {
                    title: title.value,
                    lectures: lectures.value,
                    price: price.value,
                    discount: discount.value,
                    show_spacial: show_spacial.value,
                    desctiption: videoEmbedCode || desctiption.value,
                    urlLinkCopy: urlLinkEmbedCode,
                    imageUrl: imageUrl,
                    aboutCourse: aboutCourse.value,
                    createdAt: timestamp()
                }

                if (props.productDetail) {
                    try {
                        // Import updateDocs from useNestedDocument hook
                        const { updateDocs } = useNestedDocument('categories', props.categories.id, 'product', props.product.id, 'productDetail');
                        videoEmbedCodes.value = videoEmbedCode; // Use the embed code created earlier

                        // Call the updateDocs function with the productDetailId and the updated data
                        await updateDocs(props.productDetail.id, data);

                        handleMessageSuccess(`បានកែប្រែមេរៀន ${props.productDetail.title} ដោយជោគជ័យ`);
                        handleClose();
                        await props.handleLoadProductDetail();
                    } catch (err) {
                        console.log("Error updating product detail:", err);
                    }
                }

                else {
                    const test = await addDocs(data)
                    videoEmbedCodes.value = videoEmbedCode; // Use the embed code created earlier
                    isLoading.value = false
                    handleMessageSuccess(`បានរក្សាទុក ${title.value} ដោយជោគជ័យ`);
                    handleClose();
                    await props.handleLoadProductDetail();
                    console.log(test)

                }


            }
            catch (err) {
                console.log(err)
            }
        }


        return { editor,show_spacial, urlCopyLink, urlEmbedCodes, currentComponent, videoEmbedCodes, discount, handleClose, isLoading, title, categoryId, productId, lectures, price, desctiption, selectFile, pre_Image, handleChangeFile, handleSubmitLession, filterSearchCategory, category,aboutCourse }
    }

}

</script>