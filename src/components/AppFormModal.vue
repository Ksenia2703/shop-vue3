<template>
    <div class="fixed top-[50%] left-[50%] shadow-custom rounded-lg mt-[-200px] translate-x-[-50%] w-auto
         z-20 max-w-[430px] bg-white pt-[13px] px-[15px] text-slate-700 w-[100%]">
      <div class="flex justify-end">
        <img class="cursor-pointer"
            src="../assets/img/close.png"
            alt=""
            @click="closeOrderProcessed">
      </div>
      <div>
        <h2 class="font-bold text-slate-700 text-2xl pb-4 pt-3">
          Введите данные для связи
        </h2>
        <form class="flex flex-col items-center">
          <input class="min-w-[80%] my-[10px] text-[16px] h-[35px] border-b active:outline-0 hover:outline-0
              focus:outline-0 active:outline-offset-0	hover:outline-offset-0	focus:outline-offset-0"
              @keydown="nameValidationForm($event)"
              type="text"
              id="name"
              v-model="name"
              placeholder="Имя"
              :class="{ border: nameValidation }"
              maxlength="18">

          <input class="min-w-[80%] my-[10px] text-[16px] h-[35px] border-b active:outline-0 hover:outline-0
              focus:outline-0 active:outline-offset-0	hover:outline-offset-0	focus:outline-offset-0"
              type="tel"
              id="tel"
              @keydown="telValidationForm($event)"
              v-model="tel"
              placeholder="Номер телефона"
              :class="{ border: telValidation }">
        </form>
        <button class="font-bold py-1.5 px-6 bg-green-500 rounded-full mb-[30px] text-white mt-[20px]
                disabled:cursor-not-allowed	disabled:opacity-100 disabled:bg-gray-200	disabled:text-slate-400"
                @click="sendForm"
                :disabled="!isValid">
          Отправить
        </button>
      </div>
    </div>
</template>

<script>

export default {
  name: "AppFormModal",
  data() {
    return {
      name: '',
      tel: '',
      nameValidation: false,
      telValidation: false,
      sendProducts: []
    }
  },
  mounted() {
    if (localStorage.name) {
      this.name = localStorage.name;
    }
  },
  watch: {
    name(newName) {
      localStorage.name = newName;
    }
  },
  computed: {
    isValid: function () {
      let name = this.name.length
      localStorage.name = this.name
      let tel = this.tel.length
      if (name >= 3 && tel >= 10) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    async sendForm() {
      let products = this.$store.getters.getProductsInCart
      for (let i = 0; i < products.length; i++) {
        let sendObject = {
          article: products[i].article,
          size: products[i].activeSize,
          count: products[i].countInCart
        };
        this.sendProducts.push(sendObject)
      }
      await fetch('https://form-56b47-default-rtdb.firebaseio.com/form.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.name,
          telephone: this.tel,
          products: this.sendProducts
        })
      })
      this.$store.commit('SET_SEND_FORM_DATA', false)
      this.$store.commit('SET_ORDER_PROCESSED', true)
    },

    nameValidationForm(event) {
      if ((event.keyCode !== 8 && event.keyCode < 60)) {
        event.preventDefault();
        event.target.value += '';
        return false;
      }
      this.nameValidation = this.name.length < 3;
      return true;
    },
    telValidationForm(event) {
      if ((event.keyCode !== 8 && event.keyCode < 48) || event.keyCode > 57) {
        event.preventDefault();
        event.target.value += '';
        return false;
      }
      this.telValidation = this.tel.length < 10;
      return true;
    },
    closeOrderProcessed() {
      this.$store.commit('SET_SEND_FORM_DATA', false)
      this.$store.commit('SET_OPACITY', false)
    },
  }
}
</script>
