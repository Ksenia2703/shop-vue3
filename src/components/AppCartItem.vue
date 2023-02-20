<template>
  <router-link
      :to="`/shop/catalog/${product_data.article}`">
    <div
        class="hover-cursor rounded-lg p-5 hover:shadow-custom max-[450px]:p-[10px] max-[840px]:hover:shadow-none"
        @click="articleForNewWindowInCartItem">
      <div class="relative">
        <img class="rounded-lg"
            :src="require('../assets/img/' + product_data.image)"
            alt="img">

        <div class="absolute bottom-1.5 left-2.5 bg-green-500 px-1.5 py-1 text-sm rounded-lg">
          - {{ product_data.discount }}%
        </div>
      </div>
      <div class="small-mrg pt-2 text-left">
        <span class="font-black pr-1 text-[16px]">
          {{ product_data.price - Math.round(product_data.price/100*product_data.discount) }} ₽
        </span>
        <del class="text-[15px] text-slate-500 font-bold">
          {{ product_data.price }}₽
        </del>
      </div>
      <p class="text-left mt-1 text-[14px]">
        {{product_data.name}}
      </p>
  </div>

  </router-link>
</template>

<script>
export default {
  props: {
    product_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    articleForNewWindowInCartItem() {
      this.$store.commit('SET_PRODUCT_IN_NEW_WINDOW', this.$store.getters.getProductByArticle(this.product_data.article))
    },
  }
}
</script>
