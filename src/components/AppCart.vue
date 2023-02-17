<template>
  <div class="h-[100%] mx-7 max-[840px]:mx-0">
    <h1 class="text-4xl font-bold pb-3.5"
        v-if="getProductsInCart.length === 0">
      Корзина пока пустая!
    </h1>
    <h1 v-else
        class="text-4xl font-bold pb-3.5">
      Корзина
    </h1>
    <router-link to="/shop/catalog">
    <button class="rounded-full px-6 py-1.5 text-[17px] text-white bg-green-500 mt-[20px] font-bold
    hover-cursor hover:transition-colors duration-300 hover:scale-105 my-[15px]">
      Вернуться в каталог
    </button>
    </router-link>
    <div class="flex flex-col items-center mt-[20px] max-[840px]:mb-[110px]">
      <app-product-in-cart
          v-for="product in getProductsInCart"
          :key="product.article"
          :product_data="product">

      </app-product-in-cart>
    </div>

    <app-total-price-in-cart
        class="max-w-[550px] mb-[30px] max-[840px]:min-w-full max-[840px]:rounded-none max-[840px]:fixed
        max-[840px]:bottom-0 max-[840px]:mb-0"
        v-if="getProductsInCart.length > 0">

    </app-total-price-in-cart>


    <app-buy-modal-window class="z-20"
        v-if="orderProcessed === true">

    </app-buy-modal-window>

    <app-form-modal class="z-20"
        v-if="sendFormData === true">

    </app-form-modal>
  </div>
</template>

<script>
import AppProductInCart from "./AppProductInCart";
import AppTotalPriceInCart from "./AppTotalPriceInCart";
import AppBuyModalWindow from "./AppBuyModalWindow";
import AppFormModal from "./AppFormModal";

export default {
  name: "AppCart",
  components: {
        AppProductInCart,
        AppTotalPriceInCart,
        AppBuyModalWindow,
        AppFormModal
  },
  props: {
    products_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    getProductsInCart() {
      return this.$store.getters.getProductsInCart
    },
    orderProcessed() {
      return this.$store.getters.getOrderProcessed
    },
    sendFormData() {
      return this.$store.getters.getSendFormData
    }
  },
}
</script>
