<template>

    <div class="bg-white  shadow-sm p-5 border-t-2 border-t-blue-500  animate-fade-up animate-duration-[2000ms]">



        <div class="my-5 flex justify-between">
            <h1 class="text-[20px] font-NotoSansKhmer font-bold">តារាងបញ្ចីដៃគូ</h1>
            <button @click="handleAdd('AddPartnerModal')"
                class="bg-background px-5 py-2.5  text-white flex items-center gap-1 hover:bg-background/90"> <svg
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>

                <p class="font-NotoSansKhmer">បង្កើតថ្មី</p>
            </button>
        </div>
        <div class="flex justify-between">
            <div>
                <select class="border-2 p-2 px-5 outline-none bg-gray-50/20 focus:border-blue-500">
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>

            <div class="relative">
                <input type="text" v-model="searchText"
                    class="p-2 w-96 border-2 placeholder:font-NotoSansKhmer bg-gray-50/40 outline-none focus:border-blue-500 pl-4"
                    placeholder="ស្វែងរក...">
                <div class="absolute top-2.5 right-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6 text-gray-400">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>

                </div>
            </div>
        </div>

        <div class="relative overflow-x-auto mt-3">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-10">
                <thead class="text-[16px]  text-black/70 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                    <tr class="font-NotoSansKhmer ">
                        <th width="25%" scope="col" class="py-4 font-NotoSansKhmer">
                            ឈ្មោះប្រភេទ
                        </th>
                        <th width="25%" scope="col" class=" py-3 font-NotoSansKhmer">
                            ពិពណ៌នា
                        </th>
                        <th width="20%" scope="col" class=" py-3 font-NotoSansKhmer">
                            រូបភាព
                        </th>
                        <th width="20%" scope="col" class=" py-3 font-NotoSansKhmer">
                            កាលបរិច្ឆេត
                        </th>
                        <th width="5%" scope="col" class=" py-3 font-NotoSansKhmer">
                            សកម្មភាព
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="doc in partner" :key="doc.id"
                        class="border-b dark:bg-gray-800 dark:border-gray-700 select-none">

                        <td class=" py-2 capitalize">
                            {{ doc.names }}
                        </td>
                        <td class=" py-2 capitalize">
                            <p v-html="doc.descripton"></p>
                        </td>
                        <td class=" py-2 capitalize">
                            <img :src="doc.image" class="w-12 h-12" />
                        </td>
                        <td class=" py-2 capitalize">
                            {{ doc.createdAt ? date(doc.createdAt.toDate()).format(`ddd D, MMM YYYY ${"ម៉ោង"} hh:mm`) :
                                'N/A' }}
                        </td>
                        <td>
                           <div class="flex gap-3">
                            <svg @click="handleDeleteParter(doc)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-6 hover:text-gray-800 cursor-pointer">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>

                            <svg @click="handleEditPartner(doc)"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-6 hover:text-gray-800 cursor-pointer">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                           </div>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>



    </div>

    <component :is="currentComponents" @close="currentComponents = ''" :partners='partners' />

</template>

<script>

import AddPartnerModal from '@/components/admin/AddPartnerModal.vue';
import getCollection from '@/firebase/getCollection';
import PartnerModalDeleteComponent from '@/components/admin/PartnerModalDeleteComponent.vue';
import { ref } from 'vue';
import moment from 'moment';
export default {
    components: {
        AddPartnerModal,
        PartnerModalDeleteComponent
    },
    setup() {

        const currentComponents = ref("")
        const date = moment
        const partners = ref(null)

        const { document: partner } = getCollection('partner')

        const handleAdd = (component) => {
            currentComponents.value = component
            partners.value = null
        }

        const handleDeleteParter = (item) => {
            currentComponents.value = 'PartnerModalDeleteComponent'
            partners.value = item
        }

        const handleEditPartner = (item) => {
            currentComponents.value = 'AddPartnerModal'
            partners.value = item
        }

        return { currentComponents, handleAdd, partner, date, handleDeleteParter,partners,handleEditPartner }
    }

}

</script>
<style></style>