<template>
    <div>
        <div class="group w-10 sticky top-[90px] z-10 ">

            <div style="box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;"
                class="w-72   bg-white" v-motion :initial="{ scale: 0.9 }" :visible="{ opacity: 1, scale: 1 }">

                <div class="p-5">
                    <h1 class="text-md text-center  text-[#7d7d7e] ">Your cart is empty.
                       </h1>

                    <div class=" text-center cursor-pointer mt-3">
                        <router-link to="#" class="text-indigo-800 text-center text-sm font-bold hover:text-indigo-900">Keep Shopping</router-link>
                    </div>
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