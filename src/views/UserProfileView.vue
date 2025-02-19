<template>
    <div class="flex flex-col h-screen">
        <NavbarView />

        <div class="mb-auto">
            <div class="xl:w-[90%]  mx-auto ">
                <div class="my-8 text-center">
                    <h1 class="px-4 text-2xl font-bold">{{ $t('profile') }}</h1>
                </div>
                <div class="grid grid-cols-4 gap-6 px-4 lg:grid-cols-12">
                    <div class="col-span-4 lg:col-span-3">

                        <div class="p-6 bg-white border shadow">
                            <div class="flex flex-col items-center">
                                <div
                                    class="flex items-center justify-center w-24 h-24 mb-4 bg-gray-300 rounded-full shrink-0">

                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="lucide lucide-user">
                                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </div>


                                <!-- <h1 class="text-xl font-bold">John Doe</h1> -->
                                <p class="text-xl font-bold text-gray-700">{{ $t('hi') }}, {{ user?.displayName }}</p>

                            </div>


                            <hr class="my-6 border-t border-gray-300">
                            <div class="flex flex-col">


                                <div v-for="users in usersDoc" :key="users" class="space-y-2">
                                    <div v-if="users.id === user?.uid" class="space-y-2">

                                        <div class="space-y-1">
                                            <label for="" class="font-bold">{{ $t('email') }}</label>
                                            <div class="p-2 border-2 border-dotted rounded-md bg-gray-50">{{
                                                users?.email
                                                }}
                                            </div>
                                        </div>
                                        <div class="space-y-1">
                                            <label for="" class="font-bold">{{ $t('phone') }}</label>
                                            <div class="p-2 border-2 border-dotted rounded-md bg-gray-50">{{
                                                users?.phone
                                                }}
                                            </div>
                                        </div>
                                        <div class="space-y-1">
                                            <label for="" class="font-bold">{{ $t('password') }}</label>
                                            <div class="p-2 border-2 border-dotted rounded-md bg-gray-50">
                                                {{ '•'.repeat(users?.password.length) }}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>

                    <div class="col-span-4 lg:col-span-9 ">
                        <div class="p-6 bg-white border shadow">
                            <h2 class="flex items-center gap-1 mb-4 text-xl font-bold">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-book-open">
                                    <path d="M12 7v14" />
                                    <path
                                        d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
                                </svg>
                                <span>{{ $t('myLession') }}</span>
                            </h2>

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
                                <!-- <div v-for="category in studentDetails" :key="category">
                                    <div v-for="pro in category.product" :key="pro">
                                        <div v-for="detail in pro.productDetail" :key="detail">
                                            <div v-for="student in detail.student" :key="student"
                                                class="grid grid-cols-1 gap-1 md:grid-cols-3 lg:grid-cols-3">
                                                <div class="space-y-2 border rounded-md"
                                                    v-if="student?.email?.trim().toLowerCase() === user?.email?.trim().toLowerCase()">
                                                    <div class="flex justify-center ">
                                                        <img class="w-full rounded-t-md" :src="detail.imageUrl" alt="">
                                                    </div>
                                                    <div>
                                                        <router-link
                                                            :to="{ name: 'courseDetail', params: { id: detail.id } }"
                                                            class="flex items-center gap-1 p-3 cursor-pointer hover:text-gray-600">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                height="24" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" stroke-width="2"
                                                                stroke-linecap="round" stroke-linejoin="round"
                                                                class="lucide lucide-chevrons-right">
                                                                <path d="m6 17 5-5-5-5" />
                                                                <path d="m13 17 5-5-5-5" />
                                                            </svg>
                                                            <div class="font-mono font-bold text-md line-clamp-1">{{
                                                                student?.title }}</div>
                                                        </router-link>
                                                        <div
                                                            class="flex items-center gap-1 px-3 pb-3 font-mono text-sm text-gray-500">
                                                            <span>Created At</span>
                                                            <span>{{ student.createdAt ? new
                                                                Date(student.createdAt.seconds
                                                                    *
                                                                    1000).toLocaleDateString('en-US', {
                                                                        weekday: 'short',
                                                                        year: 'numeric',
                                                                        month: 'short',
                                                                        day: 'numeric',
                                                                    }) : 'N/A' }}</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> -->

                                <div class="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-3">
                                    <div v-for="student in studentDoc" :key="student">
                                        <div class="space-y-2 border rounded-md"
                                            v-if="student?.email?.trim().toLowerCase() === user?.email?.trim().toLowerCase()">
                                            <div class="flex justify-center ">
                                                <img class="w-full rounded-t-md" :src="student?.imageUrl" alt="">
                                            </div>
                                            <div>
                                                <router-link
                                                    :to="{ name: 'courseDetail', params: { id: student?.productDetailId } }"
                                                    class="flex items-center gap-1 p-3 cursor-pointer hover:text-gray-600">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        class="lucide lucide-chevrons-right">
                                                        <path d="m6 17 5-5-5-5" />
                                                        <path d="m13 17 5-5-5-5" />
                                                    </svg>
                                                    <div class="font-mono font-bold text-md line-clamp-1">{{
                                                        student?.title }}</div>
                                                </router-link>

                                                <div
                                                    class="flex items-center gap-1 px-3 pb-3 font-mono text-sm text-gray-500">
                                                    <span>Created At</span>
                                                    <span>{{ student.createdAt ? new
                                                        Date(student.createdAt.seconds
                                                            *
                                                            1000).toLocaleDateString('en-US', {
                                                                weekday: 'short',
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric',
                                                            }) : 'N/A' }}</span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-10">
            <FooterView />
        </div>
    </div>
