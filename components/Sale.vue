<template>
    <v-layout>
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
            
            <v-col
                class="d-flex justify-center"
            >
                <v-btn
                    color="#0f0"
                    variant="outlined"
                    size="large"
                    class="btnConfirmar mt-1"
                >
                Confirmar Venda
                </v-btn>
            </v-col>
        </v-navigation-drawer>
    </v-layout>
</template>
<script>
export default {
    name: 'SaleProduct',
    props: ['estoqueLocal', 'dados', 'salvarLocal', 'showSale'],

    data () {
      return {
        drawer: false,
      }
    },
    methods: {
    },
    computed: {
        show: {
            get() {
                return this.showSale;
            },
            set(nv) {
                this.$emit("closeSale", nv);
            },
        }
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
</style>