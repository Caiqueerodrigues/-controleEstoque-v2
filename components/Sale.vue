<template>
    <!-- <v-layout>
        <v-navigation-drawer
            v-model="show"
            temporary
            id="drawer"
            location="top"
            class="pa-5 h-75"
        >
            <h1
                class="my-2 text-center" 
            >
                Efetuar Venda
            </h1>
            <v-icon
                class="float-right mt-n12"
                id="close"
                @click="show = false"
            >
                mdi-alpha-x-box-outline
            </v-icon>
            <v-table>
                <thead>
                    <th>
                        
                    </th>
                    <th 
                        class="text-left pl-2"
                    >
                        Categoria
                    </th>
                    <th
                        class="text-left pl-8"
                    >
                        Nome
                    </th>
                    <th 
                        class="text-left"
                    >
                        Quantidade
                    </th>
                    <th
                        class="text-center"
                    >
                        Venda
                    </th>
                    <th 
                        class="text-center"
                    >
                        Vendidos
                    </th>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, index) in estoqueLocal"
                        :key="index"
                    >
                        <td>
                            {{ item.categoria }}
                        </td>
                        <td>
                            {{ item.nome }}
                        </td>
                        <td>
                            {{ item.quantidadeKG }} Kg/Un
                        </td>
                        <td
                            class="text-center"
                        >
                            <v-form>
                                <v-text-field
                                v-model="sale"
                                label="Qtd"
                                ></v-text-field>
                            </v-form>
                        </td>
                        <td
                            class="text-center"
                        >
                            {{ item.vendido }}
                        </td>
                    </tr>
                </tbody>
            </v-table>
            
            
        </v-navigation-drawer>
    </v-layout> -->
    <v-row justify="center">
        <v-dialog
            v-model="show"
            persistent
            width="80%"
        >
            <v-card>
                <!--Title-->
                <v-card-title
                    class="text-center"
                >
                    <span 
                        class="text-h5"
                    >
                        Efetuar Venda
                    </span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-combobox
                                    v-model="select"
                                    :items="items"
                                    autofocus
                                    chips
                                    label="Produtos para Venda"
                                    class="capitalize"
                                    multiple
                                    clearable
                                ></v-combobox>
                                <v-row
                                    class="d-flex justify-space-evenly flex-wrap"
                                >
                                    <v-card
                                        v-for="(item, index) in select"
                                        :key="index"
                                        elevation="12"
                                        class="px-5 py-4 rounded-xl d-inline-flex capitalize mt-2"
                                        color="color2"
                                        height="100px"
                                        width="200"
                                        v-model="quantity"
                                    >
                                        <v-row
                                            class="pa-1 justify-center"
                                        >
                                            {{ item }}
                                        </v-row>
                                        <v-row
                                            class="mx-10 my-8 sale"
                                        >
                                            <v-icon
                                                color="golden2"
                                                @click="quantity++"
                                            >
                                                mdi-plus-circle
                                            </v-icon>
                                            <span>
                                                {{ quantity }}
                                            </span>
                                            <v-icon
                                                color="golden2"
                                                @click="quantity--"
                                            >
                                                mdi-minus-circle
                                            </v-icon>
                                        </v-row>
                                        
                                    </v-card>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue-darken-1"
                        variant="outlined"
                        @click="clearForm()"
                    >
                        Fechar
                    </v-btn>
                    <v-btn
                        color="#0f0"
                        variant="outlined"
                        @click="clearForm()"
                    >
                        Salvar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
export default {
    name: 'SaleProduct',
    props: ['estoqueLocal', 'dados', 'salvarLocal', 'showSale'],

    data () {
      return {
        dialog: false,
        select: [],
        items:[],
        quantity: [0],
        sale: {}
      }
    },
    methods: {
        constructorItems () {
            this.estoqueLocal.forEach(element => {
                this.items.push(element.nome)
            })
        },
        clearForm() {
            this.select = []
            this.show = false 
        }
    },
    created () {
        this.constructorItems()
    },
    computed: {
        show: {
            get() {
                return this.showSale;
            },
            set(nv) {
                this.$emit("closeSale", nv);
            },
        },
        
    },
}
</script>
<style scoped>
thead > tr > th {
    color: #b98f05 !important;
    background-color: #860B07 !important;
}
.v-table {
    text-transform: capitalize;
    color: #860B07;
    border: 2px solid #F8F25F;
    max-width: 85%;
    margin: auto;
}
.sale {
    /* display: block !important;
    text-align: center !important;
    height: min-content !important;
    width: 100% !important; */
    position: absolute;
    
}
.capitalize {
    text-transform: capitalize;
}
</style>