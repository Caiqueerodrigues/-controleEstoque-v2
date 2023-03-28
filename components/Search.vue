<template>
    <v-row>
        <v-card-text
            class="ml-10 mt-0 w-50"
        >
            <v-text-field
                :loading="loading"
                density="compact"
                variant="solo"
                label="Pesquise por Nome"
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
                @click:append-inner="onClick"
            >
            </v-text-field>
        </v-card-text>
        <v-btn
            elevation="8"
            size="x-large"
            variant="outlined"
            color="#0f0"
            class="mr-8 mt-3 px-2 py-3 text-h6"
        >
            <template
                v-slot:prepend
            >
                <v-icon>
                    mdi-currency-usd
                </v-icon>
                Vender 
            </template>
        </v-btn>
        <Register :estoqueLocal="estoqueLocal" :dados="dados" :salvarLocal="salvarLocal"/>
        
    </v-row>
</template>
<script>
  export default {
    name: 'SearchBar',
    props: [ 'estoqueLocal','dados', 'salvarLocal'],
    data: () => ({
        loaded: false,
        loading: false,
    }),
    methods: {
      onClick () {
        this.loading = true

        setTimeout(() => {
          this.loading = false
          this.loaded = true
        }, 2000)
      },
    }
  }
</script>
<style scoped>
    .v-card-text {
        max-width: 80% !important;
    }
</style>