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
                    class="text-[19px] md:text-[24px] lg:text-[32px] text-background my-5 text-center  font-NotoSansKhmer font-bold">
                    {{ $t('loginTolearning') }}
                </div>
                <form @submit.prevent="handleLogin" class="space-y-4">
                    <div class="relative">
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

                            <p>{{ $t('continueWithEmail') }}</p>
                        </button>

                        <button v-else disabled
                            class="bg-red-400 flex items-center justify-center gap-2 p-3 text-white transition-all duration-300 ease-in-out w-full font-NotoSansKhmer font-[500]">

                            <p>{{ $t('continueLoading') }}</p>
                        </button>


                        <div class="flex items-center justify-center gap-3 my-5">
                            <div class="h-[1px] w-full bg-color_text/30">

                            </div>
                            <div>
                                <p class="text-color_text">or</p>
                            </div>
                            <div class="h-[1px] w-full bg-color_text/30">

                            </div>
                        </div>

                        <div class="flex items-center justify-center gap-3">
                            <div @click="signInWithGoogle"
                                class="border-[1px] border-black p-3 px-3 hover:bg-gray-200 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25"
                                    viewBox="0 0 48 48">
                                    <path fill="#fbc02d"
                                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z">
                                    </path>
                                    <path fill="#e53935"
                                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z">
                                    </path>
                                    <path fill="#4caf50"
                                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z">
                                    </path>
                                    <path fill="#1565c0"
                                        d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z">
                                    </path>
                                </svg>
                            </div>

                            <div @click="signInwithFacebook"
                                class="border-[1px] border-black p-3 px-3 hover:bg-gray-200 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25"
                                    viewBox="0 0 48 48">
                                    <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path>
                                    <path fill="#fff"
                                        d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z">
                                    </path>

                                </svg>
                            </div>

                            <div class="border-[1px] border-black p-3 px-3 hover:bg-gray-200 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25"
                                    viewBox="0 0 30 30">
                                    <path
                                        d="M25.565,9.785c-0.123,0.077-3.051,1.702-3.051,5.305c0.138,4.109,3.695,5.55,3.756,5.55 c-0.061,0.077-0.537,1.963-1.947,3.94C23.204,26.283,21.962,28,20.076,28c-1.794,0-2.438-1.135-4.508-1.135 c-2.223,0-2.852,1.135-4.554,1.135c-1.886,0-3.22-1.809-4.4-3.496c-1.533-2.208-2.836-5.673-2.882-9 c-0.031-1.763,0.307-3.496,1.165-4.968c1.211-2.055,3.373-3.45,5.734-3.496c1.809-0.061,3.419,1.242,4.523,1.242 c1.058,0,3.036-1.242,5.274-1.242C21.394,7.041,23.97,7.332,25.565,9.785z M15.001,6.688c-0.322-1.61,0.567-3.22,1.395-4.247 c1.058-1.242,2.729-2.085,4.17-2.085c0.092,1.61-0.491,3.189-1.533,4.339C18.098,5.937,16.488,6.872,15.001,6.688z">
                                    </path>
                                </svg>
                            </div>
                        </div>

                        <div class="flex items-center justify-center p-3 mt-10 bg-slate-100">
                            <div class="font-[400] text-[16px] text-background">{{ $t('dontHaveAccount') }} <router-link
                                    class="font-bold text-indigo-600" :to="{ name: 'signup' }">{{ $t('signup')
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

import NavbarView from './NavbarView.vue';
import FooterView from './FooterView.vue';
import useSigninWithGoogle from '@/firebase/signInWithGoogle';
import useSignin from '@/firebase/useLogin';
import useSigninwithFacebook from '@/firebase/signinWithFacebook';
import { useRouter } from 'vue-router';
import { handleMessageError } from '@/components/js/messageHandler';
export default {
    components: {
        NavbarView,
        FooterView
    },
    setup() {
        const email = ref("")
        const password = ref("")
        const router = useRouter();

        const isPending = ref(false)


        const { signInWithGoogle } = useSigninWithGoogle()
        const { signInwithFacebook } = useSigninwithFacebook()
        const { signIn } = useSignin()

        const handleLogin = async () => {
            isPending.value = true
            try {
                const res = await signIn(email.value, password.value)
                if (res) {
                    router.push("/")
                }
                else{
                    handleMessageError("អុីម៉ែលនិងពាក្យសម្ងាត់មិនត្រឹមត្រូវ")
                }
            }
            catch (err) {
                console.log(err)
                // switch (err.code) {
                //     case "auth/invalid-credential":
                //     handleMessageError("Invalid email or password. Please try again.");
                //         break;
                //     case "auth/email-already-in-use":
                //     handleMessageError("អុីម៉ែលនេះមានរួចម្តងហើយ!");
                //         break;
                //     case "auth/weak-password":
                //     handleMessageError("ពាក្យសម្ងាត់ត្រូវតែលើស៦ខ្ទង់!");
                //         break;
                //     default:
                //     handleMessageError("An error occurred during registration. Please try again.");
                // }
            }
            finally {
                isPending.value = false
            }
        }

        // const handleSignWithGoogle = async () => {
        //     await signInWithGoogle()

        // }



        // const handleSignWithGoogle = async () => {
        //     await singIngoogle();
        // }


        return { email, signInWithGoogle, signInwithFacebook, password, handleLogin,isPending}
    }
}

</script>