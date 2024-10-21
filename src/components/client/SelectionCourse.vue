<template>
    <div class="p-10 xl:p-0">
        <div class="xl:w-[1200px] mx-auto">
            <div>

                <h1 class="text-[18px] lg:text-[20px] md:text-[20px] font-bold font-KhmerMoul text-background">វគ្គសិក្សាទាំងអស់</h1>

                <p class="my-3 text-md text-background font-NotoSansKhmer ">
                    ទាំងនេះជាវគ្គសិក្សាដែលមាននៅក្នុងសាលាម៉ាស្ទ័រ អាយធី
                </p>
                <div>
                    <TabGroup>

                        <TabList class="flex w-full space-x-10 overflow-x-auto">
                            <Tab v-for="product in allProducts" :key="product.id" as="template" v-slot="{ selected }">
                                <button :class="[
                                    'space-x-3 py-2.5 text-sm font-medium leading-5 text-nowrap',
                                    'ring-white/60 ring-offset-2 focus:outline-none text-nowrap',
                                    selected ? 'text-black text-lg' : 'text-background/80 hover:bg-white/[0.12]',
                                ]">
                                    {{ product.productName }}
                                </button>
                            </Tab>
                        </TabList>



                        <!-- Product Tab Panels -->
                        <TabPanels class="mt-2">
                            <TabPanel v-for="product in allProducts" :key="product.id" class="focus:outline-none">
                                <!-- Display Product Details -->
                                <div class="relative border-[1px] p-7">
                                    <swiper :slidesPerView="4" :spaceBetween="10" :navigation="{
                                        nextEl: '.button-next-slidess',
                                        prevEl: '.button-pre-slidess'
                                    }" :pagination="{ clickable: true }" :breakpoints="{
                                        '240': {
                                            slidesPerView: 1,
                                            spaceBetween: 20,
                                        },
                                        '640px': {
                                            slidesPerView: 3,
                                            spaceBetween: 20,
                                        },
                                        '768': {
                                            slidesPerView: 3,
                                            spaceBetween: 10,
                                        },
                                        '1024': {
                                            slidesPerView: 4,
                                            spaceBetween: 20,
                                        }

                                    }" :modules="modules" class="mySwiper">
                                        <swiper-slide v-for="detail in product.productDetail" :key="detail.id">
                                            <div class="">
                                                <div class="border-[1px]">
                                                    <div v-if="detail.imageUrl">
                                                        <img :src="detail.imageUrl" alt="Course Image"
                                                            class="object-center w-full h-full" />
                                                    </div>
                                                    <div v-else>
                                                        <img src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
                                                            alt="">
                                                    </div>
                                                </div>
                                                <div class="mt-2 space-y-1">
                                                    <router-link
                                                        :to="{ name: 'courseDetail', params: { id: detail.id } }"
                                                        class="text-[14px] font-semibold  cursor-pointer text-background line-clamp-1">
                                                        {{ detail.title }}
                                                    </router-link>
                                                    <div class="space-y-1.5">
                                                        <p class="text-gray-500 text-[12px] line-clamp-1">បង្រៀនដោយ: {{
                                                            detail.lectures }}</p>
                                                        <div class="flex space-x-[2px] items-center">
                                                            <!-- <p class="text-xs">5.0</p> -->
                                                            <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1.5"
                                                                stroke="currentColor" class="text-orange-700 size-3">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                            </svg> -->
                                                            <div v-if="!detail.studentCount">
                                                                <p class="text-xs">មិនមាន</p>
                                                            </div>
                                                            <div v-else>
                                                                <p class="text-xs">({{ detail.studentCount }}) នាក់</p>
                                                            </div>

                                                        </div>
                                                        <div>
                                                            <p class="text-lg font-bold">${{ detail.price }}</p>
                                                        </div>
                                                        <div v-if="detail.studentCount > 2"
                                                            class="text-xs w-20 text-center font-bold text-[#3D3C0A] bg-yellow-300/60 p-1">
                                                            លក់ដាច់បំផុត</div>

                                                    </div>
                                                </div>
                                            </div>
                                        </swiper-slide>
                                    </swiper>

                                    <div
                                        class="button-pre-slidess cursor-pointer rounded-full text-white absolute top-[45%] -left-5 z-[2]">
                                        <div
                                            class="flex justify-center w-10 h-10 border-gray-500 border-[1px] items-center bg-background rounded-full hover:bg-background/90">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="size-5">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M15.75 19.5 8.25 12l7.5-7.5" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div
                                        class="button-next-slidess cursor-pointer rounded-full text-white absolute top-[45%] -right-5  xl:-right-5 z-[2]">
                                        <div
                                            class="flex justify-center w-10 h-10 border-gray-500 border-[1px] items-center bg-background rounded-full hover:bg-background/90">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="font-bold size-5">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
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
        TabGroup,
        TabList,
        Tab,
        TabPanels,
        TabPanel,
        Swiper,
        SwiperSlide,
    },
    setup() {
        const products = ref([]);
        const isLoading = ref(false);
        const error = ref(null);

        const { documents: categoryDocument, fetchCollection } = useFirestoreCollection("categories");

        onMounted(async () => {
            try {
                isLoading.value = true;
                await fetchCollection();
                await fetchAllProducts();
            } catch (err) {
                console.error('Error during initialization:', err);
                error.value = 'Failed to load data.';
            } finally {
                isLoading.value = false;
            }
        });

        const fetchAllProducts = async () => {
            const orderByField = 'productName';
            try {
                const categoryPromises = categoryDocument.value.map(async (cate) => {
                    const { subcollectionData: categoryProducts, fetchSubcollection } = useSubcollection('categories', cate.id, 'product', orderByField);
                    await fetchSubcollection();

                    const productPromises = categoryProducts.value.map(async (pro) => {
                        const { subcollectionData: productDetails, fetchSubcollections } = getNestedSubcollection(
                            'categories',
                            cate.id,
                            'product',
                            pro.id,
                            'productDetail'
                        );
                        await fetchSubcollections();

                        const detailPromises = productDetails.value.map(async (detail) => {
                            const { subSubcollectionData: students, fetchSubSubcollections } = getNestedSubSubcollection(
                                'categories',
                                cate.id,
                                'product',
                                pro.id,
                                'productDetail',
                                detail.id,
                                'student'
                            );
                            await fetchSubSubcollections();

                            const studentCount = students.value.length;

                            return {
                                ...detail,
                                student: students.value,
                                studentCount
                            };
                        });

                        const productDetailWithStudents = await Promise.all(detailPromises);

                        return {
                            ...pro,
                            productDetail: productDetailWithStudents
                        };
                    });

                    const productsWithDetails = await Promise.all(productPromises);
                    return productsWithDetails.filter(Boolean);
                });

                const categoriesProducts = await Promise.all(categoryPromises);
                products.value = categoriesProducts.flat();
            } catch (err) {
                console.error('Error fetching products and details:', err);
                error.value = 'Failed to fetch products and details.';
            }
        };

        const allProducts = computed(() => {
            return products.value.filter(product => product.productDetail && product.productDetail.length > 0);
        });

        const totalProducts = computed(() => {
            return allProducts.value.length;
        });

        const totalStudents = computed(() => {
            return allProducts.value.reduce((total, product) => {
                return total + product.productDetail.reduce((prodTotal, detail) => {
                    return prodTotal + detail.studentCount;
                }, 0);
            }, 0);
        });

        return {
            allProducts,
            totalProducts,
            totalStudents,
            isLoading,
            error,
            modules: [Navigation],
        };
    },
};
</script>

<style scoped></style>
