<template>
    <v-row justify="center">
        <v-dialog
            v-model="show"
            persistent
            width="80%"
        >
            <v-card
                class="dialogSale"
            >
                <!--Title-->
                <v-card-title
                    class="text-center"
                >
                    <span 
                        class="text-h5 golden2"
                    >
                        Efetuar Venda
                    </span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-combobox
                                    @mouseenter="verificacaoItems()"
                                    v-model="select"
                                    :items="items"
                                    autofocus
                                    chips
                                    color="golden2"
                                    label="Produtos para Venda"
                                    class="capitalize golden2"
                                    multiple
                                    clearable
                                ></v-combobox>
                                <v-row
                                    class="d-flex justify-space-evenly flex-wrap"
                                >
                                    <CardItem 
                                        :sale="sale"
                                        v-show="show"
                                        :select="select"
                                        :index="index"
                                        :item="item"
                                        v-for="(item, index) in select"
                                            :key="index"
                                    />
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions
                    class="pr-10 pb-5"
                >
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue-darken-1"
                        class="mx-5"
                        variant="outlined"
                        @click="clearForm()"
                    >
                        Fechar
                    </v-btn>
                    <v-btn
                        color="#0f0"
                        variant="outlined"
                        @click="venda()"
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
            items: [],
            quantity: [0],
            sale: [],
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
            this.sale= []
            this.show = false 
        },
        venda () {
            this.sale.forEach((itemSale)=> {
                this.estoqueLocal.forEach(element => {
                    if(itemSale.nome === element.nome) {
                        if(element.quantidadeKg >= itemSale.quantidade) {
                            element.quantidadeKg -= itemSale.quantidade
                            element.vendido += itemSale.quantidade
                            if ( element.quantidadeKg == 0) {
                                element.status = 'indisponível'
                            }
                            console.log(this.sale)
                            this.clearForm()
                        } else {
                            alert(`[ERRO] Quantidade Informada maior que o estoque Disponível`)
                        }
                    }
                })
            })
            //Para autualizar os dados localmente
            if(this.dados === true) {
                this.salvarLocal()
            }
        },
        verificacaoItems () {
            if(this.estoqueLocal.length > this.items.length) {
                this.items = []
                this.constructorItems()
            }
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
.dialogSale {
    background-color: #860B07 !important;
}
.golden2 {
    color: #F8F25F;
}
.capitalize {
    text-transform: capitalize;
}
</style>