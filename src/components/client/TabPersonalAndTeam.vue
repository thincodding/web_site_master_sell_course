<template>
    <div class="w-full  px-2  sm:px-0 relative">
        <TabGroup>
            <TabList class="flex space-x-1   p-1 ">
                <!-- Loop through the categories array -->
                <Tab v-for="category in categories" as="template" :key="category.names" v-slot="{ selected }">
                    <button :class="[
                        'w-full py-2.5 text-sm font-medium leading-5',
                        'focus:outline-none',
                        selected
                            ? 'border-b-black z-[1] border-b-2 text-black '
                            : 'text-background hover:bg-white/[0.12] hover:text-white',
                    ]">
                        {{ category.names }}
                    </button>
                </Tab>
            </TabList>

            <TabPanels class="mt-2 ">
                <!-- Example content for each tab -->
                <TabPanel>
                    <div class="space-y-1">
                        <h1 class="text-[25px] font-playfair text-black">Suscribe to Udemy's top Courses</h1>
                        <p class="text-background/90 text-[14px]">Get this course, plus 12,000+ of our top-rated courses, with Personal Plan. <span class="text-indigo-400 font-bold">Learn more</span></p>
                    </div>
                    <button class="w-full p-3 font-bold text-[16px] text-white bg-[#A435F0] mt-2 ">Try Personal Plan for free</button>
                    <div class="text-center mt-2">
                        <p class="text-[12px] text-background/80">Starting at $10.00 per month after trial <br>
                            Cancel anytime</p>
                    </div>
                </TabPanel>
                <TabPanel>Teams Content</TabPanel>
            </TabPanels>

            <div class="w-full absolute top-[45px] px-1">
                <hr>
            </div>
        </TabGroup>

    </div>
</template>

<script>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

export default {
    components: {
        TabGroup,
        TabList,
        Tab,
        TabPanels,
        TabPanel
    },

    setup() {
        const categories = [
            {
                names: 'Personal'
            },
            {
                names: 'Teams'
            }
        ]

        return { categories }
    }
}
</script>