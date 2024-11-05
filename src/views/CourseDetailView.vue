<template>
    <NavbarView />

    <div class="mx-auto ">
        <div v-if="isLoading" class="animate-pulse p-5 md:mt-3 lg:mt-10 xl:w-[1200px] mx-auto md:p-5">
            <div class="h-8 xl:h-9 bg-gray-300 w-72   xl:w-[600px] mb-4"></div>
            <div v-for="n in 4" :key="n" class="mb-4 space-y-6">
                <div class="flex gap-5 mt-2">
                    <div
                        class="relative w-full overflow-hidden   h-6  before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/70  before:animate-[shimmer_1.1s_infinite]">
                        <div class="w-full h-6 bg-gray-300"></div>
                    </div>
                </div>

                <div class="flex gap-5">
                    <div
                        class="relative w-full overflow-hidden   h-4  before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/70  before:animate-[shimmer_1.1s_infinite]">
                        <div class="w-full h-6 bg-gray-300"></div>
                    </div>
                </div>

                <div class="flex gap-5">
                    <div
                        class="relative w-full overflow-hidden   h-4  before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/70  before:animate-[shimmer_1.1s_infinite]">
                        <div class="w-full h-6 bg-gray-300"></div>
                    </div>
                </div>



                <div class="flex gap-5 mt-2">
                    <div
                        class="relative w-full overflow-hidden   h-6  before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/70  before:animate-[shimmer_1.1s_infinite]">
                        <div class="w-full h-6 bg-gray-300"></div>
                    </div>
                </div>

                <div class="flex gap-5 mt-2 lg:hidden">
                    <div
                        class="relative w-full overflow-hidden   h-6  before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/70  before:animate-[shimmer_1.1s_infinite]">
                        <div class="w-full h-6 bg-gray-300"></div>
                    </div>
                </div>
                <div class="flex gap-5 mt-2 lg:hidden">
                    <div
                        class="relative w-full overflow-hidden   h-6  before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/70  before:animate-[shimmer_1.1s_infinite]">
                        <div class="w-full h-6 bg-gray-300"></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="hidden p-5 bg-background lg:block">
                <div class="xl:w-[1200px] h-[350px] mx-auto  my-2  gap-10">

                    <div class="relative flex justify-between gap-2">

                        <div v-if="productDetails && productDetails.length">
                            <div v-for="category in productDetails" :key="category.id">

                                <div v-for="product in category.product" :key="product.id">

                                    <div class="px-10 ">
                                        <div v-for="detail in product.productDetail" :key="detail.id">
                                            <!-- Display the product detail only if it matches the route param id -->
                                            <div v-if="detail.id === $route.params.id">
                                                <div class="text-white">
                                                    <div class="flex items-center space-x-1">
                                                        <h3 class="capitalize text-indigo-300/90 text-sm font-[500]">{{
                                                            category.categoryName }}</h3>
                                                        <div><svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                                height="16" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" stroke-width="2"
                                                                stroke-linecap="round" stroke-linejoin="round"
                                                                class="lucide lucide-chevron-right">
                                                                <path d="m9 18 6-6-6-6" />
                                                            </svg></div>
                                                        <h3 class="capitalize text-indigo-300/90 text-sm font-[500]">{{
                                                            product.productName }}</h3>
                                                    </div>
                                                    <div class="">
                                                        <div>
                                                            <h1 class="text-[32px] font-bold my-5 line-clamp-2">
                                                                {{ detail.title }}
                                                            </h1>
                                                            <p v-html="detail.aboutCourse"
                                                                class="text-[18px] font-[350] text-[#FFFFFF] line-clamp-2">

                                                            </p>
                                                        </div>
                                                        <div class="flex items-center mt-5 space-x-2">
                                                            <div v-if="detail.isBestSeller"
                                                                class="text-xs px-2 font-bold text-[#3D3C0A] bg-yellow-300/90 p-1">

                                                                លក់ដាច់បំផុត
                                                            </div>


                                                            <div class="flex items-center space-x-2 text-xs">
                                                                <p class="text-indigo-300 underline">មានសិស្សរៀន
                                                                </p>
                                                                <span class="text-[14px]">{{ detail.student.length }}
                                                                    នាក់</span>
                                                            </div>

                                                        </div>
                                                        <div class="mt-4 mb-10 space-y-4">
                                                            <div class="text-sm">បង្រៀនដោយ <span
                                                                    class="text-indigo-300 underline capitalize cursor-pointer">{{
                                                                        detail.lectures }}</span>
                                                            </div>
                                                            <div class="flex items-center gap-2 text-sm">
                                                                <div>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18"
                                                                        height="18" viewBox="0 0 24 24" fill="none"
                                                                        stroke="currentColor" stroke-width="2"
                                                                        stroke-linecap="round" stroke-linejoin="round"
                                                                        class="lucide lucide-octagon-alert">
                                                                        <path d="M12 16h.01" />
                                                                        <path d="M12 8v4" />
                                                                        <path
                                                                            d="M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z" />
                                                                    </svg>
                                                                </div>
                                                                <div>
                                                                    កាលបរិច្ឆេតចុងក្រោយ <span
                                                                        class="capitalize cursor-pointer">
                                                                        {{ detail.createdAt ? date(detail.createdAt
                                                                            .toDate()).format('D/YYYY') : 'N/A' }}</span>
                                                                </div>

                                                                <div class="flex items-center space-x-2">

                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                        viewBox="0 0 24 24" stroke-width="1.5"
                                                                        stroke="currentColor" class="size-4">
                                                                        <path stroke-linecap="round"
                                                                            stroke-linejoin="round"
                                                                            d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                                                                    </svg>

                                                                    <p>English</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div
                                                    class=" text-black absolute top-[21rem] border-background/20 md:w-[600px] lg:w-[580px] xl:w-[750px] p-4 my-10 ">

                                                    <div class="">
                                                        <p class="mt-6 text-black  leading-5 prose prose-p:text-[16px] "
                                                            v-html="detail.desctiption"></p>
                                                    </div>
                                                    <!-- <div>hello</div> -->
                                                    <div></div>
                                                    <div></div>
                                                </div>
                                          
                                             
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div v-if="productDetails && productDetails.length">
                            <div v-for="category in productDetails" :key="category.id">
                                <div v-for="product in category.product" :key="product.id">
                                    <div class="">
                                        <div v-for="detail in product.productDetail" :key="detail.id">
                                            <!-- Display the product detail only if it matches the route param id -->
                                            <div v-if="detail.id === $route.params.id">
                                                <div class="w-[300px]  bg-white shadow-md mr-16 ">
                                                    <div v-if="detail.urlLinkCopy?.length > 0">
                                                        <div class="w-full">
                                                            <div v-html="detail.urlLinkCopy"></div>
                                                        </div>

                                                    </div>
                                                    <div v-else>
                                                        <p>មិនមានលីងវីដែអូ</p>
                                                    </div>
                                                    <div class="p-5">
                                                        <h3 class="font-bold text-[32px] text-background">${{
                                                            detail.price
                                                            }}.99</h3>
                                                        <div class="mt-2 space-y-2">
                                                            <a href="https://t.me/masteritsystems_saleconsultant"
                                                                target="_blank" rel="noopener noreferrer">
                                                                <button
                                                                    class="w-full p-3 font-bold text-[16px] text-white bg-[#A435F0] mt-2 ">
                                                                    ប្រឹក្សាតាមតែលេក្រាម
                                                                </button>
                                                            </a>
                                                            <button
                                                                class="border-[1px] border-black p-2.5 w-full font-bold hover:bg-background/10">
                                                                ប្រឹក្សាតាមឆាត</button>

                                                        </div>
                                                        <!-- <p class="text-center text-xs font-[300] mt-3">
                                                         ប្រឹក្សាជាមួយគ្រូជំនាញ
                                                        </p> -->
                                                        <div class="mt-5">
                                                            <p class="text-sm font-bold">This course includes:</p>
                                                            <div class="mt-2 space-y-4">
                                                                <div class="flex items-center gap-3">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15"
                                                                        height="15" viewBox="0 0 24 24" fill="none"
                                                                        stroke="currentColor" stroke-width="2"
                                                                        stroke-linecap="round" stroke-linejoin="round"
                                                                        class="lucide lucide-monitor-play text-background">
                                                                        <path
                                                                            d="M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.278l-3.664 2.25a.75.75 0 0 1-1.142-.64z" />
                                                                        <path d="M12 17v4" />
                                                                        <path d="M8 21h8" />
                                                                        <rect x="2" y="3" width="20" height="14"
                                                                            rx="2" />
                                                                    </svg>
                                                                    <p class="text-xs text-background">15 hours
                                                                        on-demand
                                                                        video</p>
                                                                </div>
                                                                <div class="flex items-center gap-3">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15"
                                                                        height="15" viewBox="0 0 24 24" fill="none"
                                                                        stroke="currentColor" stroke-width="2"
                                                                        stroke-linecap="round" stroke-linejoin="round"
                                                                        class="lucide lucide-file text-background">
                                                                        <path
                                                                            d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                                                                        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                                                                    </svg>
                                                                    <p class="text-xs text-background">1 article</p>
                                                                </div>
                                                                <div class="flex items-center gap-3">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15"
                                                                        height="15" viewBox="0 0 24 24" fill="none"
                                                                        stroke="currentColor" stroke-width="2"
                                                                        stroke-linecap="round" stroke-linejoin="round"
                                                                        class="lucide lucide-folder-down">
                                                                        <path
                                                                            d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
                                                                        <path d="M12 10v6" />
                                                                        <path d="m15 13-3 3-3-3" />
                                                                    </svg>
                                                                    <p class="text-xs text-background">1 downloadable
                                                                        resource</p>
                                                                </div>
                                                                <div class="flex items-center gap-3">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15"
                                                                        height="15" viewBox="0 0 24 24" fill="none"
                                                                        stroke="currentColor" stroke-width="2"
                                                                        stroke-linecap="round" stroke-linejoin="round"
                                                                        class="lucide lucide-smartphone text-background">
                                                                        <rect width="14" height="20" x="5" y="2" rx="2"
                                                                            ry="2" />
                                                                        <path d="M12 18h.01" />
                                                                    </svg>
                                                                    <p class="text-xs text-background">Access on mobile
                                                                        and
                                                                        TV</p>
                                                                </div>
                                                                <div class="flex items-center gap-3">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15"
                                                                        height="15" viewBox="0 0 24 24" fill="none"
                                                                        stroke="currentColor" stroke-width="2"
                                                                        stroke-linecap="round" stroke-linejoin="round"
                                                                        class="lucide lucide-infinity text-background">
                                                                        <path
                                                                            d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z" />
                                                                    </svg>
                                                                    <p class="text-xs text-background">Full lifetime
                                                                        access
                                                                    </p>
                                                                </div>
                                                                <div class="flex items-center gap-3">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15"
                                                                        height="15" viewBox="0 0 24 24" fill="none"
                                                                        stroke="currentColor" stroke-width="2"
                                                                        stroke-linecap="round" stroke-linejoin="round"
                                                                        class="lucide lucide-trophy text-background">
                                                                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                                                                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                                                                        <path d="M4 22h16" />
                                                                        <path
                                                                            d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                                                                        <path
                                                                            d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                                                                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                                                                    </svg>
                                                                    <p class="text-xs text-background">Certificate of
                                                                        completion</p>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <hr>

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


            <hr>

        </div>
        <!-- mobile -->
        <div class="mt-5 md:px-10 lg:hidden">
            <div v-if="productDetails && productDetails.length">
                <div v-for="category in productDetails" :key="category.id">
                    <div v-for="product in category.product" :key="product.id">
                        <div class="px-10">
                            <div v-for="detail in product.productDetail" :key="detail.id">
                                <!-- Display the product detail only if it matches the route param id -->
                                <div v-if="detail.id === $route.params.id">
                                    <div class="">
                                        <div class="flex items-center space-x-1">
                                            <h3 class="capitalize text-indigo-500 text-sm font-[500]">{{
                                                category.categoryName }}</h3>
                                            <div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="lucide lucide-chevron-right">
                                                    <path d="m9 18 6-6-6-6" />
                                                </svg></div>
                                            <h3 class="capitalize text-indigo-500 text-sm font-[500]">{{
                                                product.productName }}</h3>
                                        </div>
                                        <div class="mt-4">

                                            <div v-if="detail.urlLinkCopy?.length > 0">
                                                <div class="w-full ">
                                                    <div v-html="detail.urlLinkCopy" class=""></div>
                                                </div>

                                            </div>

                                            
                                            <div>
                                                <h1 class="text-[23px] md:text-[32px] font-bold my-5 line-clamp-2">
                                                    {{ detail.title }}
                                                </h1>
                                                <p v-html="detail.aboutCourse"
                                                    class="text-[18px] font-[350]  line-clamp-2">

                                                </p>
                                            </div>
                                            <div class="flex items-center mt-5 space-x-2">
                                                <div v-if="detail.isBestSeller"
                                                    class="text-sm px-2 font-bold text-[#3D3C0A] bg-yellow-300/90 p-1">
                                                    លក់ដាច់បំផុត</div>

                                                <div class="flex items-center space-x-2 text-xs">
                                                    <p class="underline">មានសិស្សរៀន
                                                    </p>
                                                    <span class="text-[14px]">{{ detail.student.length }} នាក់</span>
                                                </div>

                                            </div>
                                            <div class="mt-4 mb-10 space-y-4">
                                                <div class="text-sm">បង្រៀនដោយ <span
                                                        class="text-blue-500 underline capitalize cursor-pointer">{{
                                                            detail.lectures }}</span>
                                                </div>
                                                <div class="flex-col items-center gap-2 text-sm">
                                                    <div class="flex gap-2">
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18"
                                                                height="18" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" stroke-width="2"
                                                                stroke-linecap="round" stroke-linejoin="round"
                                                                class="lucide lucide-octagon-alert">
                                                                <path d="M12 16h.01" />
                                                                <path d="M12 8v4" />
                                                                <path
                                                                    d="M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            កាលបរិច្ឆេតចុងក្រោយ <span class="capitalize cursor-pointer">
                                                                {{ detail.createdAt ? date(detail.createdAt
                                                                    .toDate()).format('D/YYYY') : 'N/A' }}</span>
                                                        </div>

                                                    </div>
                                                    <div class="flex items-center space-x-2">

                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                            class="size-4">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                                                        </svg>

                                                        <p>English</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div>
                                        <div class="relative w-full px-2 sm:px-0">
                                            <TabGroup>
                                                <TabList class="flex p-1 space-x-1 ">
                                                    <!-- Loop through the categories array -->
                                                    <Tab v-for="category in categories" as="template"
                                                        :key="category.names" v-slot="{ selected }">
                                                        <button :class="[
                                                            'w-full py-2.5 text-sm font-medium leading-5',
                                                            'focus:outline-none',
                                                            selected
                                                                ? 'border-b-black z-[1] border-b-2 text-black '
                                                                : 'text-background hover:bg-white/[0.12] hover:text-black',
                                                        ]">
                                                            {{ category.names }}
                                                        </button>
                                                    </Tab>
                                                </TabList>

                                                <TabPanels class="mt-2 ">
                                                    <!-- Example content for each tab -->
                                                    <TabPanel>
                                                        <!-- <div class="space-y-2">
                                                            <h1 class="text-[25px] font-playfair text-black">
                                                            សិក្សាលើគេហទំព័រម៉ាស្ទ័រអាយធី
                                                            </h1>
                                                            <p class="text-background/90 text-[14px]">Get this course,
                                                                plus 12,000+ of our top-rated courses, with Personal
                                                                Plan. <span class="font-bold text-indigo-400">Learn
                                                                    more</span></p>
                                                        </div> -->
                                                        <!-- <button
                                                            class="w-full p-3 font-bold text-[16px] text-white bg-[#A435F0] mt-2 ">
                                                            ប្រឹក្សាតាមតេលេក្រាម</button>
                                                        <div class="mt-2 text-center">
                                                            <p class="text-[12px] text-background/80">Starting at $10.00
                                                                per month after trial <br>
                                                                Cancel anytime</p>
                                                        </div> -->

                                                        <!-- <div class="flex items-center justify-center gap-3">
                                                            <div class="h-[2px] w-full bg-color_text/50">

                                                            </div>
                                                            <div>
                                                                <p class="text-color_text">or</p>
                                                            </div>
                                                            <div class="h-[2px] w-full bg-color_text/50">

                                                            </div>
                                                        </div> -->
                                                        <div class="mt-0">
                                                            <h1 class="text-[19px] text-background font-bold">${{
                                                                detail.price }}</h1>
                                                            <!-- <button
                                                                class="w-full p-3 font-bold text-[16px] text-black border-[1px] border-background mt-2 ">
                                                                ប្រឹក្សាតាមឆាត</button> -->

                                                            <a href="https://t.me/masteritsystems_saleconsultant"
                                                                target="_blank" rel="noopener noreferrer">
                                                                <button
                                                                    class="w-full p-3 font-bold text-[16px] text-white bg-[#A435F0] mt-2 ">
                                                                    ប្រឹក្សាតាមតែលេក្រាម
                                                                </button>
                                                            </a>



                                                            <div class="mt-2 text-center">
                                                                <p class="text-[12px] text-background/80">
                                                                    ទំនាក់ទំនងប្រឹក្សាជាមួយគ្រូផ្ទាល់ ឬ<br>
                                                                    ចុះឈ្មោះសិក្សាតាមអនឡាញ
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <!-- <div
                                                            class="flex space-x-2 items-center text-[16px] justify-between mt-3 px-20">
                                                            <p class="underline cursor-pointer decoration-indigo-500">
                                                                Share</p>
                                                            <p class="underline cursor-pointer decoration-indigo-300">
                                                                Gift this course</p>
                                                            <p class="underline cursor-pointer decoration-indigo-300">
                                                                Apply Coupon</p>
                                                        </div> -->
                                                        <!-- 
                                                        <form action="" class="relative mt-4 ">
                                                            <input required type="text"
                                                                class="border-[1px] p-1.5 w-full  border-black outline-none placeholder:text-xs"
                                                                placeholder="Enter Coupon">
                                                            <button
                                                                class="bg-background h-[38px] px-7 text-xs text-white absolute top-0 right-0">Apply</button>
                                                        </form> -->

                                                    </TabPanel>
                                                    <!-- <TabPanel>
                                                        <div class="space-y-2">
                                                            <img src="https://www.udemy.com/staticx/udemy/images/v7/logo-ub.svg"
                                                                class="w-36" alt="">
                                                            <p class="text-background/90 text-[14px]">
                                                                Subscribe to this course and 27,000+ top-rated Udemy
                                                                courses for your organization.
                                                            </p>
                                                        </div>
                                                        <button
                                                            class="w-full p-3 font-bold text-[16px] text-white bg-[#A435F0] mt-2 ">
                                                            ប្រឹក្សាតាមតេលេក្រាម</button>
                                                    </TabPanel> -->
                                                </TabPanels>

                                                <!-- <div class="w-full absolute top-[45px] px-1">
                                                    <hr>
                                                </div> -->
                                            </TabGroup>

                                        </div>
                                    </div>


                                    <div class=" text-black my-8  border-[1px] border-background/20 px-4 pb-4">

                                        <div>
                                            <p class="mt-6 text-black  leading-6 prose prose-p:text-[14px] "
                                                v-html="detail.desctiption"></p>
                                        </div>
                                    </div>
                                    <hr>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>



