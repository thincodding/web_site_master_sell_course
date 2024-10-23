<template>
    <div class="group w-10 sticky z-10 top-[86px]">

        <div style="box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;" class="bg-white w-72" v-motion :initial="{ scale: 0.9 }"
            :visible="{ opacity: 1, scale: 1 }">

            <div class="p-5">
                <h1 class="text-xl text-center font-[500]">Get your team access to over 27,000 top Udemy courses, anytime, anywhere.</h1>

                <div class="p-3 mt-3 text-center bg-black cursor-pointer hover:bg-black/80">
                    <router-link to="#" class="font-bold text-center text-white">សិក្សាលើអាជីវកម្មម៉ាស្ទ័រអាយធី</router-link>
                </div>
            </div>

           
        </div>
    </div>


</template>

<script>


export default {
    setup() {


    }
}

</script>


<style>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>