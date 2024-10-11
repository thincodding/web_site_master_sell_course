<template>
    <div class="xl:w-[1200px] mx-auto my-5 px-10 lg:px-10 xl:px-0">
        <div class="my-4">
            <h1 class="text-[18px] lg:text-[30px] font-playfair md:text-[24px]">Learners are viewing</h1>
        </div>
        <div class="relative">
            <swiper ref="mySwiper" :navigation="{
                nextEl: '.button-next-slide',
                prevEl: '.button-pre-slide'
            }" :spaceBetween="10" :slidesPerView="'auto'" :breakpoints="{
                '540': { slidesPerView: 2, spaceBetween: 20 },
                '768': { slidesPerView: 3, spaceBetween: 15 },
                '1024': { slidesPerView: 4, spaceBetween: 15 }
            }" :loop="false" :modules="modules" :allowTouchMove="true" :speed="1000"
                class="mySwiper relative xl:w-[1200px]">
                <swiper-slide v-for="detail in bestSellerProducts" :key="detail.id">
                    <div class="border-[1px] h-[350px] rounded-lg">
                        <div class="">
                            <img :src="detail.imageUrl" alt="" class="w-full h-40 object-cover overflow-clip" />
                        </div>
                        <div class="mt-2 space-y-1 p-4">
                            <router-link :to="{ name: 'courseDetail', params: { id: detail.id } }"
                                class="text-[14px] font-semibold line-clamp-2 cursor-pointer ">
                                {{ detail.title }}
                            </router-link>

                            <div class="space-y-1.5">
                                <p class="text-gray-500 text-[12px] line-clamp-1">{{ detail.lectures }}</p>
                                <div class="flex space-x-[2px] items-center">
                                    <p class="text-xs">5.0</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-3 text-orange-700">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                    </svg>
                                    <p class="text-xs">(2)</p>
                                </div>

                                <div>
                                    <p class="font-bold text-lg">${{ detail.price }}.99</p>
                                </div>

                                <div class="text-xs w-20 text-center font-bold text-[#3D3C0A] bg-yellow-300/60 p-1">
                                    Best Seller</div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>

            <div class="button-pre-slide cursor-pointer rounded-full text-white absolute top-[45%] -left-5 z-[2]">
                <div class="flex justify-center w-10 h-10 border-gray-500 border-[1px] items-center bg-background rounded-full hover:bg-background/90"
                    @click="prevSlide">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </div>
            </div>

            <div class="button-next-slide cursor-pointer rounded-full text-white absolute top-[45%] -right-5  xl:-right-5 z-[2]">
                <div class="flex justify-center w-10 h-10 border-gray-500 border-[1px] items-center bg-background rounded-full hover:bg-background/90"
                    @click="nextSlide">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-5 font-bold">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import { useFirestoreCollection, useSubcollection } from '@/firebase/getArrayDocument';
import getNestedSubcollection from '@/firebase/getNestedSubcollection';
import getNestedSubSubcollection from '@/firebase/getNestedSubsubCollection';
import { onMounted, ref, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        const products = ref([]);
        const productDetails = ref([]);
        const isLoading = ref(false);

        const { documents: categoryDocument, fetchCollection } = useFirestoreCollection("categories");

        onMounted(async () => {
            await fetchCollection();
            await fetchCategoryProduct();
            await fetchCategoryProductAndProductDetail();
        });

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

        // Computed property to gather all best seller products across all categories
        const bestSellerProducts = computed(() => {
            return productDetails.value
                .flatMap(category => category.product) // Flatten products array
                .flatMap(product => product.productDetail) // Flatten product details array
                .filter(detail => detail.isBestSeller); // Filter for best sellers
        });

        return {
            bestSellerProducts, // Add to return object
            isLoading,
            modules: [Navigation],
        };
    },
};
</script>
<style scoped>

</style>
