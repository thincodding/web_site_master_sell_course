<template>
    <div>
        <div class="group w-10 sticky top-[90px] z-10 ">

            <div style="box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;"
                class="bg-white w-72" v-motion :initial="{ scale: 0.9 }" :visible="{ opacity: 1, scale: 1 }">

                <div class="p-5">
                    <div class="flex justify-center">
                        <img class="w-16" src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="">
                    </div>
                    <h1 class="text-md text-center  text-[#7d7d7e] ">{{ $t('emptyCart') }}
                       </h1>

                    <!-- <div class="mt-3 text-center cursor-pointer ">
                        <router-link to="#" class="text-sm font-bold text-center text-indigo-800 hover:text-indigo-900">Keep Shopping</router-link>
                    </div> -->
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>


export default {
    setup(){

   

    }
}


</script>