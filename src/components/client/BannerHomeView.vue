<template>
    <div class="bg-[#f7f9fa] p-10 mb-10 md:my-10 select-none">
        <div class="xl:w-[1200px] mx-auto p-5 ">
            <div class="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-8 items-center md:gap-10 gap-5">
                <div v-for="img in image_banner" :key="img.id" class="md:flex justify-center">
                    <img  :src="img.image" alt="">
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import { ref } from 'vue';


export default{
    setup(){

        const image_banner = ref([
            {   
                id: 1,
                image: "https://cms-images.udemycdn.com/content/tqevknj7om/svg/volkswagen_logo.svg?position=c&quality=80&x.app=portals"
            },
            {   
                id: 2,
                image: "https://cms-images.udemycdn.com/content/2gevcc0kxt/svg/samsung_logo.svg?position=c&quality=80&x.app=portals"
            },
            {   
                id: 3,
                image: "https://cms-images.udemycdn.com/content/mueb2ve09x/svg/cisco_logo.svg?position=c&quality=80&x.app=portals"
            },
            {   
                id: 4,
                image: "https://cms-images.udemycdn.com/content/ryaowrcjb2/svg/vimeo_logo_resized-2.svg?position=c&quality=80&x.app=portals"
            },
            {   
                id: 5,
                image: "https://cms-images.udemycdn.com/content/bthyo156te/svg/procter_gamble_logo.svg?position=c&quality=80&x.app=portals"
            },
            {   
                id: 6,
                image: "https://cms-images.udemycdn.com/content/luqe0d6mx2/svg/hewlett_packard_enterprise_logo.svg?position=c&quality=80&x.app=portals"
            },
            {   
                id: 7,
                image: "https://cms-images.udemycdn.com/content/siaewwmkch/svg/citi_logo.svg?position=c&quality=80&x.app=portals"
            },
            {   
                id: 8,
                image: "https://cms-images.udemycdn.com/content/swmv0okrlh/svg/ericsson_logo.svg?position=c&quality=80&x.app=portals"
            }
        ])


        return {image_banner}
    }
}


</script>