<template>
  <div class=" flex justify-between w-full p-[20px] basis-1/4 flex-col rounded-lg shadow-custom mx-[17px]
       mb-[25px] bg-white	text-black max-[840px]:rounded-none	max-[840px]:mb-0 max-[840px]:shadow-none
       max-[840px]:border-b max-[840px]:border-inherit">
    <div class="flex justify-between">
      <div class="flex min-w-[60%]">
        <div>
          <img :src="require('../assets/img/' + product_data.image)" class="max-w-[150px] max-h-[150px] rounded-lg
               max-[500px]:max-w-[100px] max-[500px]:max-h-[100px]">
        </div>
        <div class=" flex text-left flex-col	mt-[5px] ml-[15px] max-[460px]:mt-0 max-[460px]:text-[14px]">
          <div
              class="font-bold text-slate-700 max-[420px]:text-[12px]">
            {{ product_data.name }}
          </div>
          <div class="mb-[5px] text-slate-500 max-[420px]:text-[10px]">
            Цвет: {{ product_data.color }}
          </div>
          <div class="text-slate-500 max-[420px]:text-[10px]">
            Размер: {{ product_data.activeSize }}
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between w-full ml-[25px] max-[760px]:justify-end">
        <div class="max-[760px]:hidden px-[15px] text-slate-700 font-bold">
          <button
              class="mr-1.5 text-slate-700 py-[8px] px-[19px] rounded-full shadow-lg bg-zinc-200 w-[48px]
              font-bold"
              @click="removeCountInCart">
            -
          </button>
            {{ product_data.countInCart }}
          <button
              class="ml-1.5 text-slate-700 py-[8px] px-[19px] rounded-full shadow-lg bg-zinc-200 w-[48px]
              font-bold"
              @click="addCountInCart">
            +
          </button>
        </div>
        <div class="text-right">
          <div class="font-extrabold text-[20px] max-[460px]:text-[15px] text-slate-700
          max-[420px]:text-[13px]">
            {{ totalPriceItem }} ₽
          </div>
          <del class="reset-sale font-black text-[15px] max-[460px]:text-[12px]
                text-slate-500 border-zinc-400 border-b border-dashed max-[420px]:text-[10px]">
            {{ discountAllProducts }} ₽
          </del>
        </div>
        </div>
      </div>
    <div class="flex mt-[12px]">
      <div class="min-[761px]:hidden text-slate-700 font-bold">
        <button
            class="max-[420px]:px-[13px] remove-count mr-1.5 text-slate-700 py-[8px] px-[19px] rounded-full shadow-lg bg-zinc-200 w-[48px]
            font-bold"
            @click="removeCountInCart">
          -
        </button>
        {{ product_data.countInCart }}
        <button
            @click="addCountInCart"
            class="ml-1.5 text-slate-700 py-[8px] px-[19px] rounded-full shadow-lg bg-zinc-200 w-[48px]
            font-bold">
          +
        </button>
      </div>
    </div>
    </div>
</template>

<script>
export default {
  name: "AppProductInCart",
  props: {
    product_data: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  computed: {
    totalPriceItem() {
      return (this.product_data.price - Math.round(this.product_data.price/100*this.product_data.discount)) * this.product_data.countInCart
    },
    discountAllProducts() {
      return Math.round(this.product_data.price / 100 * this.product_data.discount) * this.product_data.countInCart
    },
  },

  methods: {
    addCountInCart() {
      let getProducts = this.$store.getters.getProductsInCart
      this.$store.commit('SET_INDEX_PRODUCT_IN_ARRAY', this.$store.getters.getProductsByIndex(this.product_data.article))
      let index = this.$store.getters.getIndexProductInArray
      getProducts[index].countInCart += 1

    },
    removeCountInCart() {
      let getProducts = this.$store.getters.getProductsInCart
      this.$store.commit('SET_INDEX_PRODUCT_IN_ARRAY', this.$store.getters.getProductsByIndex(this.product_data.article))
      let index = this.$store.getters.getIndexProductInArray
      if (getProducts[index].countInCart === 1) {
        this.$store.commit('DELETE_PRODUCT_FROM_CART', index)
      } else {
        getProducts[index].countInCart = getProducts[index].countInCart - 1
      }
    }
  },

}
</script>
