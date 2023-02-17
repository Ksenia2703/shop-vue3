<template>
  <div class="shadow-custom rounded-lg p-[20px] mt-[20px] bg-white max-[840px]:flex max-[840px]:justify-between
    max-[840px]:items-start">
    <h2 class="text-[20px] font-bold border-b border-gray-400 pb-2.5 text-slate-700 mb-3 max-[840px]:hidden">
      Информация о заказе
    </h2>
    <div>
    <div class="flex justify-between font-bold text-[20px] text-black mb-3">
      <div class="text-slate-700 max-[840px]:hidden">
        Итого
      </div>
      <div class="text-slate-700">
        {{ totalSumProduct }} ₽
      </div>
    </div>

    <div class="flex justify-between mb-3 mt-3 text-slate-500">
      <div class="max-[840px]:hidden">
        Всего товаров
      </div>
      <div>
        {{ totalCountProduct }} шт
      </div>
    </div>
    <div class="flex justify-between my-[15px] text-slate-500 max-[840px]:hidden">
      <div>
        Скидка
      </div>
      <div
          id="discountAll">
        - {{ discountAllProducts }} ₽
      </div>
    </div>
    </div>
    <button
        class="rounded-full px-6 py-1.5 text-[17px] text-white bg-green-500 mt-[20px] font-bold
        hover-cursor hover:transition-colors duration-300 hover:scale-105"
        @click="orderProcessed">
      Купить
    </button>
  </div>
</template>

<script>
export default {
  name: "AppTotalPriceInCart",
  computed: {
    getProductsInCart() {
      return this.$store.getters.getProductsInCart
    },
    totalCountProduct() {
      let products = this.$store.getters.getProductsInCart;
      let totalCountProduct = 0;
          for (let i = 0; i < products.length; i++) {
            totalCountProduct += products[i].countInCart
          }
      return totalCountProduct
    },
    totalSumProduct() {
      let products = this.$store.getters.getProductsInCart;
      let totalSumProduct = 0
      for (let i = 0; i < products.length; i++) {
        totalSumProduct += (products[i].price - Math.round(products[i].price/100*products[i].discount)) * products[i].countInCart
      }
      return totalSumProduct
    },
    discountAllProducts() {
      let products = this.$store.getters.getProductsInCart;
      let discountAll = 0;
      for (let i = 0; i < products.length; i++) {
        discountAll += Math.round(products[i].price / 100 * products[i].discount) * products[i].countInCart
      }
      return discountAll
    }
  },
   methods: {
     orderProcessed() {
       this.$store.commit('SET_SEND_FORM_DATA', true);
       this.$store.commit('SET_OPACITY', true);
     },
   }
}
</script>