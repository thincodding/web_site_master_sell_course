<template>
    <div class="w-screen bg-gray-100/50 p-5 ">
        <div class="flex gap-4">
            <!-- Sidebar -->
            <div
                :class="isOpenNav ? 'sticky top-0 bg-white w-72 shadow-sm h-screen p-3  transition-all duration-500 ease-in-out' : 'sticky top-0 w-20 bg-white shadow-sm h-screen transition-all duration-500 ease-in-out p-2'">
                <div :class="isOpenNav ? '' : 'justify-center'"
                    class=" text-[20px] text-center w-full font-bold  my-3 font-NotoSansKhmer flex space-x-3 cursor-pointer items-center">
                    <div>
                        <svg @click="handleIsOpenNav" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-justify">
                            <line x1="3" x2="21" y1="6" y2="6" />
                            <line x1="3" x2="21" y1="12" y2="12" />
                            <line x1="3" x2="21" y1="18" y2="18" />
                        </svg>
                    </div>
                    <p class="select-none" :class="isOpenNav ? 'block' : 'hidden p-4 '">មាស្ទ័រអាយធីអនឡាញ</p>
                </div>

                <div class=" mt-10 space-y-1">
                    <div :class="isOpenNav ? '' : 'justify-center flex'">

                        <router-link class="hover:text-primary  flex items-center gap-4 p-3 " :to="{ name: 'dash' }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-circle-gauge">
                                <path d="M15.6 2.7a10 10 0 1 0 5.7 5.7" />
                                <circle cx="12" cy="12" r="2" />
                                <path d="M13.4 10.6 19 5" />
                            </svg>
                            <p :class="isOpenNav ? 'block' : 'hidden'" class="font-NotoSansKhmer text-[18px]">
                                ទំព័រដើម</p>
                        </router-link>
                    </div>

                    <div :class="isOpenNav ? '' : 'justify-center flex relative group'">
                        <!-- Menu Button -->
                        <div @click="handleIsOpenDropdown('វគ្គសិក្សា')" :class="{
                            'bg-blue-600 text-white': isOpenDropdown === 'វគ្គសិក្សា',
                            'hover:text-white': !isOpenDropdown === 'វគ្គសិក្សា'
                        }" class="cursor-pointer flex items-center gap-4 p-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                            </svg>
                            <p :class="isOpenNav ? 'block' : 'hidden'" class="font-NotoSansKhmer text-[18px]">
                                {{ course }}
                            </p>

                            <!-- <div :class="isOpenDropdown ? 'text-white' : 'text-black'"
                                class="absolute left-52 top-[166px] cursor-pointer">
                                <svg :class="isOpenNav ? '' : 'hidden'" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                    class="size-4 group-hover:text-primary ">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div> -->


                            <svg :class="isOpenNav ? '' : 'hidden'" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="size-4 group-hover:text-primary text-end  w-20 pl-10 ">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>


                        </div>

                    </div>
                    <!-- Dropdown Menu -->
                    <div :class="!isOpenNav ? 'hidden' : 'block'">
                        <div :class="dropdownClasses"
                            class="bg-white transition-[height] duration-500 ease-in-out overflow-hidden">
                            <div class="flex-col flex text-[18px]  ">
                                <router-link :to="{ name: 'categoryList' }" class="flex items-center gap-4 p-3 pl-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p class="text-[16px] font-NotoSansKhmer">បញ្ចីវគ្គសិក្សា</p>
                                </router-link>
                                <router-link :to="{ name: 'addcategory' }" class="flex items-center gap-4 p-3 pl-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p class="text-[16px] font-NotoSansKhmer">បង្កើតវគ្គសិក្សា</p>
                                </router-link>

                            </div>
                        </div>

                    </div>


                    <div :class="isOpenNav ? '' : 'justify-center flex relative group'">
                        <!-- Menu Button -->
                        <div @click="handleIsOpenDropdownProduct('ផលិតផល')" :class="{
                            'bg-blue-600 text-white': isOpenDropdownProduct === 'ផលិតផល',
                            'hover:text-white': !isOpenDropdownProduct === 'ផលិតផល'
                        }" class="cursor-pointer flex items-center gap-4 p-3 ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-book">
                                <path
                                    d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
                            </svg>

                            <p :class="isOpenNav ? 'block' : 'hidden'" class="font-NotoSansKhmer text-[18px]">
                                {{ product }}
                            </p>


                            <!-- <div :class="isOpenDropdownProduct ? 'text-white' : 'text-black'"
                                class="absolute left-52 top-[225px] cursor-pointer">
                                <svg :class="isOpenNav ? '' : 'hidden'" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                    class="size-4 group-hover:text-primary ">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div> -->

                            

                            <svg :class="isOpenNav ? '' : 'hidden'" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="size-4  w-20 pl-4 group-hover:text-primary ">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>

                    </div>
                    <!-- Dropdown Menu -->
                    <div :class="!isOpenNav ? 'hidden' : 'block'">
                        <div :class="dropdownClassesProduct"
                            class="bg-white transition-[height] duration-500 ease-in-out overflow-hidden">
                            <div class="flex-col flex text-[18px]  ">
                                <router-link :to="{ name: 'product' }" class="flex items-center gap-4 p-3 pl-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p class="text-[16px] font-NotoSansKhmer">បញ្ចីផលិតផល</p>
                                </router-link>
                                <router-link :to="{ name: 'lession' }" class="flex items-center gap-4 p-3 pl-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p class="text-[16px] font-NotoSansKhmer">បញ្ជីមេរៀន</p>
                                </router-link>

                            </div>
                        </div>

                    </div>





                </div>


            </div>

            <!-- Main Content -->
            <div class="w-full">
                <div class="bg-white p-3 shadow-sm font-NotoSansKhmer flex justify-between w-full items-center">

                    <p v-if="currentRouteName === 'product'" class="font-NotoSansKhmer font-bold select-none">ផលិតផល /
                        <span class="text-gray-500 font-NotoSansKhmer">បញ្ជីផលិតផល</span>
                    </p>
                    <p v-else-if="currentRouteName === 'categoryList'" class="font-NotoSansKhmer font-bold select-none">
                        ប្រភេទ / <span class="text-gray-500 font-NotoSansKhmer">បញ្ចីវគ្គសិក្សា</span></p>
                    <p v-else class="font-NotoSansKhmer font-bold select-none">ទំព័រដើម / <span
                            class="text-gray-500 font-NotoSansKhmer">ផ្ទាំងគ្រប់គ្រង</span></p>

                    <div class="flex gap-3 items-center">
                        <div class="font-NotoSansKhmer select-none">ប្រវត្តិរូប៖ {{ user?.displayName }}</div>
                        <div class="relative">
                            <div @click="handleIsOpen" class="bg-gray-50 p-2 rounded-full cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-user">
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                            <div v-if="isOpenDrop"
                                class="bg-white w-28 z-10 shadow-sm top-14 right-0 absolute flex items-center space-x-3 p-2 hover:text-red-400 cursor-pointer select-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-log-out">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" x2="9" y1="12" y2="12" />
                                </svg>
                                <div class="font-NotoSansKhmer text-md" @click="handleSignOut">ចាក់ចេញ</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-5">
                    <!-- router-view dynamically renders the current route component -->
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import getUser from '@/firebase/getUser';
import useSignout from '@/firebase/useSignout';
import { computed, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
    setup() {
        const isOpenDrop = ref(false);
        const isOpenNav = ref(true);
        const { user } = getUser();
        const { signOut } = useSignout();
        const router = useRouter();
        const route = useRoute();
        const isOpenDropdown = ref(false)
        const isOpenDropdownProduct = ref(false)
        const course = 'វគ្គសិក្សា';
        const product = "ផលិតផល";

        const currentRouteName = ref(route.name)

        const handleSignOut = async () => {
            try {
                if (window.confirm("តើអ្នកចង់ចាក់ចេញមែនទេ?")) {
                    await signOut();
                    router.push({ name: 'login' });
                }
            } catch (err) {
                console.log(err);
            }
        };

        const handleIsOpen = () => {
            isOpenDrop.value = !isOpenDrop.value;
        };

        const handleIsOpenNav = () => {
            isOpenNav.value = !isOpenNav.value;
        };



        const handleIsOpenDropdown = (courseName) => {

            isOpenDropdown.value = isOpenDropdown.value === courseName ? null : courseName;

        }


        const handleIsOpenDropdownProduct = (product) => {

            isOpenDropdownProduct.value = isOpenDropdownProduct.value === product ? null : product;

        }



        //dropdown transition
        const dropdownClasses = computed(() => ({
            'h-24': isOpenDropdown.value,
            'h-0': !isOpenDropdown.value,
        }));

        const dropdownClassesProduct = computed(() => ({
            'h-24': isOpenDropdownProduct.value,
            'h-0': !isOpenDropdownProduct.value,
        }));



        //watch for display route
        watch(route, (to) => {
            currentRouteName.value = to.name
        })


        return {
            user,
            signOut,
            handleSignOut,
            isOpenDrop,
            handleIsOpen,
            isOpenNav,
            handleIsOpenNav,
            isOpenDropdown,
            handleIsOpenDropdown,
            dropdownClasses,
            course,
            currentRouteName,
            handleIsOpenDropdownProduct,
            product,
            dropdownClassesProduct,
            isOpenDropdownProduct
        };
    }
};
</script>

<style>
body {
    height: 100vh;
}
</style>
