<template>
  <header class="flex px-8 justify-between bg-white h-12 items-center mb-4" >
    <h3 class="text-green-500 text-xl"><router-link to="/shop">Магазин</router-link></h3>
    <ul class="flex">
      <li  class="mr-5"><router-link to="/shop">
        <img src="../assets/img/home.png" alt="" height="24" width="27" class="">
      </router-link></li>
      <li><router-link to="/shop/catalog/cart" class="cart">
        <div class="navbar-pc__notify absolute bg-red-500	text-[10px] leading-3	text-white min-w-[16px] -top-[6px]
        -right-[8px] rounded-full py-0.5 z-10	px-1.5" v-if="totalCountProduct > 0">
          {{ totalCountProduct }}
        </div>
        <img src="../assets/img/cart.svg" alt="" class="relative">

      </router-link></li>
    </ul>
  </header>
</template>

<script>
export default {
  name: "TheNavbar",
  data() {
    return {
      availabilityProductInCart: false
    }
  },
  computed: {
    totalCountProduct() {
      let products = this.$store.getters.getProductsInCart;
      let totalCountProduct = 0;
      for (let i = 0; i < products.length; i++) {
        totalCountProduct += products[i].countInCart
      }
      return totalCountProduct
    },
  },
}
</script>

<style>
.cart {
  position: relative;
}
</style>