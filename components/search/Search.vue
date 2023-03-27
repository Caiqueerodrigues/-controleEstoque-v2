<template>
    <v-row
    >
        <v-card-text
            class="ml-16 mr-5 mt-0"
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
            class="mr-8 mt-3 pa-3"
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
        <!-- <v-btn
            elevation="8"
            size="x-large"
            variant="outlined"
            color="#28B4FA"
            class="mr-8 mt-3 pa-3"
        >
            <template
                v-slot:prepend
            >
                <v-icon>
                    mdi-plus-thick
                </v-icon>
                Cadastrar Produto
            </template>
        </v-btn> -->
        <register />
    </v-row>
</template>
<script>
  export default {
    name: 'SearchBar',
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
    },
  }
</script>
<style scoped>
    .v-card-text {
        max-width: 70% !important;
    }
</style>