<template>
  <div class="relative hidden lg:block">
    <input type="text" v-model="searchText"
      class="bg-gray-50 border-black border-[1px] w-full p-3 outline-none rounded-full placeholder:text-[14px] pl-14"
      placeholder="ស្វែងរកមេរៀន..." />
    <div class="absolute top-[14px] left-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="size-5 text-[#454647] font-bold">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    </div>

    <!-- Dropdown for search results -->
    <div v-if="searchText"
      class="absolute top-14 w-full bg-white shadow z-[2] border max-h-48 overflow-y-auto animate-fade-up animate-delay-[20ms]">
      <div v-if="filteredProducts.length > 0" class="">
        <div v-for="category in filteredProducts" :key="category.id">
          <div v-for="product in category.product" :key="product.id" class="p-3 pl-4 text-gray-700 ">
            <router-link :to="{ name: 'searchProduct', params: { id: product.id } }"
              class="flex items-center gap-5 duration-300 ease-in-out hover:text-gray-400 hover:transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <p>{{ product.productName }}</p>
            </router-link>
          </div>
        </div>
      </div>
      <div v-else class="p-3 text-center text-gray-500">
        <p>មិនមានមេរៀនឈ្មោះ {{ searchText }}</p>
      </div>
    </div>
  </div>

  <!-- mobile -->
  <div class="lg:hidden">
    <svg @click="isOpenDropdownSearch = !isOpenDropdownSearch" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
      class="cursor-pointer size-5">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>


    <div v-if="isOpenDropdownSearch" class="flex items-center justify-center ">
      <div class="relative flex flex-col items-center group">
        <div class="absolute top-0 -right-3 items-center flex flex-col justify-end  mt-6 group-hover:flex z-[2]">
          <div class="w-4 h-4 mt-1 ml-[201px] -mb-3 rotate-45 border-[0.5px] bg-white   shadow-2xl"></div>
          <span class="relative z-10 p-2 text-xs leading-none whitespace-no-wrap border-[0.5px] rounded-sm bg-white shadow-lg ">
            <input v-model="searchText" type="text" class="p-1.5 border-2 outline-none w-[210px]  focus:border-blue-300"
              placeholder="ស្វែងរកមេរៀន...">
          </span>
        </div>
      </div>
      <!-- Component End  -->
    </div>

    <div v-if="searchText"
      class="absolute top-[132px] left-[146px] w-72 bg-white shadow-xl z-[2] border max-h-48 overflow-y-auto animate-fade-up animate-delay-[20ms]">
      <div v-if="filteredProducts.length > 0" class="">
        <div v-for="category in filteredProducts" :key="category.id">
          <div v-for="product in category.product" :key="product.id" class="p-3 pl-4 text-gray-700 ">
            <router-link :to="{ name: 'searchProduct', params: { id: product.id } }"
              class="flex items-center gap-5 duration-300 ease-in-out hover:text-gray-400 hover:transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <p class="text-sm">{{ product.productName }}</p>
            </router-link>
          </div>
        </div>
      </div>
      <div v-else class="p-3 text-center text-gray-500">
        <p class="text-sm">មិនមានមេរៀនឈ្មោះ {{ searchText }}</p>
      </div>
    </div>
  </div>

</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';
import { useFirestoreCollection, useSubcollection } from '@/firebase/getArrayDocument';

export default {
  setup() {
    const products = ref([]);
    const searchText = ref("");
    const isLoading = ref(false);
    const isOpenDropdownSearch = ref(false)
    const { documents: categoryDocument, fetchCollection } = useFirestoreCollection("categories");

    onMounted(async () => {
      await fetchCollection();
      await fetchCategoryProduct();
    });

    const fetchCategoryProduct = async () => {
      isLoading.value = true;
      try {
        const categoryPromises = categoryDocument.value.map(async (cate) => {
          const { subcollectionData: product, fetchSubcollection } = useSubcollection('categories', cate.id, 'product', 'productName');
          await fetchSubcollection();
          return {
            id: cate.id,
            categoryName: cate.categoryName,
            description: cate.description,
            image: cate.image,
            product: product.value,
          };
        });

        products.value = await Promise.all(categoryPromises);
      } catch (err) {
        console.error('Error fetching categories and products:', err);
      } finally {
        isLoading.value = false;
      }
    };

    const filteredProducts = computed(() => {
      if (!searchText.value) {
        return products.value;
      }
      return products.value
        .map(category => ({
          ...category,
          product: category.product.filter(pro =>
            pro.productName.toLowerCase().includes(searchText.value.toLowerCase())
          ),
        }))
        .filter(category => category.product.length > 0);
    });

    return {
      searchText,
      filteredProducts,
      isLoading,
      isOpenDropdownSearch
    };
  },
};
</script>

<style scoped>
@keyframes fadeUp {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fadeUp 0.3s ease-in-out;
}
</style>
