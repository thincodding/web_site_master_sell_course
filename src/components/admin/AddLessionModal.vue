<template>
    <div class="fixed top-0 left-0 z-10 w-full h-screen bg-black/50">
        <div class="flex items-center justify-center mt-5">
            <div class="bg-white w-[90%] overflow-y-auto h-[1000px]" v-motion :initial="{ scale: 0.9 }"
                :visible="{ opacity: 1, scale: 1 }">
                <div class="p-4 space-y-3">

                    <h1 class="font-bold font-NotoSansKhmer">បង្កើតមេរៀនថ្មី</h1>

                    <div>

                        <form @submit.prevent="handleSubmitLession" class="space-y-3">

                            <div class="space-y-2">
                                <div class="grid grid-cols-3 gap-3">

                                    <div class="space-y-1">
                                        <label for="productType" class="font-NotoSansKhmer font-[500]">កម្មវិធីសិក្សា:
                                            *</label>

                                        <select v-model="categoryId" @change="filterSearchCategory" required
                                            class="input_text p-[9.4px] capitalize">
                                            <option selected disabled value="">--ជ្រើសរើសវគ្គសិក្សា--</option>
                                            <option v-for="cat in documentProducts" :key="cat.id" :value="cat.id">
                                                {{ cat.categoryName }}
                                            </option>
                                        </select>

                                        <select v-if="category.length > 0" v-model="productId" required
                                            class="input_text p-[9.4px] capitalize">
                                            <option selected value="">--ជ្រើសរើសផលិតផល--</option>
                                            <option v-for="pro in category" :key="pro.id" :value="pro.id">
                                                {{ pro.productName }}
                                            </option>
                                        </select>
                                    </div>


                                    <div class="space-y-1">
                                        <label for="" class="font-NotoSansKhmer font-[500]">ចំណងជើងមេរៀន: *</label>
                                        <input type="text" v-model="title" required placeholder="ចំណងជើងមេរៀន"
                                            class="input_text">
                                    </div>


                                    <div class="space-y-1">
                                        <label for="" class="font-NotoSansKhmer font-[500]">បង្ហាញលក្ខណ: *</label>
                                        <select v-model="show_spacial" class="input_text p-[9.4px]" id="">
                                            <option selected disabled value="">--ជ្រើសរើស--</option>
                                            <option value="Most Popular">Most Popular</option>
                                            <option value="New">New</option>
                                            <option value="Beginer Favorites">Beginer Favorites</option>
                                        </select>

                                    </div>

                                </div>
                                <div class="grid grid-cols-4 gap-3">

                                    <div class="space-y-1">
                                        <label for="" class="font-NotoSansKhmer font-[500]">បង្រៀនដោយ: *</label>
                                        <input type="text" v-model="lectures" required placeholder="បង្រៀនដោយ"
                                            class="input_text">


                                    </div>


                                    <div class="space-y-1">
                                        <label for="" class="font-NotoSansKhmer font-[500]">តម្លៃសិក្សា</label>
                                        <input type="number" min="0" v-model="price" placeholder="តម្លៃសិក្សា"
                                            class="input_text">
                                    </div>
                                    <div class="space-y-1">
                                        <label for="" class="font-NotoSansKhmer font-[500]">បញ្ចុះតម្លៃ</label>
                                        <input type="number" v-model="discount" min="0" placeholder="បញ្ចុះតម្លៃ"
                                            class="input_text">
                                    </div>

                                    <div class="space-y-2">
                                        <div class="">
                                            <label class="font-NotoSansKhmer font-[500]">រូបភាព</label>
                                            <input type="file" @change="handleChangeFile" accept="image/png, image/jpeg"
                                                class="input_text">
                                        </div>
                                        <div v-if="pre_Image">
                                            <img :src="pre_Image" class="w-20 h-20" alt="">
                                        </div>

                                        <div v-else-if="selectFile" class="">
                                            <img :src="selectFile" class="object-contain w-20 h-20" alt="">
                                        </div>
                                        <div v-else>
                                            <img class="w-20 h-20"
                                                src="https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
                                                alt="">
                                        </div>
                                    </div>

                                </div>
                                <div class="">
                                    <div class="space-y-1">
                                        <label for="" class="font-NotoSansKhmer font-[500]">លីងវីដេអូ: *</label>
                                        <input type="text" v-model="introLessionVideo" placeholder="បញ្ចូលលីងវីដេអូ"
                                            class="input_text">


                                        <div v-if="isValidIntroDetailLink" class="mt-4">
                                            <h4>វីដេអូពិពណ៌នា:</h4>

                                            <video v-if="isDirectIntroDetailLink" :src="introLessionVideo" controls
                                                class="w-full max-w-sm"></video>

                                            <iframe v-else :src="youtubeEmbedIntroLink" frameborder="0"
                                                allow="autoplay; encrypted-media" allowfullscreen
                                                class="w-full max-w-md aspect-video"></iframe>
                                        </div>
                                        <p v-else-if="introLessionVideo" class="mt-2 text-red-500">
                                            សូមបញ្ចូលលីងវីដេអូឲបានត្រឹមត្រូវ
                                        </p>



                                    </div>

                                    <div class="grid grid-cols-3 gap-4">
                                        <div class="space-y-1">
                                            <label class="font-NotoSansKhmer font-[500]">អំពីវគ្គសិក្សា</label>
                                            <ckeditor class="" :editor="editor" v-model="aboutCourse"
                                                :config="editorConfig" />
                                        </div>
                                        <div class="space-y-1">
                                            <label
                                                class="font-NotoSansKhmer font-[500]">ពិពណ៌នាផ្សេងៗពីមេរៀនសិក្សា</label>
                                            <ckeditor class="" :editor="editor" v-model="desctiption"
                                                :config="editorConfig" />
                                        </div>
                                        <div class="space-y-1">
                                            <label class="font-NotoSansKhmer font-[500]">សង្ខេបអំពីមេរៀនសិក្សា</label>
                                            <ckeditor class="" :editor="editor" v-model="lessionBreif"
                                                :config="editorConfig" />
                                        </div>

                                    </div>
                                </div>

                            </div>



                            <div class="grid grid-cols-2 gap-4">

                                <!-- section 1 -->
                                <fieldset class="p-3 mt-2 border border-gray-300 border-solid">
                                    <legend class="text-md">ព័ត៌មានលម្អិតអំពីមេរៀនសិក្សា</legend>

                                    <div class="w-full space-y-2">
                                        <div>
                                            <label class="py-2 text-body text-textbody">អំពីមេរៀនសិក្សា </label>
                                            <div class="w-full space-y-2">
                                                <select name="" v-model="aboutLession" required class="input_text"
                                                    id="">
                                                    <option selected disabled value="">--ជ្រើសរើស--</option>
                                                    <option value="អំពីមេរៀនសិក្សា">អំពីមេរៀនសិក្សា</option>
                                                </select>
                                            </div>
                                            <div class="space-y-1">
                                                <label class="font-NotoSansKhmer">ពិពណ៌នាអំពីមេរៀនសិក្សា</label>
                                                <ckeditor class="" :editor="editor" v-model="aboutLessionDescription"
                                                    :config="editorConfig" />
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>

                                <!-- section 2 -->

                                <fieldset class="p-3 mt-2 border border-gray-300 border-solid ">
                                    <legend class="text-md">ព័ត៌មានមាតិការមេរៀនសិក្សា</legend>
                                    <div class="w-full space-y-2 ">
                                        <div class="relative">
                                            <label class="py-2 text-body text-textbody">មេតិការមេរៀនសិក្សា </label>
                                            <select name="" v-model="contentTitle" required class="input_text" id="">
                                                <option selected disabled value="">--ជ្រើសរើស--</option>
                                                <option value="មាតិការមេរៀន">មាតិការមេរៀន</option>
                                            </select>

                                            <div class="space-y-1">
                                                <label for="" class="font-NotoSansKhmer font-[500]">ចំណងជើង:*</label>
                                                <input type="text" v-model="contentVideoTitle" placeholder="ចំណងជើង"
                                                    class="input_text w-[94%]">
                                            </div>
                                            <div class="space-y-1">
                                                <label class="font-NotoSansKhmer">ពិពណ៌នាអំពីមាតិការមេរៀនសិក្សា</label>
                                                <ckeditor class="" :editor="editor" v-model="contentDescription"
                                                    :config="editorConfig" />
                                            </div>

                                            <div class="absolute right-0 top-[94px]">
                                                <button type="button" @click="addContentListRow"
                                                    class="px-4 py-2.5 text-white bg-blue-500 hover:bg-blue-400">+</button>
                                            </div>
                                        </div>

                                        <div v-if="contentDescriptionList?.length > 0">
                                            <div v-for="(content, index) in contentDescriptionList" :key="index"
                                                class="flex items-center justify-between gap-2">
                                                <div class="flex items-center gap-2">
                                                    <span>{{ index + 1 }}.</span>
                                                    <div>
                                                        <p><span class="font-bold font-NotoSansKhmer">ចំណងជើង:</span> {{
                                                            content.contentVideoTitle }}</p>
                                                        <div><span class="font-bold font-NotoSansKhmer">ពិពណ៌នា:</span>
                                                            <p v-html="content.contentDescription"></p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="space-x-2">
                                                    <button type="button" @click="removeContentListRow(index)"
                                                        class="px-2 py-2 text-white bg-red-600 hover:bg-red-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" class="lucide lucide-x">
                                                            <path d="M18 6 6 18" />
                                                            <path d="m6 6 12 12" />
                                                        </svg>
                                                    </button>

                                                    <button type="button" v-if="productDetail"
                                                        @click="handleEditContent(index)"
                                                        class="px-2 py-2 text-white bg-blue-600 hover:bg-blue-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" class="lucide lucide-pencil">
                                                            <path
                                                                d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                                                            <path d="m15 5 4 4" />
                                                        </svg>
                                                    </button>

                                                </div>


                                            </div>
                                        </div>

                                    </div>
                                </fieldset>

                                <!-- section 3 -->
                                <fieldset class="p-3 mt-2 border border-gray-300 border-solid">
                                    <legend class="text-md">បង្ហាញវីដេអូមេរៀនសិក្សា</legend>

                                    <div class="relative w-full space-y-2">
                                        <div>
                                            <label class="py-2 text-body text-textbody">អំពីវីដេអូមេរៀនសិក្សា </label>
                                            <div class="w-full space-y-2">
                                                <select name="" v-model="lessionVideoTitle" required class="input_text"
                                                    id="">
                                                    <option selected disabled value="">--ជ្រើសរើស--</option>
                                                    <option value="វីដេអូមេរៀនសិក្សា">វីដេអូមេរៀនសិក្សា</option>
                                                </select>
                                            </div>

                                            <div class="space-y-1 w-[93%]">
                                                <label class="font-NotoSansKhmer">ពិពណ៌នាអំពីមេរៀនសិក្សា</label>
                                                <ckeditor class="" :editor="editor" v-model="lessionVideoContent"
                                                    :config="editorConfig" />
                                            </div>

                                            <div class="space-y-1">
                                                <label for="" class="font-NotoSansKhmer">វីដេអូមេរៀន:</label>
                                                <input type="text" v-model="lessionVideoLink" placeholder="វិដេអូមេរៀន"
                                                    class="input_text">
                                            </div>
                                        </div>

                                        <div class="absolute right-0 top-[94px]">
                                            <button type="button" @click="addVideoLessionRows"
                                                class="px-4 py-2.5 text-white bg-blue-500 hover:bg-blue-400">+</button>
                                        </div>

                                        <div v-if="isValidIntroDetailLinkLession" class="mt-4">
                                            <h4>វីដេអូពិពណ៌នា:</h4>

                                            <video v-if="isDirectIntroDetailLinkLession" :src="lessionVideoLink"
                                                controls class="w-full max-w-sm"></video>

                                            <iframe v-else :src="youtubeEmbedIntroLinkLession" frameborder="0"
                                                allow="autoplay; encrypted-media" allowfullscreen
                                                class="w-full max-w-md aspect-video"></iframe>
                                        </div>
                                        <p v-else-if="lessionVideoLink" class="mt-2 text-red-500">
                                            សូមបញ្ចូលលីងវីដេអូឲបានត្រឹមត្រូវ
                                        </p>

                                        <!-- show video list -->

                                        <div v-if="lesssionVideoList?.length > 0">
                                            <div v-for="(list, index) in lesssionVideoList" :key="index"
                                                class="flex items-center justify-between gap-2">
                                                <div>
                                                    <p><strong>{{ index + 1 }}.</strong>ចំណងជើង <span class="font-bold"
                                                            v-html="list.lessionVideoContent"></span>
                                                    </p>
                                                    <!-- <p>{{ list.lessionVideoLink }}</p> -->
                                                    <div v-if="list.isDirectLinkLession">
                                                        <video :src="list.lessionVideoLink" controls
                                                            class="w-full max-w-sm"></video>
                                                    </div>
                                                    <div v-else>
                                                        <iframe :src="list.youtubeEmbedLinkLession" frameborder="0"
                                                            allow="autoplay; encrypted-media" allowfullscreen
                                                            class="w-full max-w-md aspect-video"></iframe>
                                                    </div>
                                                </div>

                                                <div class="space-x-2">
                                                    <button type="button" @click="removeVideoLessionList(index)"
                                                        class="px-2 py-2 text-white bg-red-600 hover:bg-red-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" class="lucide lucide-x">
                                                            <path d="M18 6 6 18" />
                                                            <path d="m6 6 12 12" />
                                                        </svg>
                                                    </button>

                                                    <button type="button" v-if="productDetail"
                                                        @click="handleEditVideoLession(index)"
                                                        class="px-2 py-2 text-white bg-blue-600 hover:bg-blue-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" class="lucide lucide-pencil">
                                                            <path
                                                                d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                                                            <path d="m15 5 4 4" />
                                                        </svg>
                                                    </button>

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </fieldset>

                                <!-- section 4 -->
                                <fieldset class="p-3 mt-2 border border-gray-300 border-solid">
                                    <legend class="text-md">បង្ហាញស្នាដៃសិស្ស</legend>

                                    <div class="relative w-full space-y-2">
                                        <div>
                                            <label class="py-2 text-body text-textbody">ស្នាដៃសិស្ស</label>
                                            <div class="w-full space-y-2">
                                                <select name="" v-model="achievmentTitle" required class="input_text"
                                                    id="">
                                                    <option selected disabled value="">--ជ្រើសរើស--</option>
                                                    <option value="ស្នាដៃសិស្ស">ស្នាដៃសិស្ស</option>
                                                </select>
                                            </div>

                                            <div class="space-y-1 w-[93%]">
                                                <label class="font-NotoSansKhmer">ចំណងជើងវីដេអូ</label>
                                                <ckeditor class="" :editor="editor" v-model="achievmentDescription"
                                                    :config="editorConfig" />
                                            </div>

                                            <div class="space-y-1">
                                                <label for="" class="font-NotoSansKhmer">វីដេអូបង្ហាញ:*</label>
                                                <input type="text" placeholder="វីដេអូបង្ហាញ"
                                                    v-model="achievmentVideoLink" class="input_text">
                                            </div>
                                        </div>


                                        <div class="absolute right-0 top-[94px]">
                                            <button type="button" @click="addRowAchievmentStudent"
                                                class="px-4 py-2.5 text-white bg-blue-500 hover:bg-blue-400">+</button>
                                        </div>


                                        <div v-if="isValidIntroDetailLinkAchievment" class="mt-4">
                                            <h4>វីដេអូពិពណ៌នា:</h4>

                                            <video v-if="isDirectIntroDetailLinkAchievment" :src="achievmentVideoLink"
                                                controls class="w-full max-w-sm"></video>

                                            <iframe v-else :src="youtubeEmbedIntroLinkAchievment" frameborder="0"
                                                allow="autoplay; encrypted-media" allowfullscreen
                                                class="w-full max-w-md aspect-video"></iframe>
                                        </div>
                                        <p v-else-if="achievmentVideoLink" class="mt-2 text-red-500">
                                            សូមបញ្ចូលលីងវីដេអូឲបានត្រឹមត្រូវ
                                        </p>



                                        <div v-if="achievmentList?.length > 0">
                                            <div v-for="(list, index) in achievmentList" :key="index"
                                                class="flex items-center justify-between gap-2">
                                                <div>
                                                    <p><strong>{{ index + 1 }}.</strong>ចំណងជើង <span class="font-bold"
                                                            v-html="list.title"></span>
                                                    </p>
                                                    <!-- <p>{{ list.lessionVideoLink }}</p> -->
                                                    <div v-if="list.isDirectAchievment">
                                                        <video :src="list.videoLink" controls
                                                            class="w-full max-w-sm"></video>
                                                    </div>
                                                    <div v-else>
                                                        <iframe :src="list.youtubeEmbedAchievment" frameborder="0"
                                                            allow="autoplay; encrypted-media" allowfullscreen
                                                            class="w-full max-w-md aspect-video"></iframe>
                                                    </div>
                                                </div>

                                                <div class="space-x-2">
                                                    <button type="button" @click="removeAchievmentStudent(index)"
                                                        class="px-2 py-2 text-white bg-red-600 hover:bg-red-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" class="lucide lucide-x">
                                                            <path d="M18 6 6 18" />
                                                            <path d="m6 6 12 12" />
                                                        </svg>
                                                    </button>

                                                    <button v-if="productDetail" type="button"
                                                        @click="handleEditAchievStudent(index)"
                                                        class="px-2 py-2 text-white bg-blue-600 hover:bg-blue-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" class="lucide lucide-pencil">
                                                            <path
                                                                d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                                                            <path d="m15 5 4 4" />
                                                        </svg>
                                                    </button>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </fieldset>

                                <!-- section 5 -->
                                <fieldset class="p-3 mt-2 border border-gray-300 border-solid">
                                    <legend class="text-md">អំពីមតិយោបល់សិស្សសិក្សា</legend>

                                    <div class="w-full space-y-2">
                                        <div>
                                            <label class="py-2 text-body text-textbody">មតិយោបលសិស្ស</label>
                                            <div class="w-full space-y-2">
                                                <select name="" v-model="studentComment" required class="input_text"
                                                    id="">
                                                    <option selected disabled value="">--ជ្រើសរើស--</option>
                                                    <option value="មតិយោបល់សិស្ស">មតិយោបល់សិស្ស</option>
                                                </select>
                                            </div>

                                        </div>

                                        <div class="space-y-1">
                                            <label class="py-2 text-body text-textbody">រូបភាពបង្ហាញ</label>
                                            <div class="w-full space-y-2">
                                                <input @change="addStudentCommentFile" id="productDetailLink"
                                                    type="file" class="input_text" />
                                            </div>
                                        </div>

                                        <div v-if="selectFeatureStudentCommentList?.length > 0"
                                            class="relative flex gap-4 mt-5">
                                            <div v-for="(feature, index) in selectFeatureStudentCommentList"
                                                :key="index">
                                                <div>
                                                    <img :src="feature.image" class="w-20 h-20">
                                                </div>

                                                <div class="absolute top-0">

                                                    <button type="button" @click="removeStudentCommentFile(index)"
                                                        class="bg-red-500 p-1 rounded-full m-0.5 text-white hover:bg-red-400">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" class="lucide lucide-x">
                                                            <path d="M18 6 6 18" />
                                                            <path d="m6 6 12 12" />
                                                        </svg>
                                                    </button>

                                                    <button type="button" v-if="productDetail"
                                                        @click="handleEditCommentFile(index)"
                                                        class="bg-blue-500 p-1 rounded-full m-0.5 text-white hover:bg-blue-400">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" class="lucide lucide-pencil">
                                                            <path
                                                                d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                                                            <path d="m15 5 4 4" />
                                                        </svg>
                                                    </button>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </fieldset>



                                <!-- section 6 -->
                                <fieldset class="p-3 mt-2 border border-gray-300 border-solid">
                                    <legend class="text-md">អំពីវិធីសាស្រ្តសិក្សា</legend>

                                    <div class="relative w-full space-y-2">
                                        <div>
                                            <label class="py-2 text-body text-textbody">វិធីសាស្រ្តសិក្សា</label>
                                            <div class="w-full space-y-2">
                                                <select name="" required v-model="studyMethodTittle" class="input_text"
                                                    id="">
                                                    <option selected disabled value="">--ជ្រើសរើស--</option>
                                                    <option value="វិធីសាស្រ្តសិក្សា">វិធីសាស្រ្តសិក្សា</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="space-y-1 w-[93%]">
                                            <label class="py-2 text-body text-textbody">វីដេអូបង្ហាញ</label>
                                            <div class="w-full space-y-2">
                                                <input v-model="studyMethodVideoLink" placeholder="វីដេអូបង្ហាញ"
                                                    class="input_text" />
                                            </div>
                                        </div>


                                        <div class="absolute right-0 top-[94px]">
                                            <button type="button" @click="addRowStudyMethod"
                                                class="px-4 py-2.5 text-white bg-blue-500 hover:bg-blue-400">+</button>
                                        </div>


                                        <div v-if="isValidIntroDetailLinkMethod" class="mt-4">
                                            <!-- <h4>វីដេអូពិពណ៌នា:</h4> -->

                                            <video v-if="isDirectIntroDetailLinkMethod" :src="studyMethodVideoLink"
                                                controls class="w-full max-w-sm"></video>

                                            <iframe v-else :src="youtubeEmbedIntroLinkMethod" frameborder="0"
                                                allow="autoplay; encrypted-media" allowfullscreen
                                                class="w-full max-w-md aspect-video"></iframe>
                                        </div>
                                        <p v-else-if="studyMethodVideoLink" class="mt-2 text-red-500">
                                            សូមបញ្ចូលលីងវីដេអូឲបានត្រឹមត្រូវ
                                        </p>


                                        <div v-if="studyMethodList?.length > 0">
                                            <div v-for="(list, index) in studyMethodList" :key="index"
                                                class="flex items-center justify-between gap-2">
                                                <div>

                                                    <!-- <p>{{ list.lessionVideoLink }}</p> -->
                                                    <div v-if="list.isDirectMethod">
                                                        <video :src="list.videoLink" controls
                                                            class="w-full max-w-sm"></video>
                                                    </div>
                                                    <div v-else>
                                                        <iframe :src="list.youtubeEmbedMethod" frameborder="0"
                                                            allow="autoplay; encrypted-media" allowfullscreen
                                                            class="w-full max-w-md aspect-video"></iframe>
                                                    </div>
                                                </div>

                                                <div class="space-x-2">
                                                    <button type="button" @click="removeStudyMethod(index)"
                                                        class="px-2 py-2 text-white bg-red-600 hover:bg-red-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" class="lucide lucide-x">
                                                            <path d="M18 6 6 18" />
                                                            <path d="m6 6 12 12" />
                                                        </svg>
                                                    </button>

                                                    <button type="button" v-if="productDetail"
                                                        @click="handleEdiStudyMethod(index)"
                                                        class="px-2 py-2 text-white bg-blue-600 hover:bg-blue-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" class="lucide lucide-pencil">
                                                            <path
                                                                d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                                                            <path d="m15 5 4 4" />
                                                        </svg>
                                                    </button>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </fieldset>
                            </div>


                            <div class="flex justify-end gap-2 mt-20 ">
                                <button @click="handleClose" class="button_only_close">បោះបង់</button>
                                <button v-if="!isLoading" class="button_only_submit">រក្សាទុក</button>
                                <button v-else disabled
                                    class="bg-blue-400 px-8 py-2.5  text-white flex items-center gap-1  font-NotoSansKhmer font-bold">កំពុងរក្សាទុក...</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { onMounted, ref, watch } from 'vue';
