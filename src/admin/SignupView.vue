<template>
    <div class="h-screen flex justify-center items-center">
        <div class=" my-5 flex items-center justify-center   md:space-x-20">

            <div class="animate-bounce hidden md:block animate-infinite animate-duration-[7000ms]">
                <img class="w-[500px]"
                    src="https://frontends.udemycdn.com/components/auth/desktop-illustration-step-1-x1.webp" alt="">
            </div>

            <div class="bg-white shadow-lg p-5 rounded-sm">
                <div class="text-2xl text-center my-3 font-NotoSansKhmer font-bold">បង្កើតអ្នកប្រើប្រាស់</div>
                <form @submit.prevent="handleRegister" class="space-y-4">

                    <div class="relative">
                        <input type="text" v-model="userName" required
                            class="block  px-2.5 pb-2.5 pt-5 w-[300px] text-sm text-gray-900 border-2 dark:bg-gray-700 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="" />
                        <label for="floating_filled"
                            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                            ឈ្មោះអ្នកប្រើប្រាស់</label>
                    </div>

                    <div class="relative">
                        <input type="text" v-model="email" required
                            class="block  px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 border-2 dark:bg-gray-700 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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

                    <div class="relative">
                        <input type="password" v-model="c_password" required
                            class="block  px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 border-2 dark:bg-gray-700 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="" />
                        <label for="floating_filled"
                            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                            បញ្ជាក់ពាក្យសម្ងាត់</label>
                    </div>

                    <div>
                        <button v-if="!isLoading" type="submit"
                            class="bg-green-500 p-3 text-white hover:bg-green-600 transition-all duration-300 ease-in-out w-full font-NotoSansKhmer">បង្កើត</button>
                        <button v-else type="submit" disabled
                            class="bg-green-400 p-3 text-white transition-all duration-300 ease-in-out w-full font-NotoSansKhmer">កំពុងបង្កើត...</button>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>

<script>

import { ref } from 'vue';
import { handleMessageError, handleMessageSuccess } from '@/components/js/messageHandler';
import useSignUp from '@/firebase/useSignup'
import useCollection from '@/firebase/useCollection'


export default {

    setup() {

        const userName = ref("")
        const email = ref("")
        const password = ref("")
        const c_password = ref("")
        const { signup, isLoading} = useSignUp()
        const { setDocs, isPending } = useCollection("users")

        const handleRegister = async () => {

            if (password.value !== c_password.value) {
                handleMessageError("ពាក្យសម្ងាត់មិនអាចខុសគ្នាទេ! ពិនិត្យមើលម្តងទៀត")
            }
            else {
              
                const data = {
                    username: userName.value,
                    email: email.value,
                    password: password.value,
                  
                }
                const res = await signup(email.value, password.value, `${userName.value}`)
                console.log(res)
                if (res?.user?.uid) {
                    try {
                        const sign_success = await setDocs(data, res?.user?.uid);
                        if (sign_success) {
                            handleMessageSuccess(`បានបង្កើតអ្នកប្រើប្រាស់ឈ្មោះ ${userName.value} ដោយជោគជ័យ!`)
                            clearData();
                        }
                    }
                    catch (err) {

                        console.log(err)
                       
                    }
                }

            }


        }



        function clearData(){
            userName.value = ""
            email.value = ""
            password.value = ''
            c_password.value = ""
        }



        return { userName, email, password, c_password, handleRegister, isPending,isLoading,clearData }

    }

}
</script>

<style></style>