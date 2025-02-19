<template>
    <div class="xl:w-[1200px] mx-auto my-5 px-10 lg:px-10 xl:px-0">
        <div class="my-4">
            <div v-for="con in content" :key="con.id">
                <!-- <h1 class="text-[18px] lg:text-[20px] md:text-[20px] font-bold font-KhmerMoul text-background">
                    {{ con.data.title }}</h1>
                <p v-html="con.data.descripton" class="my-3 text-md text-background font-NotoSansKhmer ">

                </p> -->

                <h1 v-if="bestSellerProducts.length > 0"
                    class="text-[18px] flex items-center gap-2 lg:text-[20px] md:text-[20px] font-bold font-NotoSansKhmer text-background">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-arrow-right-to-line">
                        <path d="M17 12H3" />
                        <path d="m11 18 6-6-6-6" />
                        <path d="M21 5v14" />
                    </svg>
                    <span>{{ $t('bestSellerCourse') }}</span>
                </h1>

            </div>
        </div>

        <div v-if="isLoading">
            <div class="flex gap-2 text-center">
                <div
                    class="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
                    <svg class="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                        <path
                            d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                            stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
                        </path>
                        <path
                            d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                            stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"
                            class="text-gray-900">
                        </path>
                    </svg>
                    <p class="font-bold">{{ $t('loading') }}</p>
                </div>
            </div>
        </div>
        <div v-else class="relative">
            <swiper ref="mySwiper" :navigation="{
                nextEl: '.button-next-slides',
                prevEl: '.button-pre-slides'
            }" :spaceBetween="10" :slidesPerView="'auto'" :breakpoints="{
                '540': { slidesPerView: 2, spaceBetween: 20 },
                '768': { slidesPerView: 3, spaceBetween: 15 },
                '1024': { slidesPerView: 4, spaceBetween: 15 }
            }" :loop="false" :modules="modules" :allowTouchMove="true" :speed="1000"
                class="mySwiper relative xl:w-[1200px]">
                <swiper-slide v-for="detail in bestSellerProducts" :key="detail.id">
                    <div class="border-[1px] h-full lg:h-full  rounded-lg">
                        <div class="">
                            <img :src="detail.imageUrl" alt=""
                                class="object-cover object-center rounded-lg lg:w-full" />
                        </div>
                        <div class="p-4 mt-2 space-y-1">
                            <router-link
                                :to="user ? { name: 'courseDetail', params: { id: detail.id } } : { name: 'login' }"
                                class="text-[14px] font-semibold line-clamp-2 cursor-pointer">
                                {{ detail.title }}
                            </router-link>

                            <div class="space-y-1.5">
                                <p class="text-gray-500 text-[12px] line-clamp-1">{{ $t('lectures') }} {{
                                    detail.lectures }}</p>

                                <div>
                                    <!-- Check if there is any student with a matching productDetailId -->
                                    <div v-if="uniqueStudents.some(student => student.productDetailId === detail.id)">
                                        <div>
                                            <!-- {{uniqueStudents.find(student =>
                                                                                student.productDetailId === detail.id).title
                                                                            }} -->
                                        </div>
                                    </div>
                                    <div v-else>
                                        <p v-if="detail.price === 0" class="text-lg font-bold text-green-600">
                                            {{ $t('freeCourse') }}
                                        </p>
                                        <p v-else class="text-lg font-bold">
                                            ${{ detail.price }}
                                        </p>
                                    </div>

                                </div>


                                <div class="text-xs w-20 text-center font-bold text-[#3D3C0A] bg-yellow-300/60 p-1">
                                    {{ $t('bestSeller') }}</div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>

            <div class="button-pre-slides cursor-pointer rounded-full text-white absolute top-[45%] -left-5 z-[2]">
                <div class="flex justify-center w-10 h-10 border-gray-500 border-[1px] items-center bg-background rounded-full hover:bg-background/90"
                    @click="prevSlide">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </div>
            </div>

            <div
                class="button-next-slides cursor-pointer rounded-full text-white absolute top-[45%] -right-5  xl:-right-5 z-[2]">
                <div class="flex justify-center w-10 h-10 border-gray-500 border-[1px] items-center bg-background rounded-full hover:bg-background/90"
                    @click="nextSlide">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="font-bold size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>
        </div>
    </div>

    <!-- <pre>{{ bestSellerProducts }}</pre> -->

</template>