import { handleMessageSuccess } from '../js/messageHandler';
import useStorage from '@/firebase/useStorage';
import useNestedDocument from '@/firebase/useNestedSubcollection';
import getDocument from '@/firebase/getDocument';
import { timestamp } from '@/config/config';
import { computed } from 'vue';

export default {

    props: ['documentProducts', 'handleLoadProductDetail', 'categories', 'productDetail', 'product', 'handleFetch'],
    components: {
        ckeditor: CKEditor.component,
    },
    setup(props, { emit }) {
        const currentComponent = ref("")
        const isLoading = ref(false)
        const title = ref("")
        const categoryId = ref('')
        const productId = ref("")
        const lectures = ref("")
        const price = ref(0)
        const discount = ref(0)
        const show_spacial = ref("")
        const desctiption = ref("")
        const selectFile = ref("")
        const pre_Image = ref("")
        const category = ref([])
        const urlCopyLink = ref("")
        const urlEmbedCodes = ref("")
        const videoEmbedCodes = ref("")
        const aboutCourse = ref("")
        const lessionBreif = ref("")

        const introLessionVideo = ref("")
        const aboutLession = ref("")
        const aboutLessionDescription = ref("")

        //content

        const contentTitle = ref("")
        const contentVideoTitle = ref("")
        const contentDescriptionList = ref([])
        const contentDescription = ref("")

        //video

        const lessionVideoTitle = ref("")
        const lessionVideoContent = ref("")
        const lessionVideoLink = ref("")
        const lesssionVideoList = ref([])

        //achievment student

        const achievmentTitle = ref("")
        const achievmentDescription = ref("")
        const achievmentVideoLink = ref("")
        const achievmentList = ref([])

        // comment student

        const studentComment = ref("")
        const selectFeatureStudentCommentList = ref([])
        const preFetureStudentComment = ref([])

        // student methody

        const studyMethodTittle = ref("")
        const studyMethodVideoLink = ref("")
        const studyMethodList = ref([])

        const editor = ClassicEditor
        const { uploadImage, removeImage } = useStorage()

        onMounted(() => {
            if (props.categories && props.product && props.productDetail) {
                title.value = props.productDetail?.title
                categoryId.value = props.categories?.id
                productId.value = props.product?.id
                lectures.value = props.productDetail?.lectures
                price.value = props.productDetail?.price
                discount.value = props.productDetail?.discount
                aboutCourse.value = props.productDetail?.aboutCourse
                show_spacial.value = props.productDetail?.show_spacial
                desctiption.value = props.productDetail.description
                selectFile.value = props.productDetail?.imageUrl
                introLessionVideo.value = props.productDetail?.introVideoLink
                lessionBreif.value = props.productDetail?.lessionBreif
                aboutLession.value = props.productDetail?.aboutLessionList?.title
                aboutLessionDescription.value = props.productDetail?.aboutLessionList?.description
                contentTitle.value = props.productDetail?.conetent?.title
                contentDescriptionList.value = props.productDetail?.conetent?.descriptionList

                lessionVideoTitle.value = props.productDetail?.lessionVideo?.title
                lesssionVideoList.value = props.productDetail?.lessionVideo?.lesstionDescriptionList

                achievmentTitle.value = props.productDetail?.achievment?.title
                achievmentList.value = props.productDetail?.achievment?.achievmentList

                studentComment.value = props.productDetail?.studentComment?.title
                selectFeatureStudentCommentList.value = props.productDetail?.studentComment?.studentCommentList

                studyMethodTittle.value = props.productDetail?.studyMethod?.title
                studyMethodList.value = props.productDetail?.studyMethod?.studyMethodList
            }

        })


        //fetch url Link when update ckeditor


        const handleClose = () => {
            emit("close")
        }

        watch(categoryId, (cat) => {
            console.log(cat)
            filterSearchCategory()
        })

        watch(productId, (pro) => {
            console.log(pro)
        })

        const handleChangeFile = (e) => {
            try {
                const file = e.target.files[0]
                pre_Image.value = URL.createObjectURL(file)
                selectFile.value = file
            }
            catch (err) {
                console.log(err)
            }
        }


        //filter display
        const filterSearchCategory = () => {
            const { documents } = getDocument('categories', categoryId.value, 'product')
            watch(documents, () => {
                if (documents.value.length > 0) {
                    category.value = documents.value
                    console.log('category: ', category.value)
                }
                else {
                    category.value = []
                }
            })
        }

        //intro lession Video
        const isValidIntroDetailLink = computed(() => {
            const videoPatterns = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|.*\.(mp4|webm|ogg|m4v))(.*)?$/i;
            return videoPatterns.test(introLessionVideo.value);
        });

        // Check if the link is a direct video file
        const isDirectIntroDetailLink = computed(() => {
            const directVideoExtensions = /\.(mp4|webm|ogg|m4v)$/i;
            return directVideoExtensions.test(introLessionVideo.value);
        });

        // Generate YouTube embed link for YouTube URLs
        const youtubeEmbedIntroLink = computed(() => {
            if (!isValidIntroDetailLink.value || isDirectIntroDetailLink.value) return "";
            const youtubeRegex = /(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/;
            const match = introLessionVideo.value.match(youtubeRegex);
            return match ? `https://www.youtube.com/embed/${match[1]}` : "";
        });



        //addRow contentlist
        const addContentListRow = () => {

            if (contentVideoTitle.value && contentVideoTitle.value && contentDescription.value && contentDescription.value) {
                contentDescriptionList.value.push({
                    contentVideoTitle: contentVideoTitle.value,
                    contentDescription: contentDescription.value
                })
                contentVideoTitle.value = '',
                    contentDescription.value = ''
            }
        }

        // Remove contentList
        const removeContentListRow = (index) => {
            try {
                if (window.confirm("Are you sure delete?")) {
                    contentDescriptionList.value.splice(index, 1)
                }
            }
            catch (err) {
                console.log(err)
            }
        }

        //addcontent to edit
        const handleEditContent = (index) => {
            contentVideoTitle.value = contentDescriptionList.value[index].contentVideoTitle;
            contentDescription.value = contentDescriptionList.value[index].contentDescription;
            contentDescriptionList.value.splice(index, 1);
        }



        //show video lession

        const isValidIntroDetailLinkLession = computed(() => {
            const videoPatterns = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|.*\.(mp4|webm|ogg|m4v))(.*)?$/i;
            return videoPatterns.test(lessionVideoLink.value);
        });

        // Check if the link is a direct video file
        const isDirectIntroDetailLinkLession = computed(() => {
            const directVideoExtensions = /\.(mp4|webm|ogg|m4v)$/i;
            return directVideoExtensions.test(lessionVideoLink.value);
        });

        // Generate YouTube embed link for YouTube URLs
        const youtubeEmbedIntroLinkLession = computed(() => {
            if (!isValidIntroDetailLinkLession.value || isDirectIntroDetailLinkLession.value) return "";
            const youtubeRegex = /(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/;
            const match = lessionVideoLink.value.match(youtubeRegex);
            return match ? `https://www.youtube.com/embed/${match[1]}` : "";
        });


        //add row lession
        const addVideoLessionRows = () => {

            if (lessionVideoContent.value && lessionVideoContent.value && lessionVideoLink.value && lessionVideoLink.value) {
                lesssionVideoList.value.push({
                    lessionVideoContent: lessionVideoContent.value,
                    lessionVideoLink: lessionVideoLink.value,
                    isDirectLinkLession: isDirectIntroDetailLinkLession.value,
                    youtubeEmbedLinkLession: youtubeEmbedIntroLinkLession.value,
                });
                lessionVideoContent.value = ''
                lessionVideoLink.value = ''
            }


        }

        //remove video lession

        const removeVideoLessionList = (index) => {
            try {
                if (window.confirm("Are you sure want to remove?")) {
                    lesssionVideoList.value.splice(index, 1)
                }

            }
            catch (err) {
                console.log(err)
            }
        }


        const handleEditVideoLession = (index) => {
            lessionVideoContent.value = lesssionVideoList.value[index].lessionVideoContent;
            lessionVideoLink.value = lesssionVideoList.value[index].lessionVideoLink;
            lesssionVideoList.value.splice(index, 1);
        }



        //achievment Video
        const isValidIntroDetailLinkAchievment = computed(() => {
            const videoPatterns = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|.*\.(mp4|webm|ogg|m4v))(.*)?$/i;
            return videoPatterns.test(achievmentVideoLink.value);
        });

        // Check if the link is a direct video file
        const isDirectIntroDetailLinkAchievment = computed(() => {
            const directVideoExtensions = /\.(mp4|webm|ogg|m4v)$/i;
            return directVideoExtensions.test(achievmentVideoLink.value);
        });

        // Generate YouTube embed link for YouTube URLs
        const youtubeEmbedIntroLinkAchievment = computed(() => {
            if (!isValidIntroDetailLinkAchievment.value || isDirectIntroDetailLinkAchievment.value) return "";
            const youtubeRegex = /(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/;
            const match = achievmentVideoLink.value.match(youtubeRegex);
            return match ? `https://www.youtube.com/embed/${match[1]}` : "";
        });


        const addRowAchievmentStudent = () => {

            if (achievmentDescription.value && achievmentDescription.value && achievmentVideoLink.value && achievmentVideoLink.value) {
                achievmentList.value.push({
                    title: achievmentDescription.value,
                    videoLink: achievmentVideoLink.value,
                    isDirectAchievment: isDirectIntroDetailLinkAchievment.value,
                    youtubeEmbedAchievment: youtubeEmbedIntroLinkAchievment.value
                })
                achievmentDescription.value = ''
                achievmentVideoLink.value = ''
            }

        }

        const removeAchievmentStudent = (index) => {
            try {
                if (window.confirm("Are you sure delete?")) {
                    achievmentList.value.splice(index, 1);
                }
            } catch (err) {
                console.error("Error removing achievement:", err);
            }
        };

        const handleEditAchievStudent = (index) => {
            achievmentDescription.value = achievmentList.value[index].title;
            achievmentVideoLink.value = achievmentList.value[index].videoLink;
            achievmentList.value.splice(index, 1);
        }



        // student comment
        const addStudentCommentFile = (e) => {
            try {
                const files = Array.from(e.target.files);
                const imagePromises = files.map(file => {
                    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
                        alert("Only PNG and JPEG formats are allowed.");
                        return null;
                    }


                    if (file.size > 5 * 1024 * 1024) {
                        console.error("Image size exceeds 5MB limit.");
                        alert("Image size exceeds 5MB limit.");
                        return null;
                    }

                    const previewUrl = URL.createObjectURL(file);
                    preFetureStudentComment.value.push(previewUrl);

                    const storagePath = `studentComment/${file.name}`;
                    return uploadImage(storagePath, file);
                });

                Promise.all(imagePromises).then(urls => {
                    urls.forEach(url => {
                        if (url) {
                            const newFeature = { image: url };
                            selectFeatureStudentCommentList.value.push(newFeature);
                        }
                    });
                    // preViewTargetBusinessFile.value = [];
                    // selectTargetBusinessFeature.value = [];
                });
            } catch (err) {
                console.log(err);
            }
        };


        const removeStudentCommentFile = (index) => {
            // try{
            //     if(window.confirm("Are you delete?")){
            //         selectFeatureStudentCommentList.value.slice(index, 1)
            //     }
            // }
            // catch(err){
            //     console.error("Error removing achievement:", err);
            // }


            try {
                if (window.confirm("Are you sure delete?")) {
                    selectFeatureStudentCommentList.value.splice(index, 1);
                }
            } catch (err) {
                console.error("Error removing achievement:", err);
            }
        }

        //student method
        const isValidIntroDetailLinkMethod = computed(() => {
            const videoPatterns = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|.*\.(mp4|webm|ogg|m4v))(.*)?$/i;
            return videoPatterns.test(studyMethodVideoLink.value);
        });

        // Check if the link is a direct video file
        const isDirectIntroDetailLinkMethod = computed(() => {
            const directVideoExtensions = /\.(mp4|webm|ogg|m4v)$/i;
            return directVideoExtensions.test(studyMethodVideoLink.value);
        });

        // Generate YouTube embed link for YouTube URLs
        const youtubeEmbedIntroLinkMethod = computed(() => {
            if (!isValidIntroDetailLinkMethod.value || isDirectIntroDetailLinkMethod.value) return "";
            const youtubeRegex = /(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/;
            const match = studyMethodVideoLink.value.match(youtubeRegex);
            return match ? `https://www.youtube.com/embed/${match[1]}` : "";
        });



        const addRowStudyMethod = () => {

            if (studyMethodVideoLink.value && studyMethodVideoLink.value) {
                studyMethodList.value.push({
                    videoLink: studyMethodVideoLink.value,
                    isDirectMethod: isDirectIntroDetailLinkMethod.value,
                    youtubeEmbedMethod: youtubeEmbedIntroLinkMethod.value
                })
                studyMethodVideoLink.value = ''
            }

        }


        const removeStudyMethod = (index) => {
            try {
                if (window.confirm("Are you sure delete")) {
                    studyMethodList.value.splice(index, 1)
                }
            }
            catch (err) {
                console.log(err)
            }
        }



        const handleEdiStudyMethod = (index) => {
            studyMethodVideoLink.value = studyMethodList.value[index].videoLink;
            studyMethodList.value.splice(index, 1);
        }





        const handleSubmitLession = async () => {
            try {
                isLoading.value = true
                const { addDocs, updateDocs } = useNestedDocument('categories', categoryId.value, 'product', productId.value, 'productDetail');
                const data = {
                    title: title.value,
                    lectures: lectures.value,
                    price: price.value,
                    discount: discount.value,
                    show_spacial: show_spacial.value,
                    aboutCourse: aboutCourse.value,
                    description: desctiption.value,
                    introVideoLink: introLessionVideo.value,
                    lessionBreif: lessionBreif.value,
                    aboutLessionList: {
                        title: aboutLession.value,
                        description: aboutLessionDescription.value
                    },

                    conetent: {

                        title: contentTitle.value,
                        descriptionList: contentDescriptionList.value
                    },
                    lessionVideo:
                    {
                        title: lessionVideoTitle.value,
                        lesstionDescriptionList: lesssionVideoList.value
                    },


                    achievment:
                    {
                        title: achievmentTitle.value,
                        achievmentList: achievmentList.value
                    },

                    studentComment: {
                        title: studentComment.value,
                        studentCommentList: selectFeatureStudentCommentList.value
                    },


                    studyMethod: {
                        title: studyMethodTittle.value,
                        studyMethodList: studyMethodList.value
                    },

                    createdAt: timestamp(),
                }

                if (selectFile.value && selectFile.value !== (props.productDetail?.imageUrl || "")) {
                    const storagePath = `productDetail/${selectFile.value.name}`;
                    data.imageUrl = await uploadImage(storagePath, selectFile.value);

                    // Remove old image if it exists
                    if (props.productDetail?.imageUrl) {
                        await removeImage(props.productDetail.imageUrl);
                    }

                } else if (props.productDetail?.imageUrl) {
                    data.imageUrl = props.productDetail.imageUrl;
                } else {
                    data.imageUrl = '';
                }

                if (props.productDetail) {
                    await updateDocs(props.productDetail.id, data);
                    handleMessageSuccess(`បានកែប្រែមេរៀន ${props.productDetail.title} ដោយជោគជ័យ`);
                } else {
                    await addDocs(data);
                    handleMessageSuccess(`បានរក្សាទុក ${title.value} ដោយជោគជ័យ`);

                    console.log('data', data)
                }

                handleClose();
                await props.handleLoadProductDetail();

            }
            catch (err) {
                console.log(err)
            }
            finally {
                isLoading.value = false
            }
        }



        //add to edit target business
        const handleEditCommentFile = (index) => {
            const newFileInput = document.createElement('input');
            newFileInput.type = 'file';
            newFileInput.accept = 'image/png, image/jpeg';

            // Listen for the user to select a new image
            newFileInput.addEventListener('change', async (e) => {
                const file = e.target.files[0];

                if (!file || !(file.type === 'image/png' || file.type === 'image/jpeg')) {
                    alert("Only PNG and JPEG formats are allowed.");
                    return;
                }

                if (file.size > 5 * 1024 * 1024) {
                    alert("Image size exceeds 5MB limit.");
                    return;
                }

                const previewUrl = URL.createObjectURL(file);
                const storagePath = `studentComment/${file.name}`;

                try {
                    const url = await uploadImage(storagePath, file);

                    if (url) {
                        // Update the comment list with the new image URL
                        selectFeatureStudentCommentList.value.splice(index, 1, { image: url });
                    }
                } catch (err) {
                    console.error("Error uploading image:", err);
                    alert("Failed to upload the image. Please try again.");
                } finally {
                    // Revoke the object URL to free up memory
                    URL.revokeObjectURL(previewUrl);
                }
            });

            // Programmatically trigger the file selection dialog
            newFileInput.click();
        };




        return {
            editor, show_spacial,
            urlCopyLink, urlEmbedCodes, currentComponent,
            videoEmbedCodes, discount, handleClose, isLoading,
            title, categoryId, productId, lectures, price, desctiption,
            selectFile, pre_Image, handleChangeFile, handleSubmitLession,
            filterSearchCategory, category, aboutCourse,
            lessionBreif,
            introLessionVideo,
            youtubeEmbedIntroLink,
            isValidIntroDetailLink,
            isDirectIntroDetailLink,
            aboutLession,
            aboutLessionDescription,

            contentTitle,
            contentVideoTitle,
            contentDescriptionList,
            contentDescription,
            addContentListRow,
            removeContentListRow,

            //lessionVideo
            lessionVideoTitle,
            lessionVideoContent,
            lessionVideoLink,
            lesssionVideoList,
            isDirectIntroDetailLinkLession,
            youtubeEmbedIntroLinkLession,
            isValidIntroDetailLinkLession,
            addVideoLessionRows,
            handleEditVideoLession,
            removeVideoLessionList,

            //actievment

            achievmentTitle,
            achievmentDescription,
            achievmentVideoLink,
            achievmentList,
            isValidIntroDetailLinkAchievment,
            isDirectIntroDetailLinkAchievment,
            youtubeEmbedIntroLinkAchievment,
            addRowAchievmentStudent,
            removeAchievmentStudent,
            handleEditAchievStudent,

            //stuent comment
            studentComment,
            selectFeatureStudentCommentList,
            preFetureStudentComment,
            addStudentCommentFile,
            removeStudentCommentFile,
            handleEditCommentFile,
            handleEditContent,

            //studyMethod
            studyMethodTittle,
            studyMethodVideoLink,
            youtubeEmbedIntroLinkMethod,
            isValidIntroDetailLinkMethod,
            isDirectIntroDetailLinkMethod,
            studyMethodList,

            addRowStudyMethod,
            removeStudyMethod,
            handleEdiStudyMethod

        }
    }

}

</script>