</template>

<script>
import NavbarView from './NavbarView.vue';
import getUser from '@/firebase/getUser';
import getCollection from '@/firebase/getCollection';
import getCollectionQueryTerm from '@/firebase/getCollectionQueryTerm';

import { useFirestoreCollection, useSubcollection } from '@/firebase/getArrayDocument';
import getNestedSubcollection from '@/firebase/getNestedSubcollection';
import getNestedSubSubcollection from '@/firebase/getNestedSubsubCollection';
import { onMounted } from 'vue';
import { ref } from 'vue';
import FooterView from './FooterView.vue';
import { where } from 'firebase/firestore';
import { watch } from 'vue';
import { watchEffect } from 'vue';
export default {
    components: {
        NavbarView,
        FooterView
    },
    setup() {

        const { user } = getUser();
        const studentDetails = ref([]);
        const isLoading = ref(false)
        const studentDoc = ref([])


        const { document: usersDoc } = getCollection("users")

        const { documents: categoryDocument, fetchCollection } = useFirestoreCollection("categories");

        //error email null when fix

        watchEffect(() => {
            // Only run this block when user is defined and has an email.
            if (user.value && user.value.email) {
                const { documents } = getCollectionQueryTerm(
                    "studentInfo",
                    where("email", "==", user.value.email)
                );

                watch(documents, () => {
                    try {
                        studentDoc.value = documents.value || [];
                    } catch (err) {
                        console.log(err);
                    }
                });
            }
        });


        onMounted(async () => {
            await fetchCollection();
            await fetchCategoryProductAndProductDetail();
            console.log("student", studentDoc)
        });


        const fetchCategoryProductAndProductDetail = async () => {
            isLoading.value = true;

            try {
                const categoryPromises = categoryDocument.value.map(async (cate) => {
                    const { subcollectionData: products, fetchSubcollection } = useSubcollection('categories', cate.id, 'product');

                    try {
                        await fetchSubcollection();

                        const productPromises = products.value.map(async (pro) => {
                            const { subcollectionData: productDetail, fetchSubcollections } = getNestedSubcollection('categories', cate.id, 'product', pro.id, 'productDetail');
                            try {
                                await fetchSubcollections();

                                const productDetailPromises = productDetail.value.map(async (detail) => {
                                    const { subSubcollectionData: studentData, fetchSubSubcollections } = getNestedSubSubcollection('categories', cate.id, 'product', pro.id, 'productDetail', detail.id, 'student');

                                    try {
                                        await fetchSubSubcollections();

                                        return {
                                            ...detail,
                                            student: studentData.value
                                        };
                                    } catch (err) {
                                        console.error(`Error fetching student data for productDetail ${detail.id}:`, err);
                                        return null;
                                    }
                                });

                                const productDetailArray = await Promise.all(productDetailPromises);

                                return {
                                    ...pro,
                                    productDetail: productDetailArray.filter(Boolean)
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

                studentDetails.value = result.filter(Boolean);
            } catch (err) {
                console.error('Error fetching categories:', err);
            }

            isLoading.value = false;
        };


        return { user, usersDoc, studentDetails, isLoading, studentDoc }

    }
}

</script>