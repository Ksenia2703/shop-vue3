<template>
  <div
      class="w-full rounded-lg text-left mt-[17px] flex max-w-full mt-0 pb-[20px] max-[450px]:pl-3 pl-7">
    <div class="sale-block pb-2.5 mr-[25px]" @click="amountDiscount($event)">
      <div class="flex justify-between pb-1.5 text-[16px] shadow-custom rounded-lg text-center
    px-3 pt-1.5 cursor-pointer relative">
        Скидка
        <div>
          <img src="../assets/img/down.png" alt="" class="h-[15px] pl-2 mt-[7px] ">
        </div>
      </div>
      <div class="bg-slate-50 rounded-lg text-slate-700 p-4 mt-2 absolute z-20 shadow-custom"
           v-if="this.isOpenDiscountFilter === true">
        <div class="checkbox pb-[5px]">
          <label class="sale-radio hover-cursor cursor-pointer">
            <input
                class="discount radio chbx accent-slate-700"
                type="radio"
                name="discount"
                value="0"/>
            Любая
          </label>
        </div>
        <div class="checkbox pb-[5px]">
          <label class="hover-cursor cursor-pointer">
            <input
                class="discount radio chbx accent-slate-700"
                type="radio"
                name="discount"
                value="10"/>
            от 10% и выше
          </label>
        </div>
        <div class="checkbox pb-[5px]">
          <label class="hover-cursor cursor-pointer">
            <input
                type="radio"
                class="discount chbx accent-slate-700"
                name="discount"
                value="30"/>
            от 30% и выше
          </label>
        </div>
        <div class="checkbox pb-[5px]">
          <label class="hover-cursor cursor-pointer">
            <input
                type="radio"
                class="discount chbx accent-slate-700"
                name="discount"
                value="50"/>
            от 50% и выше
          </label>
        </div>
        <div class="checkbox">
          <label class="hover-cursor cursor-pointer">
            <input
                type="radio"
                class="discount chbx accent-slate-700"
                name="discount"
                value="70"/>
            от 70% и выше
          </label>
        </div>
      </div>
    </div>

    <div @click="selectedTime($event)">
      <div class="justify-between pb-1.5 text-[16px] shadow-custom rounded-lg
    text-center flex px-3 pt-1.5 cursor-pointer">
        Сроки доставки
        <div>
          <img src="../assets/img/down.png" alt="" class="h-[15px] pl-2 mt-[7px] ">
        </div>
      </div>
      <div class="bg-slate-50	rounded-lg text-slate-700 p-4 mt-2 absolute z-20 shadow-custom"
           v-if="this.isOpenDeliveryFilter === true">
        <div class="checkbox pb-[5px]">
          <label class="hover-cursor cursor-pointer">
            <input
                class="delivery radio accent-slate-700"
                type="radio"
                name="trip"
                value="6"/>
            Любой
          </label>
        </div>
        <div class="checkbox pb-[5px]">
          <label class="cursor-pointer">
            <input
                type="radio"
                class="delivery accent-slate-700"
                name="trip"
                value="1"/>
            до 1 дней
          </label>
        </div>
        <div class="checkbox pb-[5px]">
          <label
              class="cursor-pointer">
            <input
                type="radio"
                class="delivery accent-slate-700"
                name="trip"
                value="2"/>
            до 2 дней
          </label>
        </div>
        <div class="checkbox pb-[5px]">
          <label
              class="cursor-pointer">
            <input
                type="radio"
                class="delivery accent-slate-700"
                name="trip"
                value="3"/>
            до 3 дней
          </label>
        </div>
        <div class="checkbox pb-[5px]">
          <label
              class="cursor-pointer">
            <input
                type="radio"
                class="delivery accent-slate-700"
                name="trip"
                value="5"/>
            до 5 дней
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpenDiscountFilter: false,
      isOpenDeliveryFilter: false
    }
  },
  name: "AppFilterProducts",
  methods: {
    amountDiscount(e) {
      if (e.target.classList.contains('click-sale') && this.isOpenDiscountFilter) {
        this.isOpenDiscountFilter = false;
        return false;
      }

      this.isOpenDiscountFilter = true;
      this.isOpenDeliveryFilter = false;

      if (e.target.classList.contains('discount')) {
        this.isOpenDiscountFilter = false;
        this.$store.commit('SET_SIZE_SELECTED_DISCOUNT', e.target.value);
        let selectedDiscount = this.$store.getters.getSizeSelectedDiscount
        let allProducts = this.$store.getters.getProducts
        let productsDiscount = this.$store.getters.getProductsSuitableDiscount
        for (let i = 0; i < allProducts.length; i++) {
          if (allProducts[i].discount >= selectedDiscount) {
            productsDiscount.push(allProducts[i])
          }
        }
      }
    },

    selectedTime(e) {
      if (e.target.classList.contains('click-time') && this.isOpenDeliveryFilter) {
        this.isOpenDeliveryFilter = false;
        return false;
      }

      this.isOpenDeliveryFilter = true;
      this.isOpenDiscountFilter = false;

      if (e.target.classList.contains('delivery')) {
        this.isOpenDeliveryFilter = false;
        this.$store.commit('SET_SELECTED_DELIVERY_TIME', e.target.value);
        let selectedTime = this.$store.getters.getSelectedDeliveryTime
        let allProducts = this.$store.getters.getProducts
        let productsDelivery = this.$store.getters.getProductsSuitableDeliveryTime

        for (let i = 0; i < allProducts.length; i++) {
          if (allProducts[i].delivery <= selectedTime) {
            productsDelivery.push(allProducts[i])
          }
        }
      }
    },
  },
}
</script>