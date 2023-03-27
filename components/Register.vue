<template>
    <v-layout class="d-flex">
        <v-navigation-drawer
            v-model="drawer"
            temporary
            width="600"
            location="right"
            class="pa-5"
        >
             <template v-slot:prepend>
                <v-list-item>
                    <h1
                        class="my-4" 
                    >
                        Cadastrar Produto
                    </h1>
                </v-list-item>
            </template>
            <v-list>
                <v-list-item>
                    <Form  :estoqueLocal="estoqueLocal" :dados="dados" :salvarLocal="salvarLocal"/>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <div 
            class="d-flex justify-center align-center h-100">
            <v-btn
                @click.stop="drawer = !drawer"
                elevation="8" 
                size="x-large"
                variant="outlined"
                color="#28B4FA"
                class="px-2 text-h6"
            >
                <template
                    v-slot:prepend
                >
                    <v-icon>
                        mdi-plus-thick
                    </v-icon>
                    Cadastrar Produto
                </template>
            </v-btn>
        </div>
    </v-layout>
</template>
<script>
import Form from './form/Form.vue'
  export default {
    name: 'RegisterProduct',
    props: ['estoqueLocal', 'dados', 'salvarLocal'],
    data () {
      return {
        drawer: null,
      }
    },
    components: {
        Form
    }
  }
</script>
<style scoped>
    @media(max-width: 424px) {
        
    }
</style>