<template>
    <div>
        <div class="group w-10 sticky z-10 top-[86px] ">

            <div style="box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;"
                class="w-72   bg-white" v-motion :initial="{ scale: 0.9 }" :visible="{ opacity: 1, scale: 1 }">

                <div class="p-5">
                    <h1 class="text-xl text-center font-[500]">Turn what you know into an opportunity and reach millions around the world.</h1>

                    <div class="bg-black hover:bg-black/80 p-3 mt-3 text-center cursor-pointer">
                        <router-link to="#" class="text-white text-center font-bold">Learn More</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
</script>