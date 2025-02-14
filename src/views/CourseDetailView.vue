<template>
    <div>
        <NavbarView />

        <div class="mx-auto mb-auto">
            <div v-if="isLoading" class="animate-pulse p-5 md:mt-3 lg:mt-10 xl:w-[90%] mx-auto md:p-5">
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



            <div v-else class="hidden lg:block">
                <div class="hidden p-5 bg-background lg:block">
                    <div class="xl:w-[90%] h-[350px] mx-auto  my-2  gap-10">

                        <div class="flex justify-between gap-2 ">

                            <div v-if="productDetails && productDetails.length">
                                <div v-for="category in productDetails" :key="category.id">

                                    <div v-for="product in category.product" :key="product.id">
                                        <div class="px-4">
                                            <div v-for="detail in product.productDetail" :key="detail.id">

                                                <!-- Display the product detail only if it matches the route param id -->
                                                <div v-if="detail.id === $route.params.id">

                                                    <div class="text-white">
                                                        <div class="flex items-center space-x-1">
                                                            <h3
                                                                class="capitalize text-indigo-300/90 text-sm font-[500]">
                                                                {{
                                                                    category.categoryName }}</h3>
                                                            <div><svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                                    height="16" viewBox="0 0 24 24" fill="none"
                                                                    stroke="currentColor" stroke-width="2"
                                                                    stroke-linecap="round" stroke-linejoin="round"
                                                                    class="lucide lucide-chevron-right">
                                                                    <path d="m9 18 6-6-6-6" />
                                                                </svg></div>
                                                            <h3
                                                                class="capitalize text-indigo-300/90 text-sm font-[500] font-NotoSansKhmer">
                                                                {{
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

                                                                    {{ $t('bestSeller') }}
                                                                </div>


                                                                <div v-if="detail.student.length > 0"
                                                                    class="flex items-center space-x-2 text-xs">
                                                                    <p class="text-indigo-300 underline">
                                                                    </p>
                                                                    <span class="text-sm">{{ detail.student.length
                                                                        }}
                                                                        {{ $t('people') }}</span>
                                                                </div>

                                                            </div>
                                                            <div class="mt-4 mb-10 space-y-4">
                                                                <div class="text-sm">{{ $t('lectures') }} <span
                                                                        class="text-indigo-300 underline capitalize cursor-pointer">{{
                                                                            detail.lectures }}</span>
                                                                </div>
                                                                <div class="flex items-center gap-2 text-sm">
                                                                    <div>
                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                            width="18" height="18" viewBox="0 0 24 24"
                                                                            fill="none" stroke="currentColor"
                                                                            stroke-width="2" stroke-linecap="round"
                                                                            stroke-linejoin="round"
                                                                            class="lucide lucide-octagon-alert">
                                                                            <path d="M12 16h.01" />
                                                                            <path d="M12 8v4" />
                                                                            <path
                                                                                d="M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z" />
                                                                        </svg>
                                                                    </div>
                                                                    <div>
                                                                        {{ $t('lastDate') }} <span
                                                                            class="capitalize cursor-pointer">
                                                                            {{ detail.createdAt ? date(detail.createdAt
                                                                                .toDate()).format('D/YYYY') : 'N/A'
                                                                            }}</span>
                                                                    </div>

                                                                    <!-- <div class="flex items-center space-x-2">

                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                            fill="none" viewBox="0 0 24 24"
                                                                            stroke-width="1.5" stroke="currentColor"
                                                                            class="size-4">
                                                                            <path stroke-linecap="round"
                                                                                stroke-linejoin="round"
                                                                                d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                                                                        </svg>

                                                                        <p>English</p>
                                                                    </div> -->
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

                            <div v-if="productDetails && productDetails.length">
                                <div v-for="category in productDetails" :key="category.id">
                                    <div v-for="product in category.product" :key="product.id">
                                        <div class="">
                                            <div v-for="detail in product.productDetail" :key="detail.id">
                                                <!-- Display the product detail only if it matches the route param id -->


                                                <div v-if="detail.id === $route.params.id">
                                                    <div class="w-[300px]  bg-white shadow-md mr-16 ">
                                                        <div v-if="detail.introVideoLink?.length > 0">

                                                            <iframe
                                                                v-if="detail.introVideoLink && getVideoEmbedLink(detail.introVideoLink)"
                                                                :src="getVideoEmbedLink(detail.introVideoLink)"
                                                                frameborder="0" allow="autoplay; encrypted-media"
                                                                allowfullscreen class="w-full h-[200px]"></iframe>

                                                            <video
                                                                v-else-if="detail.introVideoLink && /\.(mp4|webm|ogg|m4v)$/i.test(detail.introVideoLink)"
                                                                :src="detail.introVideoLink" controls
                                                                class="w-full h-[200px]"></video>

                                                            <img v-else class="w-[400px]"
                                                                src="https://fakeimg.pl/200x200/" alt="">
                                                        </div>
                                                        <div v-else>
                                                            <!-- {{ detail.introVideoLink }} -->
                                                            <img class="w-full border"
                                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9cSGzVkaZvJD5722MU5A-JJt_T5JMZzotcw&s"
                                                                alt="">
                                                        </div>
                                                        <div class="p-5">
                                                            <h3 v-if="detail.price === 0"
                                                                class="font-bold text-[32px]  text-green-600">
                                                                {{ $t('freeCourse') }}
                                                            </h3>
                                                            <h3 v-else class="font-bold text-[32px] text-background">${{
                                                                detail.price
                                                                }}</h3>
                                                            <div v-if="detail.price !== 0" class="mt-2 space-y-2">
                                                                <router-link :to="{ name: 'advisorRegister' }">
                                                                    <button
                                                                        class="w-full p-3 font-bold text-[16px] text-white bg-black mt-2 ">
                                                                        {{ $t('addToCart') }}
                                                                    </button>
                                                                </router-link>
                                                                <!-- <button
                                                                    class="border-[1px] border-black p-2.5 w-full font-bold hover:bg-background/10">
                                                                    {{$t('consult')}}</button> -->

                                                                <!-- <div>
                                                                    <a href="https://t.me/masteritsystems_saleconsultant"
                                                                        class="mt-3" target="_blank"
                                                                        rel="noopener noreferrer">
                                                                        <button
                                                                            class="border-[1px] border-black p-2.5 w-full font-bold hover:bg-background/10">
                                                                            {{$t('consult')}}
                                                                        </button>
                                                                    </a>
                                                                </div> -->

                                                                <div class="mt-2 text-center">
                                                                    <a :href="`/advisorRegister/${detail.id}`"
                                                                        class="text-[12px] text-background/80 hover:underline">
                                                                        {{ $t('constant') }}
                                                                    </a>
                                                                </div>


                                                            </div>

                                                            <div class="mt-5">
                                                                <!-- <p class="text-sm font-bold">This course includes:</p> -->
                                                                <div class="mt-2 space-y-4">

                                                                    <p v-html="detail.lessionBreif" class="space-y-1">
                                                                    </p>
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


                <!-- tab detail -->
                <div v-if="productDetails && productDetails.length">
                    <div v-for="category in productDetails" :key="category.id">

                        <div v-for="product in category.product" :key="product.id">

                            <div class="px-10 ">
                                <div v-for="detail in product.productDetail" :key="detail.id">
                                    <!-- Display the product detail only if it matches the route param id -->
                                    <div v-if="detail.id === $route.params.id">


                                        <div
                                            class=" text-black  top-[21rem] border-background/20 md:w-[50%] lg:w-[58%] xl:w-[60%] xl:ml-14  p-4 my-10 ">

                                            <div class="">
                                                <div class="grid lg:grid-cols-4 xl:grid-cols-6">
                                                    <div v-if="detail.aboutLessionList?.title"
                                                        @click="handleShowAboutLessionDes(detail.aboutLessionList?.title)"
                                                        :class="{
                                                            'bg-gray-600': displyDesctiptionList === detail.aboutLessionList?.title,
                                                            'bg-background hover:bg-gray-600': displyDesctiptionList !== detail.aboutLessionList?.title,
                                                        }"
                                                        class="p-4 text-center border-r-[1px] border-gray-500 text-white cursor-pointer font-NotoSansKhmer transition duration-300 text-[14px] xl:text-[16px]">
                                                        {{ detail.aboutLessionList?.title }}
                                                    </div>
                                                    <div v-if="detail.conetent?.title"
                                                        @click="handleShowAboutLessionDes(detail.conetent?.title)"
                                                        :class="{
                                                            'bg-gray-600': displyDesctiptionList === detail.conetent?.title,
                                                            'bg-background hover:bg-gray-600': displyDesctiptionList !== detail.conetent?.title,
                                                        }"
                                                        class="p-4 text-center border-r-[1px] border-gray-500 text-white cursor-pointer font-NotoSansKhmer transition duration-300 text-[14px] xl:text-[16px]">
                                                        {{ detail.conetent?.title }}
                                                    </div>



                                                    <div v-if="detail.lessionVideo?.title"
                                                        @click="handleShowAboutLessionDes(detail.lessionVideo?.title)"
                                                        :class="{
                                                            'bg-gray-600': displyDesctiptionList === detail.lessionVideo?.title,
                                                            'bg-background hover:bg-gray-600': displyDesctiptionList !== detail.lessionVideo?.title,
                                                        }"
                                                        class="p-4 text-center border-r-[1px] border-gray-500 text-white cursor-pointer font-NotoSansKhmer transition duration-300 text-[14px] xl:text-[16px]">
                                                        {{ detail.lessionVideo?.title }}
                                                    </div>
                                                    <div v-if="detail.achievment?.title"
                                                        @click="handleShowAboutLessionDes(detail.achievment?.title)"
                                                        :class="{
                                                            'bg-gray-600': displyDesctiptionList === detail.achievment?.title,
                                                            'bg-background hover:bg-gray-600': displyDesctiptionList !== detail.achievment?.title,
                                                        }"
                                                        class="p-4 text-center border-r-[1px] border-gray-500 text-white cursor-pointer font-NotoSansKhmer transition duration-300 text-[14px] xl:text-[16px]">
                                                        {{ detail.achievment?.title }}
                                                    </div>
                                                    <div v-if="detail.studentComment?.title"
                                                        @click="handleShowAboutLessionDes(detail.studentComment?.title)"
                                                        :class="{
                                                            'bg-gray-600': displyDesctiptionList === detail.studentComment?.title,
                                                            'bg-background hover:bg-gray-600': displyDesctiptionList !== detail.studentComment?.title,
                                                        }"
                                                        class="p-4 text-center border-t  border-r-[1px] border-gray-500 text-white cursor-pointer font-NotoSansKhmer transition duration-300 text-[14px] xl:text-[16px]">
                                                        {{ detail.studentComment?.title }}
                                                    </div>
                                                    <div v-if="detail.studyMethod?.title"
                                                        @click="handleShowAboutLessionDes(detail.studyMethod?.title)"
                                                        :class="{
                                                            'bg-gray-600': displyDesctiptionList === detail.studyMethod?.title,
                                                            'bg-background hover:bg-gray-600': displyDesctiptionList !== detail.studyMethod?.title,
                                                        }"
                                                        class="p-4 text-center  border-t border-r-[1px] border-gray-500 text-white cursor-pointer font-NotoSansKhmer transition duration-300 text-[14px] xl:text-[16px]">
                                                        {{ detail.studyMethod?.title }}
                                                    </div>
                                                </div>
                                            </div>




                                            <!-- detail -->

                                            <div class="mt-5">
                                                <div v-if="displyDesctiptionList === detail.aboutLessionList?.title">
                                                    <p class="space-y-3" v-html="detail.aboutLessionList?.description">
                                                    </p>
                                                </div>


                                                <div v-else-if="displyDesctiptionList === detail.conetent?.title"
                                                    class="border-b border-l border-r">
                                                    <div class="text-[16px] border-t p-4 w-full "
                                                        v-for="(content, index) in detail.conetent?.descriptionList"
                                                        :key="content.id">

                                                        <!-- Title with Toggle -->
                                                        <div @click="handleShowCollapse(index)"
                                                            class="flex items-center justify-between w-full space-y-2">
                                                            <p class="w-full font-bold cursor-pointer"
                                                                v-html="content?.contentVideoTitle"></p>
                                                            <div class="cursor-pointer"
                                                                :class="{ 'rotate-180 transition-all duration-300 ease-out': collapsedIndex === index, 'rotate-0 transition-all duration-300 ease-out': collapsedIndex !== index }">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                    viewBox="0 0 24 24" stroke-width="1.5"
                                                                    stroke="currentColor"
                                                                    class="transition-transform duration-200 size-6">
                                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                                        d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                                </svg>
                                                            </div>
                                                        </div>

                                                        <!-- Collapsible Content with Animate Transition -->
                                                        <transition name="fade-collapse" @enter="onEnter"
                                                            @leave="onLeave">

                                                            <div v-if="collapsedIndex === index"
                                                                class="overflow-hidden">
                                                                <div class="mt-3 space-y-2 text-blue-400 underline cursor-not-allowed "
                                                                    v-html="content?.contentDescription">
                                                                </div>
                                                            </div>
                                                        </transition>
                                                    </div>
                                                </div>



                                                <div v-else-if="displyDesctiptionList === detail.lessionVideo?.title">
                                                    <div v-for="video in detail.lessionVideo?.lesstionDescriptionList"
                                                        :key="video.id">
                                                        <div class="space-y-2">
                                                            <h2 class="font-bold " v-html="video?.lessionVideoContent">
                                                            </h2>
                                                            <iframe
                                                                v-if="video?.lessionVideoLink && getVideoEmbedLink(video?.lessionVideoLink)"
                                                                :src="getVideoEmbedLink(video?.lessionVideoLink)"
                                                                frameborder="0" allow="autoplay; encrypted-media"
                                                                allowfullscreen class="w-[500px] h-[400px]"></iframe>

                                                            <video
                                                                v-else-if="video?.lessionVideoLink && /\.(mp4|webm|ogg|m4v)$/i.test(video?.lessionVideoLink)"
                                                                :src="video?.lessionVideoLink" controls
                                                                class="w-[500px] h-[400px]"></video>

                                                            <img v-else class="w-[500px] h-[400px]"
                                                                src="https://fakeimg.pl/200x200/" alt="" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div v-else-if="displyDesctiptionList === detail.achievment?.title">
                                                    <div v-for="achiev in detail.achievment?.achievmentList"
                                                        :key="achiev.id">
                                                        <div class="space-y-2">
                                                            <h2 v-html="achiev?.title"></h2>
                                                            <iframe
                                                                v-if="achiev?.videoLink && getVideoEmbedLink(achiev?.videoLink)"
                                                                :src="getVideoEmbedLink(achiev?.videoLink)"
                                                                frameborder="0" allow="autoplay; encrypted-media"
                                                                allowfullscreen class="w-[500px] h-[400px]"></iframe>

                                                            <video
                                                                v-else-if="achiev?.videoLink && /\.(mp4|webm|ogg|m4v)$/i.test(achiev?.videoLink)"
                                                                :src="achiev?.videoLink" controls
                                                                class="w-[500px] h-[400px]"></video>

                                                            <img v-else class="w-[500px] h-[400px]"
                                                                src="https://fakeimg.pl/200x200/" alt="" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div v-else-if="displyDesctiptionList === detail.studentComment?.title">
                                                    <div
                                                        class="grid grid-cols-2 gap-5 mt-3 sm:grid-cols-3 lg:grid-cols-4">
                                                        <div v-for="student in detail.studentComment?.studentCommentList"
                                                            :key="student.id" class="flex flex-col items-center">
                                                            <div
                                                                class="relative w-full h-full max-w-[600px] max-h-[500px]">
                                                                <img v-if="student?.image" :src="student?.image"
                                                                    class="object-contain w-full h-full"
                                                                    alt="Student" />
                                                                <img v-else class="object-cover w-full h-full"
                                                                    src="https://fakeimg.pl/200x200/"
                                                                    alt="Placeholder" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div v-else-if="displyDesctiptionList === detail.studyMethod?.title"
                                                    class="mt-2">
                                                    <div v-for="method in detail.studyMethod?.studyMethodList"
                                                        :key="method.id">
                                                        <div>
                                                            <iframe
                                                                v-if="method?.videoLink && getVideoEmbedLink(method?.videoLink)"
                                                                :src="getVideoEmbedLink(method?.videoLink)"
                                                                frameborder="0" allow="autoplay; encrypted-media"
                                                                allowfullscreen class="w-[500px] h-[400px]"></iframe>

                                                            <video
                                                                v-else-if="method?.videoLink && /\.(mp4|webm|ogg|m4v)$/i.test(method?.videoLink)"
                                                                :src="method?.videoLink" controls
                                                                class="w-[500px] h-[400px]"></video>

                                                            <img v-else class="w-[500px] h-[400px]"
                                                                src="https://fakeimg.pl/200x200/" alt="" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <p class="mt-6 text-black space-y-2 text-[16px] font-NotoSansKhmer"
                                                    v-html="detail?.description"></p>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="my-20">
                    <CourseRelatedCategory />
                </div>
                <div class="">
                    <FooterView />
                </div>

            </div>


            <!-- mobile -->
            <div class="mt-5 md:px-20 lg:hidden">
                <div v-if="productDetails && productDetails.length">
                    <div v-for="category in productDetails" :key="category.id">
                        <div v-for="product in category.product" :key="product.id">
                            <div class="px-5">
                                <div v-for="detail in product.productDetail" :key="detail.id">
                                    <!-- <pre>{{ detail }}</pre> -->
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

                                                <div v-if="detail.introVideoLink?.length > 0">
                                                    <iframe
                                                        v-if="detail.introVideoLink && getVideoEmbedLink(detail.introVideoLink)"
                                                        :src="getVideoEmbedLink(detail.introVideoLink)" frameborder="0"
                                                        allow="autoplay; encrypted-media" allowfullscreen
                                                        class="w-full h-[300px] md:h-[400px]"></iframe>

                                                    <video
                                                        v-else-if="detail.introVideoLink && /\.(mp4|webm|ogg|m4v)$/i.test(detail.introVideoLink)"
                                                        :src="detail.introVideoLink" controls
                                                        class="w-full h-[300px] md:h-[400px]"></video>

                                                    <img v-else class="w-[400px]" src="https://fakeimg.pl/200x200/"
                                                        alt="">

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
                                                        {{ $t('bestSeller') }}</div>

                                                    <div v-if="detail.student.length > 0"
                                                        class="flex items-center space-x-2 text-xs">
                                                        <p class="underline">
                                                        </p>
                                                        <span class="text-sm">{{ detail.student.length }}
                                                            {{ $t('people') }}</span>
                                                    </div>

                                                </div>
                                                <div class="mt-4 mb-10 space-y-4">
                                                    <div class="text-sm">{{ $t('lectures') }} <span
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
                                                                {{ $t('lastDate') }} <span
                                                                    class="capitalize cursor-pointer">
                                                                    {{ detail.createdAt ? date(detail.createdAt
                                                                        .toDate()).format('D/YYYY') : 'N/A' }}</span>
                                                            </div>

                                                        </div>
                                                        <!-- <div class="flex items-center space-x-2">

                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1.5"
                                                                stroke="currentColor" class="size-4">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                                                            </svg>

                                                            <p>English</p>
                                                        </div> -->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div>

                                            <div class="relative w-full px-2 sm:px-0">
                                                <TabGroup>
                                                    <TabList class="flex p-1 space-x-1 ">

                                                    </TabList>


                                                    <TabPanels class="mt-2 ">
                                                        <!-- Example content for each tab -->
                                                        <TabPanel>

                                                            <div class="mt-0">
                                                                <h1 v-if="detail.price === 0"
                                                                    class="text-[19px] text-green-600 font-bold">
                                                                    {{ $t('freeCourse') }}
                                                                </h1>

                                                                <h1 v-else
                                                                    class="text-[19px] text-background font-bold">${{
                                                                        detail.price }}</h1>

                                                                <router-link v-if="detail.price !== 0"
                                                                    :to="{ name: 'advisorRegister' }">
                                                                    <button
                                                                        class="w-full p-3 font-bold text-[16px] text-white bg-black mt-2 ">
                                                                        {{ $t('addToCart') }}
                                                                    </button>
                                                                </router-link>

                                                                <!-- <div class="mt-4">
                                                                    <a href="https://t.me/masteritsystems_saleconsultant"
                                                                        class="mt-3" target="_blank"
                                                                        rel="noopener noreferrer">
                                                                        <button
                                                                            class="border-[1px] border-black p-2.5 w-full font-bold hover:bg-background/10">
                                                                            {{$t('consult')}}
                                                                        </button>
                                                                    </a>
                                                                </div> -->

                                                                <div class="mt-2 text-center">
                                                                    <a :href="`/advisorRegister/${detail.id}`"
                                                                        class="text-[12px] text-background/80 hover:underline">
                                                                        {{ $t('constant') }}
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </TabPanel>

                                                    </TabPanels>
                                                </TabGroup>

                                            </div>
                                        </div>


                                        <div v-if="detail.lessionBreif?.length > 0"
                                            class=" text-black my-8   border-background/20 px-4 pb-4 text-[15px]">

                                            <div>
                                                <!-- <p class="mt-6 text-black  leading-6 prose prose-p:text-[16px] "
                                                    v-html="detail.desctiption"></p> -->
                                                <div>
                                                    <p class="mt-4 space-y-1" v-html="detail.lessionBreif"></p>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="w-full">
                                            <div class="overflow-x-auto ">
                                                <div class="flex gap-1">
                                                    <div v-if="detail.aboutLessionList?.title"
                                                        @click="handleShowAboutLessionDes(detail.aboutLessionList?.title)"
                                                        :class="{
                                                            'bg-gray-600': displyDesctiptionList === detail.aboutLessionList?.title,
                                                            'bg-background hover:bg-gray-600': displyDesctiptionList !== detail.aboutLessionList?.title,
                                                        }"
                                                        class="p-2 text-center text-nowrap rounded-md border-r-[1px] border-gray-500 text-white cursor-pointer font-NotoSansKhmer transition duration-300 text-[15px]">
                                                        {{ detail.aboutLessionList?.title }}
                                                    </div>
                                                    <div v-if="detail.conetent?.title"
                                                        @click="handleShowAboutLessionDes(detail.conetent?.title)"
                                                        :class="{
                                                            'bg-gray-600': displyDesctiptionList === detail.conetent?.title,
                                                            'bg-background hover:bg-gray-600': displyDesctiptionList !== detail.conetent?.title,
                                                        }"
                                                        class="p-2 text-center text-nowrap rounded-md border-r-[1px] border-gray-500 text-white cursor-pointer font-NotoSansKhmer transition duration-300 text-[15px]">
                                                        {{ detail.conetent?.title }}
                                                    </div>



                                                    <div v-if="detail.lessionVideo?.title"
                                                        @click="handleShowAboutLessionDes(detail.lessionVideo?.title)"
                                                        :class="{
                                                            'bg-gray-600': displyDesctiptionList === detail.lessionVideo?.title,
                                                            'bg-background hover:bg-gray-600': displyDesctiptionList !== detail.lessionVideo?.title,
                                                        }"
                                                        class="p-2 text-center text-nowrap rounded-md border-r-[1px] border-gray-500 text-white cursor-pointer font-NotoSansKhmer transition duration-300 text-[15px]">
                                                        {{ detail.lessionVideo?.title }}
                                                    </div>
                                                    <div v-if="detail.achievment?.title"
                                                        @click="handleShowAboutLessionDes(detail.achievment?.title)"
                                                        :class="{
                                                            'bg-gray-600': displyDesctiptionList === detail.achievment?.title,
                                                            'bg-background hover:bg-gray-600': displyDesctiptionList !== detail.achievment?.title,
                                                        }"
                                                        class="p-2 text-center text-nowrap rounded-md border-r-[1px] border-gray-500 text-white cursor-pointer font-NotoSansKhmer transition duration-300 text-[15px]">
                                                        {{ detail.achievment?.title }}
                                                    </div>
                                                    <div v-if="detail.studentComment?.title"
                                                        @click="handleShowAboutLessionDes(detail.studentComment?.title)"
                                                        :class="{
                                                            'bg-gray-600': displyDesctiptionList === detail.studentComment?.title,
                                                            'bg-background hover:bg-gray-600': displyDesctiptionList !== detail.studentComment?.title,
                                                        }"
                                                        class="p-2 text-center text-nowrap border-t rounded-md  border-r-[1px] border-gray-500 text-white cursor-pointer font-NotoSansKhmer transition duration-300 text-[15px]">
                                                        {{ detail.studentComment?.title }}
                                                    </div>
                                                    <div v-if="detail.studyMethod?.title"
                                                        @click="handleShowAboutLessionDes(detail.studyMethod?.title)"
                                                        :class="{
                                                            'bg-gray-600': displyDesctiptionList === detail.studyMethod?.title,
                                                            'bg-background hover:bg-gray-600': displyDesctiptionList !== detail.studyMethod?.title,
                                                        }"
                                                        class="p-2 text-center text-nowrap  border-t rounded-md border-r-[1px] border-gray-500 text-white cursor-pointer font-NotoSansKhmer transition duration-300 text-[15px]">
                                                        {{ detail.studyMethod?.title }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <!-- detail -->

                                        <div class="mt-5 ">
                                            <div v-if="displyDesctiptionList === detail.aboutLessionList?.title"
                                                class="p-4 border">
                                                <p class="space-y-3 text-[15px]"
                                                    v-html="detail.aboutLessionList?.description">
                                                </p>
                                            </div>


                                            <div v-else-if="displyDesctiptionList === detail.conetent?.title"
                                                class="border-b border-l border-r">
                                                <div class="text-[15px] border-t p-4 w-full "
                                                    v-for="(content, index) in detail.conetent?.descriptionList"
                                                    :key="content.id">

                                                    <!-- Title with Toggle -->
                                                    <div @click="handleShowCollapse(index)"
                                                        class="flex items-center justify-between w-full space-y-2">
                                                        <p class="w-full font-bold cursor-pointer"
                                                            v-html="content?.contentVideoTitle"></p>
                                                        <div class="cursor-pointer"
                                                            :class="{ 'rotate-180 transition-all duration-300 ease-out': collapsedIndex === index, 'rotate-0': collapsedIndex !== index }">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1.5"
                                                                stroke="currentColor"
                                                                class="transition-transform duration-200 size-4">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                            </svg>
                                                        </div>
                                                    </div>

                                                    <!-- Collapsible Content with Animate Transition -->
                                                    <transition name="fade-collapse" @enter="onEnter" @leave="onLeave">
                                                        <div v-if="collapsedIndex === index" class="overflow-hidden">
                                                            <div class="mt-3 space-y-2 text-blue-400 underline cursor-not-allowed "
                                                                v-html="content?.contentDescription">
                                                            </div>
                                                        </div>
                                                    </transition>
                                                </div>
                                            </div>



                                            <div v-else-if="displyDesctiptionList === detail.lessionVideo?.title">
                                                <div v-for="video in detail.lessionVideo?.lesstionDescriptionList"
                                                    :key="video.id">
                                                    <div class="space-y-2">
                                                        <h2 class="font-bold text-[15px] "
                                                            v-html="video?.lessionVideoContent">
                                                        </h2>
                                                        <iframe
                                                            v-if="video?.lessionVideoLink && getVideoEmbedLink(video?.lessionVideoLink)"
                                                            :src="getVideoEmbedLink(video?.lessionVideoLink)"
                                                            frameborder="0" allow="autoplay; encrypted-media"
                                                            allowfullscreen class="w-full h-[200px]"></iframe>

                                                        <video
                                                            v-else-if="video?.lessionVideoLink && /\.(mp4|webm|ogg|m4v)$/i.test(video?.lessionVideoLink)"
                                                            :src="video?.lessionVideoLink" controls
                                                            class="w-full h-[200px]"></video>

                                                        <img v-else class="w-full h-[200px]"
                                                            src="https://fakeimg.pl/200x200/" alt="" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div v-else-if="displyDesctiptionList === detail.achievment?.title">
                                                <div v-for="achiev in detail.achievment?.achievmentList"
                                                    :key="achiev.id">
                                                    <div class="space-y-2 text-[15px]">
                                                        <h2 v-html="achiev?.title"></h2>
                                                        <iframe
                                                            v-if="achiev?.videoLink && getVideoEmbedLink(achiev?.videoLink)"
                                                            :src="getVideoEmbedLink(achiev?.videoLink)" frameborder="0"
                                                            allow="autoplay; encrypted-media" allowfullscreen
                                                            class="w-full h-[200px]"></iframe>

                                                        <video
                                                            v-else-if="achiev?.videoLink && /\.(mp4|webm|ogg|m4v)$/i.test(achiev?.videoLink)"
                                                            :src="achiev?.videoLink" controls
                                                            class="w-full h-[200px]"></video>

                                                        <img v-else class="w-full h-[200px]"
                                                            src="https://fakeimg.pl/200x200/" alt="" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div v-else-if="displyDesctiptionList === detail.studentComment?.title">
                                                <div class="grid grid-cols-2 gap-5 mt-3 sm:grid-cols-3 lg:grid-cols-4">
                                                    <div v-for="student in detail.studentComment?.studentCommentList"
                                                        :key="student.id" class="flex flex-col items-center">
                                                        <div class="relative w-full h-full max-w-[600px] max-h-[500px]">
                                                            <img v-if="student?.image" :src="student?.image"
                                                                class="object-contain w-full h-full" alt="Student" />
                                                            <img v-else class="object-cover w-full h-full"
                                                                src="https://fakeimg.pl/200x200/" alt="Placeholder" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div v-else-if="displyDesctiptionList === detail.studyMethod?.title"
                                                class="mt-2">
                                                <div v-for="method in detail.studyMethod?.studyMethodList"
                                                    :key="method.id">
                                                    <div>
                                                        <iframe
                                                            v-if="method?.videoLink && getVideoEmbedLink(method?.videoLink)"
                                                            :src="getVideoEmbedLink(method?.videoLink)" frameborder="0"
                                                            allow="autoplay; encrypted-media" allowfullscreen
                                                            class="w-full h-[200px]"></iframe>

                                                        <video
                                                            v-else-if="method?.videoLink && /\.(mp4|webm|ogg|m4v)$/i.test(method?.videoLink)"
                                                            :src="method?.videoLink" controls
                                                            class="w-full h-[200px]"></video>

                                                        <img v-else class="w-full" src="https://fakeimg.pl/200x200/"
                                                            alt="" />
                                                    </div>
                                                </div>
                                            </div>


                                        </div>




                                        <!-- <hr> -->
                                        <div v-html="detail.description" class="my-5 space-y-2 text-[15px]">

                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            <div v-if="isLoading" class="animate-pulse p-5  lg:mt-10 xl:w-[90%] mx-auto md:p-5 -mt-10 block lg:hidden">

                <div v-for="n in 2" :key="n" class="space-y-6 ">

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
                    <div class="flex gap-5">
                        <div
                            class="relative w-full overflow-hidden   h-4  before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/70  before:animate-[shimmer_1.1s_infinite]">
                            <div class="w-full h-6 bg-gray-300"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="block lg:hidden">

                <div class="my-20">
                    <CourseRelatedCategory />
                </div>

                <FooterView />
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

import FooterView from './FooterView.vue';
import CourseRelatedCategory from '@/components/client/CourseRelatedCategory.vue';



export default {
    components: {
        NavbarView,
        FooterView,
        CourseRelatedCategory
    },
    props: {
        id: {
            type: String
        },
        proDetail: {
            type: Object,
        },
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

        const displyDesctiptionList = ref("អំពីមេរៀនសិក្សា")
        const showCollaspedContent = ref(false)
        const collapsedIndex = ref(null)

        const categoryProduct = ref([]);


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


        //get youtube link video
        const getVideoEmbedLink = (url) => {
            const youtubeRegex = /(?:youtu\.be\/|youtube\.com\/(?:[^/]+\/\S+\/|(?:watch\?v=)))([a-zA-Z0-9_-]+)/;
            const match = url.match(youtubeRegex);
            if (match) {
                return `https://www.youtube.com/embed/${match[1]}`;
            }
            return '';
        };

        //show description about lession

        const handleShowAboutLessionDes = (desc) => {
            displyDesctiptionList.value = desc
        }

        const handleShowCollapse = (index) => {
            collapsedIndex.value = collapsedIndex.value === index ? null : index;
        }


        //using transition here
        const onEnter = (el) => {
            el.style.height = '0';
            el.style.opacity = '0';
            el.offsetHeight; // Force reflow
            el.style.transition = 'height 0.3s ease, opacity 0.3s ease';
            el.style.height = el.scrollHeight + 'px';
            el.style.opacity = '1';
        }
        const onLeave = (el) => {
            el.style.height = el.scrollHeight + 'px';
            el.style.opacity = '1';
            el.offsetHeight; // Force reflow
            el.style.transition = 'height 0.5s ease, opacity 0.3s ease';
            el.style.height = '0';
            el.style.opacity = '0';
        }


        //end transition here

        //go back
        // const goBack = () => {
        //     window.history.back();
        // }



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
            getVideoEmbedLink,
            handleShowAboutLessionDes,
            displyDesctiptionList,
            showCollaspedContent,
            handleShowCollapse,
            collapsedIndex,
            onEnter,
            onLeave,
            categoryProduct,
            // goBack

        };
    },
};
</script>

<style scoped>
/* Tailwind-inspired animation styles */
/* .fade-collapse-enter-active, .fade-collapse-leave-active {
  transition: height 0.3s ease, opacity 0.3s ease;
}
.fade-collapse-enter, .fade-collapse-leave-to {
  height: 0;
  opacity: 0;
} */
</style>