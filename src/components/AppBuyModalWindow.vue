<template>
  <div class="fixed top-[50%] left-[50%] shadow-custom rounded-lg mt-[-200px] translate-x-[-50%] w-auto
         z-20 max-w-[430px] bg-white pt-[13px] px-[15px] text-slate-700 w-[100%]">
    <div class="flex justify-end">
      <img class="cursor-pointer"
          src="../assets/img/close.png"
          alt=""
          @click="closeOrderProcessed">
    </div>
    <div class="text-slate-700 pb-[20px] pt-[10px]">
      <h2 class="font-bold text-2xl pb-[15px]">Заказ оформлен!</h2>
      <p class="px-[15px] text-[16px]">В ближайшее время с вами свяжутся наши менеджеры</p>
      <button
          class="font-bold py-1.5 px-6 bg-green-500 rounded-full mb-[5px] text-white mt-[20px]
                disabled:cursor-not-allowed	disabled:opacity-100 disabled:bg-gray-200	disabled:text-slate-500 animate-bounce"
          @click="closeOrderProcessed">
        Закрыть
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppBuyModalWindow",
  methods: {
    closeOrderProcessed() {
      this.$store.commit('SET_ORDER_PROCESSED', false);
      this.$store.commit('SET_OPACITY', false);
      this.$store.commit('SET_PRODUCTS_IN_CART', []);
    }
  }
}
</script>