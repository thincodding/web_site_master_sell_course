<template>
    <NavbarView />
    <div class="flex justify-center h-screen">

        <div class="flex gap-10 p-4 lg:justify-center">
            <div class=" hidden lg:block animate-infinite animate-duration-[7000ms]">
                <img class="" src="https://frontends.udemycdn.com/components/auth/desktop-illustration-step-1-x1.webp"
                    alt="">
            </div>


            <div class="p-5 mt-5 rounded-sm ">
                <div class=" lg:hidden animate-infinite animate-duration-[7000ms] flex justify-center">
                    <img class="w-[450px] md:w-[300px]"
                        src="https://frontends.udemycdn.com/components/auth/mobile-illustration-x1.webp" alt="">
                </div>
                <div
                    class="text-[19px] md:text-[24px] lg:text-[30px] text-background my-5 text-center  font-NotoSansKhmer font-bold ">
                    {{ $t('signUpandStartLearning') }}
                </div>
                
                <div v-if="error" class="my-2">
                    <div class="p-2.5 text-lg font-bold text-white bg-red-500">{{ error }}</div>
                </div>

                <form @submit.prevent="handleRegister" class="space-y-4">
                    <div class="relative ">
                        <input type="text" v-model="fullName" required
                            class="block  px-2.5 pl-5  pb-3 pt-5 md:w-[400px] w-full text-sm text-gray-900 border-[1px] dark:bg-gray-700 border-black appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer"
                            placeholder="" />
                        <label for="floating_filled"
                            class="absolute text-sm ml-2.5 font-bold text-background dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                            {{ $t('fullName') }}</label>
                    </div>
                    <div class="relative ">
                        <input type="text" v-model="phone" required
                            class="block  px-2.5 pl-5  pb-3 pt-5 md:w-[400px] w-full text-sm text-gray-900 border-[1px] dark:bg-gray-700 border-black appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer"
                            placeholder="" />
                        <label for="floating_filled"
                            class="absolute text-sm ml-2.5 font-bold text-background dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                            {{ $t('phone') }}</label>
                    </div>
                    <div class="relative ">
                        <input type="email" v-model="email" required
                            class="block  px-2.5 pl-5  pb-3 pt-5 md:w-[400px] w-full text-sm text-gray-900 border-[1px] dark:bg-gray-700 border-black appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer"
                            placeholder="" />
                        <label for="floating_filled"
                            class="absolute text-sm ml-2.5 font-bold text-background dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                            {{ $t('email') }}</label>
                    </div>
                    <div class="relative ">
                        <input type="password" v-model="password" required
                            class="block  px-2.5 pl-5  pb-3 pt-5 md:w-[400px] w-full text-sm text-gray-900 border-[1px] dark:bg-gray-700 border-black appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer"
                            placeholder="" />
                        <label for="floating_filled"
                            class="absolute text-sm ml-2.5 font-bold text-background dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                            {{ $t('password') }}</label>
                    </div>
                    <div>
                        <button v-if="!isPending"
                            class="bg-red-500 flex items-center justify-center gap-2 p-3 text-white hover:bg-red-400 transition-all duration-300 ease-in-out w-full font-NotoSansKhmer font-[500]">

                            <p>{{ $t('signup') }}</p>
                        </button>

                        <button v-else disabled
                            class="bg-red-400 flex items-center justify-center gap-2 p-3 text-white  transition-all duration-300 ease-in-out w-full font-NotoSansKhmer font-[500]">
                            <p>{{ $t('signupLoading') }}</p>
                        </button>

                        <div class="my-6 text-xs text-center text-background">
                            <!-- By signing up, you agree to our <span class="text-indigo-500 underline">Terms of Use</span>
                            and <span class="text-indigo-500 underline"> Privacy Policy.</span> -->
                        </div>

                        <div class="flex items-center justify-center p-3 bg-slate-100">
                            <div class="font-[400] text-[16px] text-background">{{ $t('alreadyAccount') }} <router-link
                                    class="font-bold text-indigo-600" :to="{ name: 'login' }">{{ $t('login')
                                    }}</router-link>
                            </div>
                        </div>
                    </div>

                    <!-- <div>
                <router-link :to="{name: 'signup'}">ង្កើតអ្នកប្រើប្រាស់</router-link>
            </div> -->
                </form>
            </div>

        </div>
    </div>
    <FooterView />
</template>

<script>

import { ref } from 'vue';
import { handleMessageSuccess } from '@/components/js/messageHandler';
import useSignUp from '@/firebase/useSignup'
import useCollection from '@/firebase/useCollection'
import NavbarView from '@/views/NavbarView.vue';
import FooterView from './FooterView.vue';
import { useRouter } from 'vue-router';
export default {
    components: {
        NavbarView,
        FooterView
    },
    setup() {


        const email = ref("")
        const password = ref("")
        const fullName = ref("")
        const phone = ref("")
        const { signup, error } = useSignUp()
        const isPending = ref(false)
        const { setDocs } = useCollection("users")
        const router = useRouter()

        const handleRegister = async () => {
            isPending.value = true
            const data = {
                fullName: fullName.value,
                phone: phone.value,
                email: email.value,
                password: password.value,

            }
            const res = await signup(email.value, password.value, `${fullName.value}`, `${phone.value}`,)
            console.log(res)
            if (res?.user?.uid) {
                try {
                    const sign_success = await setDocs(data, res?.user?.uid);
                    if (sign_success) {
                        handleMessageSuccess(`Created  ${fullName.value} Successfully!`)
                        router.push({ name: 'home' })
                        error.value = false
                        clearData();
                    }
                }
                catch (err) {

                    console.log(err)

                }
            }

            isPending.value = false
        }

        function clearData() {
            email.value = ""
            password.value = ''
            fullName.value = ""
        }





        return { email, password, fullName, handleRegister, isPending, clearData, phone, error }

    }

}
</script>

<style></style>