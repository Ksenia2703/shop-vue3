<template>
  <div class="head-block flex flex-col">
    <div class=" flex flex-row ml-7 mb-3">
      <router-link to="/shop/catalog">
      <img
          src="../assets/img/back-arrow.svg"
          alt=""
          class="cursor-pointer rotate-[270deg] mr-3.5">
      </router-link>
      <router-link to="/shop">
      <span class="cursor-pointer mr-1.5 hover:text-green-500 max-[840px]:hidden">Главная</span>
      </router-link>
      <span class="mr-1.5 max-[840px]:hidden">/</span>
      <router-link to="/shop/catalog">
      <span class="cursor-pointer ml-1 hover:text-green-500 max-[840px]:hidden">Каталог</span>
      </router-link>
    </div>
    <div class="max-[840px]:hidden name-product text-2xl font-bold pb-3.5 text-left ml-7 mt-0">
      {{ product.name }}
    </div>
  </div>
  <div class="wrapper-content-block flex w-full max-[840px]:flex-col" >
    <div class=" w-[32%] px-7 rounded-lg max-[950px]:w-[50%] max-[840px]:flex max-[840px]:justify-center
         max-[840px]:w-full max-[840px]:pb-4">
      <img
          class="rounded-lg w-full max-[840px]:w-1/2 max-[650px]:w-[70%] max-[500px]:w-full"
          :src="require('../assets/img/' + product.image)">
    </div>
    <div class="name-product text-2xl font-bold pb-3.5 text-left px-4 mt-0 min-[841px]:hidden">
      {{ product.name }}
    </div>

    <div class="flex w-[64%] max-[950px]:flex-col max-[950px]:w-[50%] max-[840px]:w-full">
      <div class="info-block-wrapper text-left w-[50%] max-[950px]:w-[100%] max-[840px]:px-4 max-[840px]:mb-[185px]">
        <div class="composition-wrapper pb-[22px]">
          <div>
            <span class="text-zinc-400">Состав:</span>
            {{ product.composition }}
          </div>
        </div>
        <div class="pb-[22px]">
          <span class="text-zinc-400">Цвет:</span> {{ product.color }}
        </div>
        <div>
          <span class="text-zinc-400 border-dashed border-b border-zinc-400 pb-0.5">
            Доступные размеры:
          </span>
          <div class="flex sizes-list">
            <li class="py-1.5 px-2.5 m-2.5 border rounded-lg list-none cursor-pointer hover:border-green-500
                hover:text-green-500 hover:scale-110"
                v-for="size in product.size"
                :key="size.size"
                @click="sizesList(size, $event)">
              {{ size }}
            </li>
          </div>
        </div>
        <div class="flex mt-[22px] max-[840px]:min-w-full">
          <img
              src="../assets/img/return.svg"
              alt=""
              class="pr-[15px]">
          <div>14 дней на возврат</div>
        </div>
        <div class="flex mt-[22px]">
          <img
              src="../assets/img/fitting.svg"
              class="pr-[15px]">
          <div>Возможна примерка</div>
        </div>
      </div>

      <div class="text-left w-[50%] max-[950px]:w-[100%] max-[950px]:pt-5">
        <div class="rounded-none price-container p-6  w-full text-black	bg-white text-left max-[840px]:max-w-[900px]
             min-[841px]:max-w-[400px] min-[841px]:rounded-2xl max-[840px]:fixed max-[840px]:bottom-0
             max-[840px]:shadow-custom">
          <div>
            <span class="font-black text-xl	text-slate-700">
              {{ product.price - Math.round(product.price/100*product.discount) }} ₽
            </span>
            <del class="price-info-old ml-[10px] font-bold text-slate-500	">{{ product.price }} ₽</del>
          </div>
          <button
              class="btn-product-in-cart rounded-lg w-full h-[45px] text-white bg-green-500 mt-[20px]
              font-bold hover-cursor hover:transition-colors duration-300 hover:scale-105 "
              @click="toggle"
              :class="{ active: isActive }"
              v-if="show === false">
            Добавить в корзину
          </button>
          <router-link to="/shop/catalog/cart">
          <button v-if="show === true"
                  class="rounded-lg w-full h-[45px] text-white bg-slate-500
                  mt-[20px] font-bold hover:transition hover:scale-105 duration-300"
                  @click="reset">
            Перейти в корзину
          </button>
          </router-link>

          <div class="mt-[20px] text-slate-500 text-[14px]">
            Доставка со склада в течении: {{ product.delivery }}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "AppProductInNewWindow",
  data() {
    return {
      product: '',
      article: '',
      isActive: false,
      show: false,
      activeSizes: false,
    }
  },
  created() {
    this.product = this.$store.getters.getProductInNewWindow
    this.productsInCart = this.$store.getters.getProductsInCart
  },
  methods: {
    activeSize() {
      this.activeSizes = !this.activeSizes
    },

    reset() {
      this.$store.commit('SET_SIZE_SELECTED_DISCOUNT', '');
    },

    toggle() {
      let obj = {
        article: this.product.article,
        countInCart: 1,
        name: this.product.name,
        price: this.product.price,
        image: this.product.image,
        color: this.product.color,
        activeSize: this.product.activeSize,
        discount: this.product.discount,
        delivery: this.product.delivery,
      }
      let isAddCount = false

      if (this.$store.state.sizeSelectedProduct === '') {
        let elements = document.querySelectorAll('.sizes-list li')
        for (let i = 0; i < elements.length; i++) {
          elements[i].className += ' text-green-500 border-green-500';
        }
        setTimeout(function() {
          for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('text-green-500');
            elements[i].classList.remove('border-green-500');
          }
        }, 1000);
      } else {
        this.show = !this.show
        if (this.productsInCart.length === 0) {
          this.$store.commit('SET_SIZE_SELECTED_DISCOUNT_OBJ', obj);
        } else {
          for (let i = 0; i < this.productsInCart.length; i++) {
            let productsInCart = this.productsInCart[i];
            if (productsInCart.article === this.product.article && productsInCart.activeSize === this.product.activeSize) {
              this.productsInCart[i].countInCart += 1
              isAddCount = true
              break
            }
          }
          if (isAddCount === false) {
            this.productsInCart.push(obj)
          }
        }
      }
    },
    sizesList(id, e) {
      let options = document.querySelectorAll('.sizes-list li');
      options.forEach(function(o){
        o.className = 'list-none rounded-lg border py-1.5 px-2.5 m-2.5 cursor-pointer border';
      });

      e.target.className = e.target.className === "active-size"?"":"m-2.5 text-green-500 border-green-500 list-none " +
          "rounded-lg border py-1.5 px-2.5 ' : activeSizes pb-0";
      this.isActive = false
      this.show = false
      this.$store.commit('SET_SIZE_SELECTED_PRODUCT', e.target.textContent);
      this.product.activeSize = this.$store.state.sizeSelectedProduct
    }
  },
}
</script>
