<template>
    <div class="p-10 xl:p-0">
        <div class="xl:w-[1200px] mx-auto">
            <div>
                <div v-for="con in content" :key="con.id">
                    <!-- <h1 class="text-[18px] lg:text-[20px] md:text-[20px] font-bold font-KhmerMoul text-background">
                        {{ con.data.title }}</h1> -->
                    <!-- <p v-html="con.data.descripton" class="my-3 text-md text-background font-NotoSansKhmer ">
                        
                    </p> -->
                    <h1
                        class="text-[18px] flex items-center gap-2 lg:text-[20px] md:text-[20px] font-bold font-NotoSansKhmer text-background">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-arrow-right-to-line">
                            <path d="M17 12H3" />
                            <path d="m11 18 6-6-6-6" />
                            <path d="M21 5v14" />
                        </svg>
                        <span>{{ $t('allCourse') }}</span>
                    </h1>
                    <p class="my-3 text-md text-background font-NotoSansKhmer ">
                        {{ $t('allCourseDesc') }}
                    </p>
                </div>

                <div v-if="isLoading">
                    <div class="flex gap-2 text-center">
                        <div
                            class="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
                            <svg class="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                                <path
                                    d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                                    stroke="currentColor" stroke-width="5" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                                <path
                                    d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                                    stroke="currentColor" stroke-width="5" stroke-linecap="round"
                                    stroke-linejoin="round" class="text-gray-900">
                                </path>
                            </svg>
                            <p class="font-bold">{{ $t('loading') }}</p>
                        </div>
                    </div>
                </div>
                <div v-else>
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
                                                        <p class="text-gray-500 text-[12px] line-clamp-1">{{
                                                            $t('lectures') }}: {{
                                                                detail.lectures }}</p>
                                                        <div class="flex space-x-[2px] items-center">

                                                            <div v-if="!detail.studentCount">
                                                                <!-- <p class="text-xs">មិនមាន</p> -->
                                                            </div>
                                                            <div v-else>
                                                                <p class="text-xs">({{ detail.studentCount }}) {{
                                                                    $t('people') }}</p>
                                                            </div>

                                                        </div>
                                                        <div>
                                                            <p v-if="detail.price === 0"
                                                                class="text-lg font-bold text-green-600">{{
                                                                $t('freeCourse') }}</p>
                                                            <p v-else class="text-lg font-bold">${{ detail.price }}</p>
                                                        </div>
                                                        <div v-if="detail.studentCount > 2"
                                                            class="text-xs w-20 text-center font-bold text-[#3D3C0A] bg-yellow-300/60 p-1">
                                                            {{ $t('bestSeller') }}</div>

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
import getCollectionWhere from '@/firebase/getCollectionWhere';



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
        const content = ref(null)

        const { documents: categoryDocument, fetchCollection } = useFirestoreCollection("categories");

        const fetchContent = async () => {
            const results = await getCollectionWhere('content', "Z6TSQWgyq3fI71FrpAVd");
            console.log(results);
            content.value = results
        };

        onMounted(async () => {

            try {
                await fetchContent();
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
            content,
            modules: [Navigation],
        };
    },
};
</script>

<style scoped></style>
