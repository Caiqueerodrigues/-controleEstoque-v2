<template>
    <v-card-text
        class="pt-1"
    >
        <v-text-field
            v-model="searchInput"
            :loading="loading"
            density="compact"
            variant="solo"
            label="Pesquise por Nome"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
            @input="search()"
        >
        </v-text-field>
    </v-card-text>        
</template>
<script>
  export default {
    name: 'SearchBar',
    searchInput: '',
    props: [ 'estoqueLocal','dados', 'salvarLocal'],
    data: () => ({
        loaded: false,
        loading: false,
    }),
    methods: {
      search() {
        if(this.searchInput != ``) {
            this.loading = true

            setTimeout(() => {
                this.loading = false
                this.loaded = true
            }, 1000 * 2)
            for(let item in this.estoqueLocal) {
                let itemNome = this.estoqueLocal[item].nome
                let nomeMinusc = itemNome.toLowerCase().trim()
                let textInput = this.searchInput.toLowerCase().trim()
                if(!nomeMinusc.includes(textInput)) {
                    this.estoqueLocal[item].show = false
                } else {
                    this.estoqueLocal[item].show = true
                }
            }
        } else {
            for(let item in this.estoqueLocal) {
                this.estoqueLocal[item].show = true
            }
        }
      }
    }
  }
</script>
<style scoped>
    
</style>