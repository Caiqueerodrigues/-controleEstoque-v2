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
                <!--<v-list-item  
                    value="categoria"
                >
                    <p 
                        class="font-weight-black" 
                    > 
                        Insira o nome da categoria
                    </p>
                    <InputsCategory />
                </v-list-item>
                <v-list-item  
                    value="nome"
                >   
                    <p 
                        class="font-weight-black" 
                    > 
                        Insira o nome do Produto
                    </p>
                    <InputsName />
                </v-list-item>
                <v-list-item
                    value="quantidade"
                >
                    <p 
                        class="font-weight-black" 
                    > 
                        Informe a Quantidade
                    </p>
                    <InputsQuantity />
                </v-list-item>
                <v-list-item
                    value="descrição"
                >
                    <p
                        class="font-weight-black"
                    >
                        Faça uma breve Descrição
                    </p>
                    <InputsDescription />
                </v-list-item> -->
                <v-list-item>
                    <Form />
                </v-list-item>
                <v-list-item>
                    <v-btn
                        elevation="8"
                        size="x-large"
                        color="#28B4FA"
                        class="mr-8 mt-3 pa-3 w-100"
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
                class="pa-3"
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
    data () {
      return {
        drawer: null,
      }
    },
  }
</script>
<style scoped>

</style>