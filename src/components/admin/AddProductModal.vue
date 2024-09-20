<template>
    <div class="h-screen bg-black/50 w-full z-10 fixed top-0 left-0">
        <div class="flex justify-center items-center mt-10">
            <div class="bg-white w-[45%]" v-motion :initial="{ scale: 0.9 }" :visible="{ opacity: 1, scale: 1 }">
                <div class="p-4 space-y-3">
                    <h1 class="font-bold font-NotoSansKhmer">{{ !editData ? ' បង្កើតផលិតផល' : 'កែប្រែផលិតផល' }}</h1>
                    <!-- <h1 v-else class="font-bold font-NotoSansKhmer">{{ !enabled ? '' : 'បង្កើតមេរៀន' }}</h1> -->
                    <div>

                        <form @submit.prevent="handleSubmitProduct" class="space-y-3">
                            <div v-if="!enabled" class="space-y-2">
                                <div class="grid grid-cols-2 gap-3">
                                    <div class="space-y-1">
                                        <label for="" class="font-NotoSansKhmer font-[500]">ឈ្មោះផលិតផល: *</label>
                                        <input type="text" v-model="productName" required placeholder="ឈ្មោះផលិតផល"
                                            class="input_text">
                                    </div>
                                    <div class="space-y-1">
                                        <label for="" class="font-NotoSansKhmer font-[500]">ប្រភេទវគ្គសិក្សា: *</label>

                                        <select v-if="!editData" required @change="handleFechCourseID"
                                            class="input_text p-[9.5px]" v-model="course_id">
                                            <option value="" selected disabled>--ជ្រើសរើស--</option>
                                            <option class="capitalize" v-for="c in course" :key="c" :value="c.id">{{
                                                c.categoryName }}</option>

                                        </select>
                                        <select v-else required class="input_text p-[9.5px]" v-model="categoryName">
                                            <option value="" selected disabled>--ជ្រើសរើស--</option>
                                            <option class="capitalize hidden" v-for="c in course" :key="c"
                                                :value="c.categoryName">{{
                                                    c.categoryName }}</option>
                                            <option class="capitalize" v-for="c in course" :key="c"
                                                :value="c.categoryName">{{
                                                    c.categoryName }}</option>

                                        </select>
                                    </div>
                                </div>
                                <div class="space-y-1">

                                    <label for="" class="font-NotoSansKhmer font-[500]">លក្ខណ:ផលិតផល: *</label>


                                    <select required class="input_text p-[9.5px]" v-model="spacial_product">
                                        <option value="" disabled selected>--ជ្រើសរើស--</option>
                                        <option value="Most Popular">Most Popular</option>
                                        <option value="Trending">Trending</option>
                                        <option value="Beginner Favorites">Beginner Favorites</option>
                                    </select>

                                </div>
                                <div class="space-y-1">
                                    <label class="font-NotoSansKhmer font-[500]">ពិពណ៌នា</label>
                                    <ckeditor class="" :editor="editor" v-model="description" :config="editorConfig" />
                                </div>
                                <div class="">
                                    <label class="font-NotoSansKhmer font-[500]">រូបភាព</label>
                                    <input type="file" @change="selectProductImage" accept="image/png, image/jpeg"
                                        class="input_text">
                                </div>

                                <div v-if="prduct_image">
                                    <img :src="prduct_image" class="w-20 h-20" alt="">
                                </div>
                                <div v-else-if="selectFileImage">
                                    <img class="w-20 h-20" :src="selectFileImage" alt="">
                                </div>
                                <div v-else>
                                    <img class="w-20 h-20"
                                        src="https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
                                        alt="">
                                </div>

                            </div>



                            <div v-else class="space-y-2">
                                <div class="grid grid-cols-2 gap-3">
                                    <div class="space-y-1">
                                        <label for="" class="font-NotoSansKhmer font-[500]">ចំណងជើងមេរៀន</label>
                                        <input type="text" placeholder="ចំណងជើងមេរៀន" class="input_text">
                                    </div>

                                    <div class="space-y-1">
                                        <label for="" class="font-NotoSansKhmer font-[500]">ប្រភេទផលិតផល</label>
                                        <select name="" class="input_text p-[9.4px]" id="">
                                            <option value="">Java</option>
                                            <option value="">Javascript</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="grid grid-cols-2 gap-3">
                                    <div class="space-y-1">
                                        <label for="" class="font-NotoSansKhmer font-[500]">បង្រៀនដោយ</label>
                                        <input type="text" placeholder="បង្រៀនដោយ" class="input_text">
                                    </div>

                                    <div class="space-y-1">
                                        <label for="" class="font-NotoSansKhmer font-[500]">តម្លៃសិក្សា</label>
                                        <input type="text" placeholder="តម្លៃសិក្សា" class="input_text">
                                    </div>
                                    
                                </div>
                                <div class="space-y-1">
                                    <label class="font-NotoSansKhmer font-[500]">ពិពណ៌នា</label>

                                    <ckeditor class="" :editor="editor" :config="editorConfig" />
                                </div>
                                <div class="">
                                    <label class="font-NotoSansKhmer font-[500]">រូបភាព</label>
                                    <input type="file" accept="image/png, image/jpeg" class="input_text">
                                </div>

                            </div>


                            <div class="flex justify-end gap-2 mt-20 ">
                                <button @click="handleClose" class="button_only_close">បោះបង់</button>
                                <button v-if="!isLoading" class="button_only_submit">រក្សាទុក</button>
                                <button v-else disabled
                                    class="bg-blue-400 px-8 py-2.5  text-white flex items-center gap-1  font-NotoSansKhmer font-bold">កំពុងរក្សាទុក...</button>
                            </div>
                        </form>


                        <div :class="editData ? 'hidden' : 'block'">
                            <Switch v-model="enabled" :class="enabled ? 'border-blue-500 bg-gray-200' : 'bg-blue-300'"
                                class="relative inline-flex h-[24px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                                <span class="sr-only">Use setting</span>
                                <span aria-hidden="true" :class="enabled ? 'translate-x-9' : 'translate-x-0'"
                                    class="pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-blue-600 shadow-lg ring-0 transition duration-200 ease-in-out" />
                            </Switch>
                            <p class="font-NotoSansKhmer text-md font-[500]">{{ enabled ? 'ត្រលប់ក្រោយ' : 'បង្កើតមេរៀន'
                                }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
import { onMounted, ref, watch, } from 'vue';
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Switch } from '@headlessui/vue'
import getCollection from '@/firebase/getCollection';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { projectFirestore, timestamp } from '@/config/config';
import useDocument from '@/firebase/useDocument';
import { handleMessageError, handleMessageSuccess } from '../js/messageHandler';
import useStorage from '@/firebase/useStorage';
import { useUpdateDocument } from '@/firebase/useUpdateArrayDocument';
export default {
    props: ['handleFetch', 'editData', 'editCategory', 'documentProducts'],
    components: {
        ckeditor: CKEditor.component,
        Switch
    },
    setup(props, { emit }) {

        const isLoading = ref(false)
        const productName = ref("")
        const spacial_product = ref("")
        const prduct_image = ref("")
        const selectFileImage = ref("")
        const course_id = ref("")
        const description = ref("")
        const editor = ClassicEditor;
        const enabled = ref(false)
        const documents = ref(null)
        const categoryName = ref("")


        const { document: product } = getCollection("product")
        const { document: course } = getCollection("categories")
        const { uploadImage, removeImage } = useStorage();

        const { updateDocument } = useUpdateDocument()


        onMounted(async () => {
            if (props.editData && props.editCategory) {
                productName.value = props.editData.productName
                spacial_product.value = props.editData.spacialProduct,
                    course_id.value = props.editCategory.id,
                    categoryName.value = props.editCategory.categoryName,
                    description.value = props.editData.description
                selectFileImage.value = props.editData.proImage
            }

            getDocuments();

            await props.handleFetch();
        })


        const getDocuments = async () => {
            documents.value = await props.documentProducts;
        }
        console.log(props.documentProducts)


        //fetch course id
        const handleFechCourseID = async () => {

            if (course_id.value) {
                const q = query(collection(projectFirestore, "categories"), where("id", "==", course_id.value));
                try {
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        console.log(`Document ID: ${doc.id}`, `Document Data:`, doc.data());
                    });
                } catch (error) {
                    console.error("Error fetching  course:", error);
                }
            }
        }



        //watch for check categoryId
        watch(course_id, (course) => {
            console.log('category ID changed:', course);
            // handleFechCourseID();

        });


        const selectProductImage = (e) => {
            try {
                const file = e.target.files[0];
                prduct_image.value = URL.createObjectURL(file)
                selectFileImage.value = file
            }
            catch (err) {
                console.log(err)
            }
        }




        const handleSubmitProduct = async () => {
            try {
                isLoading.value = true;
                let imageUrl = '';

                // Initialize addDocs function
                const { addDocs } = useDocument('categories', course_id.value, 'product');



                // Check if editing existing product or creating 
                if (props.editData && props.editCategory) {
                    try {

                        if (selectFileImage.value && selectFileImage.value !== (props.editData?.proImage || "")) {
                            // Check if file size exceeds 1MB
                            if (selectFileImage.value.size > 1024 * 1024) {
                                handleMessageError("មិនអាចបញ្ចូលរូបភាពលើសពី 1MB បានទេ");
                                isLoading.value = false;
                                return;
                            }

                            const storagePath = `product/${selectFileImage.value.name}`;
                            imageUrl = await uploadImage(storagePath, selectFileImage.value);

                            // Remove old image if it exists
                            if (props.editData?.proImage) {
                                await removeImage(props.editData.proImage);
                            }

                        } else if (props.editData?.proImage) {
                            imageUrl = props.editData.proImage;
                        } else {
                            imageUrl = '';
                        }

                        // Data to be saved or updated
                        const data = {
                            productName: productName.value,
                            spacialProduct: spacial_product.value,
                            description: description.value,
                            categoryName: categoryName.value,
                            proImage: imageUrl,
                            createdAt: timestamp(),
                        };


                        await updateDocument('categories', course_id.value, data, `product/${props.editData.id}`);
                        console.log('Product updated successfully');
                        handleMessageSuccess(`ផលិតផល ${productName.value} បានកែប្រែជោគជ័យ`);
                        await props.handleFetch();
                    } catch (err) {
                        console.error('Error updating product:', err);
                    }
                } else {
                    // Add new product

                    //check if product Name already exist
                    const productQuery = query(
                        collection(projectFirestore, `categories/${course_id.value}/product`),
                        where('productName', '==', productName.value)
                    );
                    const querySnapshot = await getDocs(productQuery);

                    if (!querySnapshot.empty) {
                        handleMessageError(`ផលិតផលឈ្មោះ ${productName.value} មានរួចហើយ។`);
                        isLoading.value = false;
                        return;

                    }
                    else {
                        if (selectFileImage.value && selectFileImage.value !== (props.editData?.proImage || "")) {
                            // Check if file size exceeds 1MB
                            if (selectFileImage.value.size > 1024 * 1024) {
                                handleMessageError("មិនអាចបញ្ចូលរូបភាពលើសពី 1MB បានទេ");
                                isLoading.value = false;
                                return;
                            }

                            const storagePath = `product/${selectFileImage.value.name}`;
                            imageUrl = await uploadImage(storagePath, selectFileImage.value);

                            // Remove old image if it exists
                            if (props.editData?.proImage) {
                                await removeImage(props.editData.proImage);
                            }

                        } else if (props.editData?.proImage) {
                            imageUrl = props.editData.proImage;
                        } else {
                            imageUrl = '';
                        }

                        // Data to be saved or updated
                        const data = {
                            productName: productName.value,
                            spacialProduct: spacial_product.value,
                            description: description.value,
                            categoryName: categoryName.value,
                            proImage: imageUrl,
                            createdAt: timestamp(),
                        };
                        await addDocs(data);
                        console.log('Product added:', data);
                        handleMessageSuccess(`បានរក្សាទុកផលិតផលឈ្មោះ ${productName.value} ដោយជោគជ័យ`);
                        await props.handleFetch();
                    }
                }

                isLoading.value = false;
                handleClose();
            } catch (err) {
                console.error('Error submitting product:', err);
                handleMessageError('ការបញ្ជូនផលិតផលបានបរាជ័យ');
                isLoading.value = false;
            }
        };


        //fetch close
        const handleClose = () => {
            emit('close')
        }

        return { handleSubmitProduct, handleClose, isLoading, editor, description, productName, enabled, Switch, spacial_product, prduct_image, course_id, course, handleFechCourseID, selectProductImage, selectFileImage, product, documents, categoryName }
    }
}

</script>
