<template>



    <div class="h-screen flex justify-center items-center">
        <div class=" my-5 flex items-center justify-center   md:space-x-20">

            <div class="animate-bounce hidden md:block animate-infinite animate-duration-[7000ms]">
                <img class="w-[500px]"
                    src="https://frontends.udemycdn.com/components/auth/desktop-illustration-step-1-x1.webp" alt="">
            </div>

            <div class="bg-white shadow-lg p-5 rounded-sm">
                <div class="text-2xl text-center my-3 font-NotoSansKhmer font-bold">ចូលប្រើប្រាស់</div>
                <form @submit.prevent="handleSignIn" class="space-y-4">
                    <div class="relative">
                        <input type="email" v-model="email" required
                            class="block  px-2.5 pb-2.5 pt-5 w-[300px] text-sm text-gray-900 border-2 dark:bg-gray-700 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="" />
                        <label for="floating_filled"
                            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                            អ៊ីម៉ែល</label>
                    </div>

                    <div class="relative">
                        <input type="password" v-model="password" required
                            class="block  px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 border-2 dark:bg-gray-700 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="" />
                        <label for="floating_filled"
                            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                            ពាក្យសម្ងាត់</label>
                    </div>
                    <div>
                        <button v-if="!isPending"
                            class="bg-green-500 p-3 text-white hover:bg-green-600 transition-all duration-300 ease-in-out w-full font-NotoSansKhmer">ចូល</button>
                        <button v-else
                            class="bg-green-400 p-3 text-white transition-all duration-300 ease-in-out w-full font-NotoSansKhmer">កំពុងចូល...</button>
                    </div>

                    <!-- <div>
                        <router-link :to="{name: 'signup'}">ង្កើតអ្នកប្រើប្រាស់</router-link>
                    </div> -->
                </form>
            </div>
        </div>

    </div>
</template>


<script>
import { ref } from 'vue';
import useSignin from '@/firebase/useLogin';
import { handleMessageError } from '@/components/js/messageHandler';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const email = ref("")
        const password = ref("")

        const router = useRouter();

        const { signIn, isPending } = useSignin()

        const handleSignIn = async () => {

            try {
                const res = await signIn(email.value, password.value)
                if (res) {
                    router.push({name: 'dash'})
                }
                else {
                    handleMessageError("សូមពិនិត្យមើលអ៊ីម៉ែលនិងពាក្យសម្ងាត់ម្តង់ទៀត! មិនត្រឹមត្រូវ")
                }
            }
            catch (err) {
                console.log(err)
                
            }

        }

        return { email, password, handleSignIn, isPending }
    }
}

</script>