<script>

import { useFirestoreCollection, useSubcollection } from '@/firebase/getArrayDocument';
import getNestedSubcollection from '@/firebase/getNestedSubcollection';
import getNestedSubSubcollection from '@/firebase/getNestedSubsubCollection';
import moment from 'moment';
import { onMounted, ref, computed } from 'vue';
import NavbarView from './NavbarView.vue';

export default {
    components: {
        NavbarView
    },
    setup() {
        const products = ref([]);
        const productDetails = ref([]);
        const currentComponents = ref("");
        const isOpenAction = ref({});
        const searchText = ref("");
        const isLoading = ref(true);
        const category = ref(null);
        const product = ref(null);
        const productDetail = ref(null);
        const date = moment;

        // Firestore Collections
        const { documents: categoryDocument, fetchCollection } = useFirestoreCollection("categories");
        onMounted(async () => {
            await fetchCollection();
            await fetchCategoryProductAndProductDetail();
        });

        const fetchCategoryProductAndProductDetail = async () => {

            const orderByField = 'productName';
            try {
                isLoading.value = true;
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
            finally {
                isLoading.value = false;
            }


        };

        const filterProductDetail = computed(() => {
            if (!searchText.value) {
                return productDetails.value;
            }

            const lowerSearch = searchText.value.toLowerCase();

            return productDetails.value.map(category => ({
                ...category,
                product: category.product.map(pro => ({
                    ...pro,
                    productDetail: pro.productDetail.filter(detail =>
                        detail.title.toLowerCase().includes(lowerSearch) ||
                        pro.productName.toLowerCase().includes(lowerSearch)
                    )
                })).filter(pro => pro.productDetail.length > 0)
            })).filter(category => category.product.length > 0);
        });


        return {
            currentComponents,
            searchText,
            products,
            filterProductDetail,
            isOpenAction,
            fetchCategoryProductAndProductDetail,
            date,
            productDetails,
            isLoading,
            category,
            product,
            productDetail,
        };
    },
};
</script>
