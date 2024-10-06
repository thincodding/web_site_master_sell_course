<template>

    <NavbarView />

    <div class="xl:w-[1200px] mx-auto  xl:mt-8 p-7 xl:p-0 select-none">

        <div v-if="isLoading" class="animate-pulse">
            <div class="h-8 xl:h-9 bg-gray-300 w-72   xl:w-[600px] mb-4"></div>
            <div v-for="n in 5" :key="n" class="mb-4 space-y-6">

                <div class="flex gap-5 mt-2">
                    <div
                        class="relative w-full overflow-hidden   h-6  before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/70  before:animate-[shimmer_1.1s_infinite]">
                        <div class="h-6 w-full  bg-gray-300"></div>
                    </div>
                </div>

                <div class="flex gap-5">
                    <div
                        class="relative w-full overflow-hidden   h-4  before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/70  before:animate-[shimmer_1.1s_infinite]">
                        <div class="h-6 w-full  bg-gray-300"></div>
                    </div>
                </div>

                <div class="flex gap-5 mt-2">
                    <div
                        class="relative w-full overflow-hidden   h-6  before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/70  before:animate-[shimmer_1.1s_infinite]">
                        <div class="h-6 w-full  bg-gray-300"></div>
                    </div>
                </div>



            </div>
        </div>

        <div v-else>
            <div v-for="cat in productDetails" :key="cat.id" class="mb-5">
                <div v-for="pro in cat.product" :key="pro.id" class="mb-2">
                    <h1 class="text-[24px] lg:text-[32px] font-playfair font-[500] text-background md:text-[32px]">{{
                        pro.productName }} Course</h1>
                    <p class="text-[14px] md:text-[16px] lg:text-[15px] text-color_text mt-2">{{ pro.productName }}
                        relates to <span
                            class="text-indigo-600 cursor-pointer font-bold hover:text-indigo-800">Development,</span>
                        <span class="text-indigo-600 cursor-pointer font-bold hover:text-indigo-800">IT &
                            Software</span>
                    </p>
                    <div v-for="detail in pro.productDetail" :key="detail.id" class="space-y-3">

                    </div>
                    <div class=" text-[14px] flex items-center text-background space-x-1 mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-users text-background">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        <p>3000,400 Learners</p>
                    </div>
                    <div class="mt-5 xl:mt-10 space-y-1">
                        <h3 class="font-bold text-[22px] text-background">Courses to get you started</h3>
                        <p class="text-[15px] text-color_text">Explore courses from experienced, real-world experts.</p>
                    </div>

                    <!-- md up -->
                    <div class="w-full relative mt-4 hidden md:block">
                        <TabGroup>
                            <TabList class="flex space-x-5  p-1">
                                <Tab v-for="(category, idx) in categories" :key="idx" as="template"
                                    v-slot="{ selected }">
                                    <button :class="[
                                        'py-2.5 text-sm leading-5 font-bold',
                                        selected ? 'bg-white text-background border-b-2 border-b-black font-bold outline-none z-[2]' : 'text-color_text hover:text-black font-bold ',
                                    ]">
                                        {{ category.names }}
                                    </button>

                                </Tab>


                            </TabList>

                            <!--Most Popular  -->
                            <TabPanels class="mt-3">
                                <TabPanel v-for="category in productDetails" :key="category.id"
                                    class="relative select-none">
                                    <div v-for="product in category.product" :key="product.id">
                                        <swiper ref="mySwiper" :navigation="{
                                            nextEl: '.button-next-slide',
                                            prevEl: '.button-pre-slide'
                                        }" :loop="false" :modules="modules" :allowTouchMove="true"
                                            :slides-per-group="3" :speed="1000" :breakpoints="{
                                                '540': {
                                                    slidesPerView: 2,
                                                    spaceBetween: 15,
                                                },
                                                '640': {
                                                    slidesPerView: 2,
                                                    spaceBetween: 15,
                                                },
                                                '768': {
                                                    slidesPerView: 3,
                                                    spaceBetween: 15,
                                                },
                                                '1024': {
                                                    slidesPerView: 4,
                                                    spaceBetween: 15,
                                                },
                                                '1200': {
                                                    slidesPerView: 4,
                                                    spaceBetween: 15,
                                                },
                                            }" class="mySwiper relative xl:w-[1200px]"
                                            @reachEnd="showNextButton = false" @reachBeginning="showPrevButton = false"
                                            @fromEdge="onSlideChange">
                                            <swiper-slide
                                                v-for="detail in product.productDetail.filter(detail => detail.show_spacial === 'Most Popular')"
                                                :key="detail.id">
                                                <div class="border-[1px]">
                                                    <img :src="detail.imageUrl" alt=""
                                                        class="w-full h-40 object-contain" />

                                                </div>
                                                <div class="mt-2 space-y-1">
                                                    <router-link
                                                        :to="{ name: 'courseDetail', params: { id: detail.id } }" target="_blank" rel="noopener noreferrer"
                                                        class="text-[14px] font-semibold line-clamp-2 cursor-pointer">
                                                        {{
                                                            detail.title }}</router-link>
                                                    <p class="text-gray-500 text-[12px] line-clamp-1">{{ detail.lectures
                                                        }}</p>
                                                    <div class="flex space-x-[2px] items-center">

                                                        <p class="text-xs">5.0</p>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                            class="size-3 text-orange-700">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                        </svg>

                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                            class="size-3 text-orange-700">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                            class="size-3 text-orange-700">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                            class="size-3 text-orange-700">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                            class="size-3">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                        </svg>
                                                        <p class="text-xs">(2)</p>
                                                    </div>
                                                </div>
                                                <div class="mt-1">
                                                    <h1 class="text-md font-bold">${{ detail.price }}.99</h1>
                                                </div>
                                            </swiper-slide>
                                        </swiper>

                                        <div :class="showPrevButton ? 'block' : 'hidden'"
                                            class="button-pre-slide cursor-pointer rounded-full text-white absolute top-[20%] -left-5 z-[2]">
                                            <div class="flex justify-center w-10 h-10 border-gray-500 border-[1px] items-center bg-background rounded-full hover:bg-background/90"
                                                @click="prevSlide">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor" class="size-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M15.75 19.5 8.25 12l7.5-7.5" />
                                                </svg>
                                            </div>
                                        </div>

                                        <div :class="showNextButton ? 'block' : 'hidden'"
                                            class="button-next-slide cursor-pointer rounded-full text-white absolute top-[20%] -right-5 z-[2]">
                                            <div class="flex justify-center w-10 h-10 border-gray-500 border-[1px] items-center bg-background rounded-full hover:bg-background/90"
                                                @click="nextSlide">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor" class="size-5 font-bold">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                            </TabPanels>

                            <!--New   -->
                            <TabPanels class="mt-3">
                                <TabPanel v-for="category in productDetails" :key="category.id"
                                    class="relative select-none">
                                    <div v-for="product in category.product" :key="product.id">
                                        <swiper ref="mySwiper" :navigation="{
                                            nextEl: '.button-next-slide',
                                            prevEl: '.button-pre-slide'
                                        }" :loop="false" :modules="modules" :allowTouchMove="true"
                                            :slides-per-group="3" :speed="1000" :breakpoints="{
                                                '540': {
                                                    slidesPerView: 2,
                                                    spaceBetween: 15,
                                                },
                                                '640': {
                                                    slidesPerView: 2,
                                                    spaceBetween: 15,
                                                },
                                                '768': {
                                                    slidesPerView: 3,
                                                    spaceBetween: 15,
                                                },
                                                '1024': {
                                                    slidesPerView: 4,
                                                    spaceBetween: 15,
                                                },
                                                '1200': {
                                                    slidesPerView: 4,
                                                    spaceBetween: 15,
                                                },
                                            }" class="mySwiper relative xl:w-[1200px]"
                                            @reachEnd="showNextButton = false" @reachBeginning="showPrevButton = false"
                                            @fromEdge="onSlideChange">
                                            <swiper-slide
                                                v-for="detail in product.productDetail.filter(detail => detail.show_spacial === 'New')"
                                                :key="detail.id">
                                                <div class="border-[1px]">
                                                    <img :src="detail.imageUrl" alt=""
                                                        class="w-full h-40 object-contain" />

                                                </div>
                                                <div class="mt-2 space-y-1">
                                                    <router-link
                                                        :to="{ name: 'courseDetail', params: { id: detail.id } }"
                                                        class="text-[14px] font-semibold line-clamp-2 cursor-pointer">
                                                        {{
                                                            detail.title }}</router-link>
                                                    <p class="text-gray-500 text-[12px] line-clamp-1">{{ detail.lectures
                                                        }}</p>
                                                    <div class="flex space-x-[2px] items-center">

                                                        <p class="text-xs">5.0</p>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                            class="size-3 text-orange-700">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                        </svg>

                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                            class="size-3 text-orange-700">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                            class="size-3 text-orange-700">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                            class="size-3 text-orange-700">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                            class="size-3">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                        </svg>
                                                        <p class="text-xs">(2)</p>
                                                    </div>
                                                </div>
                                                <div class="mt-1">
                                                    <h1 class="text-md font-bold">${{ detail.price }}.99</h1>
                                                </div>
                                            </swiper-slide>
                                        </swiper>

                                        <div :class="showPrevButton ? 'block' : 'hidden'"
                                            class="button-pre-slide cursor-pointer rounded-full text-white absolute top-[20%] -left-5 z-[2]">
                                            <div class="flex justify-center w-10 h-10 border-gray-500 border-[1px] items-center bg-background rounded-full hover:bg-background/90"
                                                @click="prevSlide">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor" class="size-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M15.75 19.5 8.25 12l7.5-7.5" />
                                                </svg>
                                            </div>
                                        </div>

                                        <div :class="showNextButton ? 'block' : 'hidden'"
                                            class="button-next-slide cursor-pointer rounded-full text-white absolute top-[20%] -right-5 z-[2]">
                                            <div class="flex justify-center w-10 h-10 border-gray-500 border-[1px] items-center bg-background rounded-full hover:bg-background/90"
                                                @click="nextSlide">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor" class="size-5 font-bold">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                            </TabPanels>

                            <!--Beginer Favorite   -->
                            <TabPanels class="mt-3">
                                <TabPanel v-for="category in productDetails" :key="category.id"
                                    class="relative select-none">
                                    <div v-for="product in category.product" :key="product.id">
                                        <swiper ref="mySwiper" :navigation="{
                                            nextEl: '.button-next-slide',
                                            prevEl: '.button-pre-slide'
                                        }" :loop="false" :modules="modules" :allowTouchMove="true"
                                            :slides-per-group="3" :speed="1000" :breakpoints="{
                                                '540': {
                                                    slidesPerView: 2,
                                                    spaceBetween: 15,
                                                },
                                                '640': {
                                                    slidesPerView: 2,
                                                    spaceBetween: 15,
                                                },
                                                '768': {
                                                    slidesPerView: 3,
                                                    spaceBetween: 15,
                                                },
                                                '1024': {
                                                    slidesPerView: 4,
                                                    spaceBetween: 15,
                                                },
                                                '1200': {
                                                    slidesPerView: 4,
                                                    spaceBetween: 15,
                                                },
                                            }" class="mySwiper relative xl:w-[1200px]"
                                            @reachEnd="showNextButton = false" @reachBeginning="showPrevButton = false"
                                            @fromEdge="onSlideChange">
                                            <swiper-slide
                                                v-for="detail in product.productDetail.filter(detail => detail.show_spacial === 'Beginer Favorites')"
                                                :key="detail.id">
                                                <div class="border-[1px]">
                                                    <img :src="detail.imageUrl" alt=""
                                                        class="w-full h-40 object-contain" />
                                                </div>
                                                <div class="mt-2 space-y-1">
                                                    <router-link
                                                        :to="{ name: 'courseDetail', params: { id: detail.id } }"
                                                        class="text-[14px] font-semibold line-clamp-2 cursor-pointer">
                                                        {{
                                                            detail.title }}</router-link>
                                                    <p class="text-gray-500 text-[12px] line-clamp-1">{{ detail.lectures
                                                        }}</p>
                                                    <div class="flex space-x-[2px] items-center">

                                                        <p class="text-xs">5.0</p>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                            class="size-3 text-orange-700">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                        </svg>

                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                            class="size-3 text-orange-700">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                            class="size-3 text-orange-700">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                            class="size-3 text-orange-700">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                            class="size-3">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                        </svg>
                                                        <p class="text-xs">(2)</p>
                                                    </div>
                                                </div>
                                                <div class="mt-1">
                                                    <h1 class="text-md font-bold">${{ detail.price }}.99</h1>
                                                </div>
                                            </swiper-slide>
                                        </swiper>

                                        <div :class="showPrevButton ? 'block' : 'hidden'"
                                            class="button-pre-slide cursor-pointer rounded-full text-white absolute top-[20%] -left-5 z-[2]">
                                            <div class="flex justify-center w-10 h-10 border-gray-500 border-[1px] items-center bg-background rounded-full hover:bg-background/90"
                                                @click="prevSlide">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor" class="size-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M15.75 19.5 8.25 12l7.5-7.5" />
                                                </svg>
                                            </div>
                                        </div>

                                        <div :class="showNextButton ? 'block' : 'hidden'"
                                            class="button-next-slide cursor-pointer rounded-full text-white absolute top-[20%] -right-5 z-[2]">
                                            <div class="flex justify-center w-10 h-10 border-gray-500 border-[1px] items-center bg-background rounded-full hover:bg-background/90"
                                                @click="nextSlide">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor" class="size-5 font-bold">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                            </TabPanels>

                            <div class="w-full absolute top-[45px] px-1">
                                <hr>
                            </div>
                        </TabGroup>


                    </div>




                    <!-- Dropdown Menu Most Popular -->
                    <div class="md:hidden">
                        <div>
                            <!-- Menu Button -->
                            <div @click="handleIsOpenDropdownProduct('Most Popular')" :class="{
                                ' text-background': isOpenDropdownProduct === 'Most Popular',
                                'hover:text-white': !isOpenDropdownProduct === 'Most Popular'
                            }"
                                class="cursor-pointer flex items-center justify-between  border-t-[1px] border-t-gray-300 pt-3 mt-4">

                                <p class="font-NotoSansKhmer text-[14px] font-bold font select-none ">
                                    {{ most_pupular }}
                                </p>
                                <svg :class="!isOpenDropdownProduct ? ' transition-all duration-300 ease-in-out' : '-rotate-180 transition-all duration-300 ease-in-out'"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="size-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>

                        </div>
                        <div class="border-b-[1px] border-b-gray-300 pt-3 sm:pb-2">
                            <div :class="dropdownClassesProduct"
                                class="bg-white transition-[height] duration-500 ease-in-out overflow-hidden ">
                                <div class="flex-col flex text-[18px] select-none  ">
                                    <div v-for="category in productDetails" :key="category.id"
                                        class="relative select-none">
                                        <div v-for="product in category.product" :key="product.id">
                                            <swiper ref="mySwiper" :navigation="{
                                                nextEl: '.button-next-slide',
                                                prevEl: '.button-pre-slide'
                                            }" :spaceBetween="10" :slidesPerView="'auto'" :breakpoints="{
                                                '540': {
                                                    slidesPerView: 2,
                                                    spaceBetween: 20,
                                                },
                                                '768': {
                                                    slidesPerView: 4,
                                                    spaceBetween: 40,
                                                },

                                            }" :loop="false" :modules="modules" :allowTouchMove="true" :speed="1000"
                                                class="mySwiper relative xl:w-[1200px]">
                                                <swiper-slide
                                                    v-for="detail in product.productDetail.filter(detail => detail.show_spacial === 'Most Popular')"
                                                    :key="detail.id">
                                                    <div class="border-[1px]">
                                                        <img :src="detail.imageUrl" alt=""
                                                            class="w-full h-48 object-cover" />

                                                    </div>
                                                    <div class="mt-2 space-y-1">
                                                        <router-link
                                                        :to="{ name: 'courseDetail', params: { id: detail.id } }"
                                                        class="text-[14px] font-semibold line-clamp-2 cursor-pointer">
                                                        {{
                                                            detail.title }}</router-link>
                                                        <p class="text-gray-500 text-[12px] line-clamp-1">{{
                                                            detail.lectures }}</p>
                                                        <div class="flex space-x-[2px] items-center">

                                                            <p class="text-xs">5.0</p>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1.5"
                                                                stroke="currentColor" class="size-3 text-orange-700">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                            </svg>

                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1.5"
                                                                stroke="currentColor" class="size-3 text-orange-700">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                            </svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1.5"
                                                                stroke="currentColor" class="size-3 text-orange-700">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                            </svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1.5"
                                                                stroke="currentColor" class="size-3 text-orange-700">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                            </svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1.5"
                                                                stroke="currentColor" class="size-3">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                            </svg>
                                                            <p class="text-xs">(2)</p>
                                                        </div>
                                                    </div>
                                                    <div class="mt-1">
                                                        <h1 class="text-[15px] font-bold">${{ detail.price }}.99</h1>
                                                    </div>
                                                </swiper-slide>
                                            </swiper>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Dropdown Menu  New -->
                    <div class="md:hidden">
                        <div>
                            <!-- Menu Button -->
                            <div @click="handleIsOpenDropdownNew('New')" :class="{
                                ' text-background': isOpentDrodownNewLession === 'New',
                                'hover:text-white': !isOpentDrodownNewLession === 'New'
                            }" class="cursor-pointer flex items-center justify-between   border-t-gray-300  mt-4">

                                <p class="font-NotoSansKhmer text-[14px] font-bold font select-none ">
                                    {{ New }}
                                </p>
                                <svg :class="!isOpentDrodownNewLession ? ' transition-all duration-300 ease-in-out' : '-rotate-180 transition-all duration-300 ease-in-out'"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="size-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>

                        </div>
                        <div class="border-b-[1px] border-b-gray-300 pt-3 sm:pb-2">
                            <div :class="dropdownClassesNew"
                                class="bg-white transition-[height] duration-500 ease-in-out overflow-hidden ">
                                <div class="flex-col flex text-[18px] select-none  ">
                                    <div v-for="category in productDetails" :key="category.id"
                                        class="relative select-none">
                                        <div v-for="product in category.product" :key="product.id">
                                            <swiper ref="mySwiper" :navigation="{
                                                nextEl: '.button-next-slide',
                                                prevEl: '.button-pre-slide'
                                            }" :spaceBetween="10" :slidesPerView="'auto'" :breakpoints="{
                                                '540': {
                                                    slidesPerView: 2,
                                                    spaceBetween: 20,
                                                },
                                                '768': {
                                                    slidesPerView: 4,
                                                    spaceBetween: 40,
                                                },

                                            }" :loop="false" :modules="modules" :allowTouchMove="true" :speed="1000"
                                                class="mySwiper relative xl:w-[1200px]">
                                                <swiper-slide
                                                    v-for="detail in product.productDetail.filter(detail => detail.show_spacial === 'New')"
                                                    :key="detail.id">
                                                    <div class="border-[1px]">
                                                        <img :src="detail.imageUrl" alt=""
                                                            class="w-full h-48 object-cover" />

                                                    </div>
                                                    <div class="mt-2 space-y-1">
                                                        <router-link
                                                        :to="{ name: 'courseDetail', params: { id: detail.id } }"
                                                        class="text-[14px] font-semibold line-clamp-2 cursor-pointer">
                                                        {{
                                                            detail.title }}</router-link>
                                                        <p class="text-gray-500 text-[12px] line-clamp-1">{{
                                                            detail.lectures }}</p>
                                                        <div class="flex space-x-[2px] items-center">

                                                            <p class="text-xs">5.0</p>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1.5"
                                                                stroke="currentColor" class="size-3 text-orange-700">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                            </svg>

                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1.5"
                                                                stroke="currentColor" class="size-3 text-orange-700">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                            </svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1.5"
                                                                stroke="currentColor" class="size-3 text-orange-700">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                            </svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1.5"
                                                                stroke="currentColor" class="size-3 text-orange-700">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                            </svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1.5"
                                                                stroke="currentColor" class="size-3">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                            </svg>
                                                            <p class="text-xs">(2)</p>
                                                        </div>
                                                    </div>
                                                    <div class="mt-1">
                                                        <h1 class="text-[15px] font-bold">${{ detail.price }}.99</h1>
                                                    </div>
                                                </swiper-slide>
                                            </swiper>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Dropdown Menu  Favorite -->
                    <div class="md:hidden">
                        <div>
                            <!-- Menu Button -->
                            <div @click="handleIsOpenDropdownBeginer('Beginer Favorites')" :class="{
                                ' text-background': isOpenDropdownFavorite === 'Beginer Favorites',
                                'hover:text-white': !isOpenDropdownFavorite === 'Beginer Favorites'
                            }" class="cursor-pointer flex items-center justify-between   border-t-gray-300  mt-4">

                                <p class="font-NotoSansKhmer text-[14px] font-bold font select-none ">
                                    {{ Beginer_favorite }}
                                </p>
                                <svg :class="!isOpenDropdownFavorite ? ' transition-all duration-300 ease-in-out' : '-rotate-180 transition-all duration-300 ease-in-out'"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="size-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>

                        </div>
                        <div class="border-b-[1px] border-b-gray-300 pt-3 sm:pb-2">
                            <div :class="dropdownClassesBeginer"
                                class="bg-white transition-[height] duration-500 ease-in-out overflow-hidden ">
                                <div class="flex-col flex text-[18px] select-none  ">
                                    <div v-for="category in productDetails" :key="category.id"
                                        class="relative select-none">
                                        <div v-for="product in category.product" :key="product.id">
                                            <swiper ref="mySwiper" :navigation="{
                                                nextEl: '.button-next-slide',
                                                prevEl: '.button-pre-slide'
                                            }" :spaceBetween="10" :slidesPerView="'auto'" :breakpoints="{
                                                '540': {
                                                    slidesPerView: 2,
                                                    spaceBetween: 20,
                                                },
                                                '768': {
                                                    slidesPerView: 4,
                                                    spaceBetween: 40,
                                                },

                                            }" :loop="false" :modules="modules" :allowTouchMove="true" :speed="1000"
                                                class="mySwiper relative xl:w-[1200px]">
                                                <swiper-slide
                                                    v-for="detail in product.productDetail.filter(detail => detail.show_spacial === 'Beginer Favorites')"
                                                    :key="detail.id">
                                                    <div class="border-[1px]">
                                                        <img :src="detail.imageUrl" alt=""
                                                            class="w-full h-48 object-cover" />

                                                    </div>
                                                    <div class="mt-2 space-y-1">
                                                        <router-link
                                                        :to="{ name: 'courseDetail', params: { id: detail.id } }"
                                                        class="text-[14px] font-semibold line-clamp-2 cursor-pointer">
                                                        {{
                                                            detail.title }}</router-link>
                                                        <p class="text-gray-500 text-[12px] line-clamp-1">{{
                                                            detail.lectures }}</p>
                                                        <div class="flex space-x-[2px] items-center">

                                                            <p class="text-xs">5.0</p>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1.5"
                                                                stroke="currentColor" class="size-3 text-orange-700">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                            </svg>

                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1.5"
                                                                stroke="currentColor" class="size-3 text-orange-700">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                            </svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1.5"
                                                                stroke="currentColor" class="size-3 text-orange-700">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                            </svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1.5"
                                                                stroke="currentColor" class="size-3 text-orange-700">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                            </svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1.5"
                                                                stroke="currentColor" class="size-3">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                            </svg>
                                                            <p class="text-xs">(2)</p>
                                                        </div>
                                                    </div>
                                                    <div class="mt-1">
                                                        <h1 class="text-[15px] font-bold">${{ detail.price }}.99</h1>
                                                    </div>
                                                </swiper-slide>
                                            </swiper>
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
</template>

