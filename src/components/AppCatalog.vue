<template>
    <h1 class="text-4xl font-bold pb-3.5 max-[450px]:pb-6">Каталог товаров</h1>
    <div>
      <app-loader v-if="this.load === true">

      </app-loader>

      <div
          class="flex-col justify-start "
          style="display: flex"
          v-show="this.load === false">
        <app-filter-products
            @click="getFilterDiscount($event), getFilterDelivery($event)">

        </app-filter-products>
        <div
            class=" flex flex-wrap	pl-5 p-4 pt-0 max-[450px]:pl-0 max-[450px]:p-0 ">
          <app-cart-item class="hover:transition hover:scale-105 max-w-[25%] max-[950px]:max-w-[33.3%]
          max-[650px]:max-w-[50%] max-[840px]:hover:transition-none max-[840px]:hover:scale-100"
              v-for="product in getProducts"
              :key="product.article"
              :product_data="product" >
          </app-cart-item>
        </div>

      </div>
    </div>
</template>

<script>
import AppCartItem from "./AppCartItem";
import AppLoader from "./AppLoader"
import AppFilterProducts from "./AppFilterProducts";

export default {
  components: {AppCartItem, AppLoader, AppFilterProducts},
}


</script>
<script setup>
import {onMounted, computed, ref, onBeforeUpdate} from "vue";
import { useStore } from "vuex";
const store = useStore();
const getProducts = computed(() => {
  let filteredProducts = [];
  if (filterDiscount.value || filterDelivery.value) {
    for (let i=0; i < store.getters.getProducts.length; i++) {
      let currentItem = store.getters.getProducts[i]
      if (+filterDiscount.value <= +currentItem.discount && +filterDelivery.value >= +currentItem.delivery[0]) {
        filteredProducts.push(store.getters.getProducts[i]);
      }
    }
    return new Set(filteredProducts);
  } else {
    return store.getters.getProducts;
  }
});

onMounted(() => {
  store.dispatch("fetchProducts");
});

localStorage.products = JSON.stringify(store.getters.getProducts)


let load = ref(true)
setTimeout(function() {
  load.value = false;
}, 700);

onBeforeUpdate( () => {
  localStorage.products = JSON.stringify(store.getters.getProducts)
})

let filterDiscount = ref('')
let filterDelivery = ref('')


const getFilterDiscount = ((event) => {
  filterDiscount.value = store.getters.getSizeSelectedDiscount;
});
const getFilterDelivery = ((event) => {
  filterDelivery.value = store.getters.getSelectedDeliveryTime;
});
</script>
