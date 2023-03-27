<template>
  <div class="app">
    <main>
      <MainPage />
    </main>
  </div>
</template>
<script>
  import MainPage from './components/main/MainPage.vue';
  export default {
    name: 'Home',
    components: { MainPage },
    data() {
      return {

      }
    }
  }
</script>