<script>
import { useFirestoreCollection, useSubcollection } from '@/firebase/getArrayDocument';
import { query, collection, where, getDocs } from 'firebase/firestore';
import getNestedSubcollection from '@/firebase/getNestedSubcollection';
import getNestedSubSubcollection from '@/firebase/getNestedSubsubCollection';
import { onMounted, ref, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import getCollectionWhere from '@/firebase/getCollectionWhere';
import getUser from '@/firebase/getUser';
import { projectFirestore } from '@/config/config';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        const products = ref([]);
        const productDetails = ref([]);
        const isLoading = ref(true);
        const content = ref(null)
        const { documents: categoryDocument, fetchCollection } = useFirestoreCollection("categories");
        const { user } = getUser()
        const uniqueStudents = ref([]);

        onMounted(async () => {
            await displayStudentByEmailCourseLearning();
            await fetchContent()
            await fetchCollection();
            await fetchCategoryProduct();
            await fetchCategoryProductAndProductDetail();
        });


        //fetct category
        const fetchContent = async () => {
            const results = await getCollectionWhere('content', "GP5cKnVMF99bzFXPzFOt");
            console.log(results);
            content.value = results
        };


        const fetchCategoryProduct = async () => {
            const orderByField = 'productName';

            try {
                const categoryPromises = categoryDocument.value.map(async (cate) => {
                    const { subcollectionData: product, fetchSubcollection } = useSubcollection('categories', cate.id, 'product', orderByField);
                    await fetchSubcollection();
                    return {
                        id: cate.id,
                        categoryName: cate.categoryName,
                        description: cate.description,
                        image: cate.image,
                        product: product.value,
                    };
                });

                const result = await Promise.all(categoryPromises);
                products.value = result;
            } catch (err) {
                console.error('Error fetching categories and products:', err);
            }
        };

        const fetchCategoryProductAndProductDetail = async () => {
            isLoading.value = true;
            const orderByField = 'productName';

            try {
                const categoryPromises = categoryDocument.value.map(async (cate) => {
                    const { subcollectionData: products, fetchSubcollection } = useSubcollection('categories', cate.id, 'product', orderByField);

                    try {
                        await fetchSubcollection();

                        const productPromises = products.value.map(async (pro) => {
                            const { subcollectionData: productDetail, fetchSubcollections } = getNestedSubcollection('categories', cate.id, 'product', pro.id, 'productDetail');

                            try {
                                await fetchSubcollections();

                                const productDetailWithStudents = await Promise.all(productDetail.value.map(async (detail) => {
                                    const { subSubcollectionData: students, fetchSubSubcollections } = getNestedSubSubcollection(
                                        'categories',
                                        cate.id,
                                        'product',
                                        pro.id,
                                        'productDetail',
                                        detail.id,
                                        'student'
                                    );

                                    try {
                                        await fetchSubSubcollections();

                                        const titleCounts = students.value.reduce((acc, stu) => {
                                            const title = stu.title || 'Unknown';
                                            acc[title] = (acc[title] || 0) + 1;
                                            return acc;
                                        }, {});

                                        const isBestSeller = titleCounts[detail.title] > 2;

                                        return {
                                            ...detail,
                                            student: students.value,
                                            isBestSeller
                                        };
                                    } catch (err) {
                                        console.error(`Error fetching students for productDetail ${detail.id}:`, err);
                                        return {
                                            ...detail,
                                            student: [],
                                            isBestSeller: false
                                        };
                                    }
                                }));

                                return {
                                    ...pro,
                                    productDetail: productDetailWithStudents
                                };
                            } catch (err) {
                                console.error(`Error fetching productDetail for product ${pro.id}:`, err);
                                return null;
                            }
                        });

                        const productArray = await Promise.all(productPromises);
                        return {
                            id: cate.id,
                            categoryName: cate.categoryName,
                            description: cate.description,
                            image: cate.image,
                            product: productArray.filter(Boolean)
                        };
                    } catch (err) {
                        console.error(`Error fetching products for category ${cate.id}:`, err);
                        return null;
                    }
                });

                const result = await Promise.all(categoryPromises);
                productDetails.value = result.filter(Boolean);
            } catch (err) {
                console.error('Error fetching categories:', err);
            }

            isLoading.value = false;
        };

        // const bestSellerProducts = computed(() => {
        //     return productDetails.value
        //         .flatMap(category => category.product) // Flatten products array
        //         .flatMap(product => product.productDetail) // Flatten product details array
        //         .filter(detail => detail.isBestSeller); // Filter for best sellers
        // });

        const bestSellerProducts = computed(() => {
            return productDetails.value
                .flatMap(category => category.product) // Flatten products array
                .flatMap(product => product.productDetail) // Flatten product details array
                .filter(detail => detail.isBestSeller) // Filter for best sellers
                .map(detail => {
                    // Add category name to each best seller product detail
                    const category = productDetails.value.find(cat =>
                        cat.product.some(prod => prod.productDetail.some(d => d.id === detail.id))
                    );
                    return {
                        ...detail,
                        categoryName: category ? category.categoryName : 'Unknown Category', // Include category name
                    };
                });
        });


        //display student by email

        const displayStudentByEmailCourseLearning = async () => {
            // Guard: Check if the user's email is available
            try {
                if (!user.value || !user.value.email) {
                    console.log("User email is not available yet.");
                    return;
                }

                const studentDocs = [];

                // Query Firestore with the email filter
                const q = query(
                    collection(projectFirestore, "studentInfo"),
                    where("email", "==", user.value.email) // Now we know user.value.email is available
                );

                const querySnapshot = await getDocs(q);

                // Push data into studentDocs array
                querySnapshot.forEach((doc) => {
                    studentDocs.push({ id: doc.id, ...doc.data() });
                });

                // Assign the fetched data to uniqueStudents
                uniqueStudents.value = studentDocs;
            }
            catch (err) {
                console.log(err)
            }
        };




        return {
            bestSellerProducts,
            isLoading,
            content,
            modules: [Navigation],
            user,

            uniqueStudents
        };
    },
};
</script>
<style scoped></style>
