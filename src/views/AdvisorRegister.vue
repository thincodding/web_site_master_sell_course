<template>
    <div>
        <div class="p-5 bg-background">
            <div class="flex items-center gap-2">
                <button @click="goBack" class="p-2 bg-red-500 rounded-md shadow hover:bg-red-600 hover:shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="text-white size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                    </svg>
                </button>
                <div>
                    <p class="font-bold text-white font-NotoSansKhmer">ត្រឡប់ក្រោយ</p>
                </div>
            </div>
        </div>

        <div class="w-[70%] mx-auto my-10">
            <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
                <div class="w-full">
                    <a href="https://t.me/masteritsystems_saleconsultant" target="_blank" class="w-full">
                        <button
                            class="flex items-center w-full gap-2 p-4 text-white rounded-md shadow-lg bg-background hover:bg-background/90">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-send">
                                <path
                                    d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                                <path d="m21.854 2.147-10.94 10.939" />
                            </svg>
                            <span class="font-bold text-lg smd:text-sm md:text-[14px] lg:text-md xl:text-lg">ប្រឹក្សាតាមតែលេក្រាម</span>
                        </button>
                    </a>
                </div>
                
                <div class="w-full">
                    <router-link to="/" class="w-full">
                        <button
                            class="flex items-center w-full gap-2 p-4 text-white rounded-md shadow-lg bg-background hover:bg-background/90">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                            </svg>

                            <span class="font-bold text-lg smd:text-sm md:text-[14px] lg:text-md xl:text-lg">ប្រឹក្សាចូលរៀន</span>
                        </button>
                    </router-link>
                </div>
                
                <div class="w-full">
                    <router-link to="/" class="w-full">
                        <button
                            class="flex items-center w-full gap-2 p-4 text-white rounded-md shadow-lg bg-background hover:bg-background/90">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-phone-call">
                                <path
                                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                <path d="M14.05 2a9 9 0 0 1 8 7.94" />
                                <path d="M14.05 6A5 5 0 0 1 18 10" />
                            </svg>
                            <span class="font-bold text-lg smd:text-sm md:text-[14px] lg:text-md xl:text-lg">ប្រឹក្សាតាមលេខទូរស័ព្ទ</span>
                        </button>
                    </router-link>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {

    setup() {
        const goBack = () => {
            window.history.back();
        }

        return { goBack }
    }
}
</script>