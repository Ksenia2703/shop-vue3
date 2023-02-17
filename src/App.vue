<template>
  <the-navbar></the-navbar>
  <div class="w-full justify-center block flex">
  <div class="wrapper-content bg-slate-700 max-w-[1500px] w-full max-[450px]:px-0 max-[450px]:p-[5px]">
    <router-view></router-view>
  </div>
  </div>
  <div class="background-modals" :class="{'d-none' :backgroundModals === false}"></div>
</template>

<script>
import TheNavbar from "./components/TheNavbar";

export default {
  name: 'App',
  components: {
    TheNavbar,
  },
  computed: {
    backgroundModals() {
      return this.$store.state.opacity
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  margin-top: 0px;
  width: 100%;
  min-height: 100vh;
}

</style>
