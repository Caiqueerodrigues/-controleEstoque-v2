<template>
    <v-layout class="d-flex mx-0">
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
                    <v-icon
                        class="float-right mt-n12"
                        id="close"
                        @click="closeDrawer()"
                    >
                        mdi-alpha-x-box-outline
                    </v-icon>
                </v-list-item>
            </template>
            <v-list>
                <v-list-item>
                    <Form  :estoqueLocal="estoqueLocal" :dados="dados" :salvarLocal="salvarLocal" :drawer="drawer"/>
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
                class="px-2 text-h6 mx-0"
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
  export default {
    name: 'RegisterProduct',
    props: ['estoqueLocal', 'dados', 'salvarLocal'],
    data () {
      return {
        drawer: false,
      }
    },
    methods: {
        closeDrawer() {
            this.drawer = !this.drawer
        }
    }
  }
</script>
<style scoped>
    
</style>