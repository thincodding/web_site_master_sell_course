<template>
    <div class="space-y-2">
        <!-- Label for the Select -->
        <label class="font-NotoSansKhmer font-medium" for="productType">
            ប្រភេទផលិតផល
        </label>

        <div class="relative">
            <!-- This div mimics the appearance of a select input -->
            <div @click="toggleDropdown"
                class="w-full border border-gray-300 p-2  bg-white flex justify-between items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500">
                <span>{{ selectedProduct ? selectedProduct.productName : 'ស្វែងរក និង ជ្រើសរើស' }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M10 3a1 1 0 01.707.293l7 7a1 1 0 01-1.414 1.414L10 5.414 3.707 11.707A1 1 0 012.293 10.293l7-7A1 1 0 0110 3z"
                        clip-rule="evenodd" />
                </svg>
            </div>

            <!-- Dropdown Menu -->
            <div v-if="isDropdownOpen"
                class="absolute w-full bg-white border border-gray-300 shadow-sm max-h-60 overflow-auto z-10">
                <!-- Search Input inside Dropdown -->
                <div class="p-2">
                    <input type="text"
                        class="input_text"
                        placeholder="ស្វែងរកផលិតផល..." v-model="searchTerm" />
                </div>

                <!-- Option to show when there are no products matching the search -->
                <div v-if="filteredProducts.length === 0" class="px-4 py-2 text-gray-500">
                    គ្មានទិន្នន័យ
                </div>

                <!-- Product Options -->
                <div v-else>
                    <template v-for="cate in documentProducts" :key="cate.id">
                        <div v-for="pro in filteredProducts(cate.product)" :key="pro.id" @click="selectProduct(pro)"
                            class="px-4 py-2 cursor-pointer hover:bg-gray-100">
                            {{ pro.productName }}
                        </div>
                    </template>
                </div>
            </div>
        </div>

        <!-- Hidden select input for form submission -->
        <input type="hidden" :value="selectedProduct ? selectedProduct.id : ''" name="productType" required />

        <!-- Display selected product -->
        <p v-if="selectedProduct" class="mt-2">ជ្រើសរើសផលិតផល: {{ selectedProduct.productName }}</p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            searchTerm: '',
            isDropdownOpen: false,
            selectedProduct: null,
            documentProducts: [
                {
                    id: 1,
                    product: [
                        { id: 1, productName: 'Product A' },
                        { id: 2, productName: 'Product B' }
                    ]
                },
                {
                    id: 2,
                    product: [
                        { id: 3, productName: 'Product C' },
                        { id: 4, productName: 'Product D' }
                    ]
                }
            ]
        };
    },
    computed: {
        filteredProducts() {
            return (products) => {
                if (!this.searchTerm) return products;
                return products.filter(pro =>
                    pro.productName.toLowerCase().includes(this.searchTerm.toLowerCase())
                );
            };
        }
    },
    methods: {
        selectProduct(product) {
            this.selectedProduct = product;
            this.isDropdownOpen = false;
            this.searchTerm = ''; // Reset search term
        },
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        }
    },
    watch: {
        searchTerm(value) {
            if (value === '') {
                this.isDropdownOpen = false;
            }
        }
    }
};
</script>