<template>

    <div class="flex flex-col h-screen">
        <div>
            <NavbarView />
        </div>
        <div class="mb-auto  w-[90%] md:w-[90%] xl:w-[1100px] mx-auto  p-5">

            <h1 class="text-[20px] md:text-[30px] lg:text-[25px] xl:text-[25px] font-bold text-center my-4">{{ $t('helpmore') }}
            </h1>
            <hr>
            <div v-if="loading">
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
            <div v-else class="grid grid-cols-1 gap-5 mt-4 md:grid-cols-2">
                <div v-for="doc in helpDoc" :key="doc">
                    <div class="space-y-5">
                        <div class="flex items-center gap-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-chevron-right">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                            <p class="text-lg line-clamp-1">{{ doc.title }}</p>
                        </div>
                        <div class="border border-red-500">
                            <iframe v-if="doc?.linkVideo && getdocEmbedLink(doc?.linkVideo)"
                                :src="getdocEmbedLink(doc?.linkVideo)" frameborder="0" allow="autoplay; encrypted-media"
                                allowfullscreen
                                class="w-full h-[205px] md:h-[200px] lg:h-[300px] xl:h-[300px]"></iframe>

                            <video v-else-if="doc?.linkVideo && /\.(mp4|webm|ogg|m4v)$/i.test(doc?.linkVideo)"
                                :src="doc?.linkVideo" controls
                                class="w-full h-[250px] md:h-[200px] lg:h-[300px] xl:h-[350px]"></video>

                            <img v-else class="w-full h-[250px] md:h-[200px] lg:h-[300px] xl:h-[350px]"
                                src="https://fakeimg.pl/200x200/" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <FooterView />
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import NavbarView from './NavbarView.vue';
import FooterView from './FooterView.vue';
import getCollection from '@/firebase/getCollection';
import { watch } from 'vue';

export default {
    components: {
        NavbarView,
        FooterView
    },
    setup() {
        const helpDoc = ref([]);
        const loading = ref(true);
        const { document } = getCollection("helps");



        watch(document, () => {

            helpDoc.value = document.value || [];
            loading.value = false;
        })

        // Get YouTube embed link
        const getdocEmbedLink = (url) => {
            const youtubeRegex = /(?:youtu\.be\/|youtube\.com\/(?:[^/]+\/\S+\/|(?:watch\?v=)))([a-zA-Z0-9_-]+)/;
            const match = url.match(youtubeRegex);
            return match ? `https://www.youtube.com/embed/${match[1]}` : '';
        };

        return { helpDoc, getdocEmbedLink, loading };
    }
}


</script>