<script>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import NavbarView from '@/views/NavbarView.vue';
import { useFirestoreCollection, useSubcollection } from '@/firebase/getArrayDocument';
import getNestedSubcollection from '@/firebase/getNestedSubcollection';
import moment from 'moment';
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';

export default {
    components: {
        NavbarView,
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
        const productDetails = ref([]);
        const isLoading = ref(false);
        const category = ref(null);
        const product = ref(null);
        const productDetail = ref([]);
        const date = moment;
        const route = useRoute();

        const showNextButton = ref(true)
        const showPrevButton = ref(false)
        const isOpenDropdown = ref(false)
        const isOpenDropdownProduct = ref(false)
        const isOpenDrop = ref(false);
        const isOpenNav = ref(true);
        const isOpentDrodownNewLession = ref(false)
        const isOpenDropdownFavorite = ref(false)

        const { documents: categoryDocument, fetchCollection } = useFirestoreCollection("categories");
        const most_pupular = "Most Popular";
        const New = "New";
        const Beginer_favorite = "Beginer Favorites"


        onMounted(async () => {
            await fetchCollection();
            await fetchCategoryProductAndProductDetail();
        });


        //most popular
        const dropdownClassesProduct = computed(() => ({
            'h-80': isOpenDropdownProduct.value,
            'h-0': !isOpenDropdownProduct.value,
        }));

        const handleIsOpenDropdownProduct = (most_pupular) => {
            isOpenDropdownProduct.value = isOpenDropdownProduct.value === most_pupular ? null : most_pupular;
        }


        //new 
        const dropdownClassesNew = computed(() => ({
            'h-80': isOpentDrodownNewLession.value,
            'h-0': !isOpentDrodownNewLession.value,
        }));


        const handleIsOpenDropdownNew = (news) => {
            isOpentDrodownNewLession.value = isOpentDrodownNewLession.value === news ? null : news;
        }

        //beginner_favorite

        const dropdownClassesBeginer = computed(() => ({
            'h-80': isOpenDropdownFavorite.value,
            'h-0': !isOpenDropdownFavorite.value,
        }));

        const handleIsOpenDropdownBeginer = (beginer) => {
            isOpenDropdownFavorite.value = isOpenDropdownFavorite.value === beginer ? null : beginer;
        }

        const categories = ref([
            { names: 'Most Popular' },
            { names: 'New' },
            { names: 'Beginner Favorites' }
        ]);

        const onSlideChange = (swiper) => {
            showPrevButton.value = !swiper.isBeginning;
            showNextButton.value = !swiper.isEnd;

        }

        const fetchCategoryProductAndProductDetail = async () => {
            isLoading.value = true;
            const categoryProduct = [];
            const orderByField = 'productName';

            const fetchPromises = categoryDocument.value.map(async (cate) => {
                const { subcollectionData: products, fetchSubcollection } = useSubcollection('categories', cate.id, 'product', orderByField);
                await fetchSubcollection();

                const productArray = products.value.filter(pro => pro.id === route.params.id).map(async (pro) => {
                    const { subcollectionData: productDetail, fetchSubcollections } = getNestedSubcollection(
                        'categories',
                        cate.id,
                        'product',
                        pro.id,
                        'productDetail',
                    );

                    try {
                        await fetchSubcollections();
                        return {
                            ...pro,
                            productDetail: productDetail.value
                        };
                    } catch (err) {
                        console.error(`Error processing product ${pro.id}:`, err);
                        return null; // Return null if there's an error
                    }
                });

                const fetchedProducts = await Promise.all(productArray);
                const validProducts = fetchedProducts.filter(p => p !== null);
                if (validProducts.length) {
                    categoryProduct.push({
                        id: cate.id,
                        categoryName: cate.categoryName,
                        description: cate.description,
                        image: cate.image,
                        product: validProducts
                    });
                }
            });

            await Promise.all(fetchPromises);
            isLoading.value = false;
            productDetails.value = categoryProduct;
        }


        return {
            products,
            fetchCategoryProductAndProductDetail,
            date,
            productDetails,
            isLoading,
            category,
            product,
            productDetail,
            categories,
            modules: [Navigation],
            showNextButton,
            showPrevButton,
            onSlideChange,

            most_pupular,
            isOpenNav,
            isOpenDrop,
            isOpenDropdown,
            handleIsOpenDropdownProduct,
            dropdownClassesProduct,
            isOpenDropdownProduct,
            New,
            dropdownClassesNew,
            handleIsOpenDropdownNew,
           
            isOpentDrodownNewLession,
            Beginer_favorite,
            isOpenDropdownFavorite,
            dropdownClassesBeginer,
            handleIsOpenDropdownBeginer
        };
    },
};
</script>

<style scoped></style>