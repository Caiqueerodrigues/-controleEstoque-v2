<template>
    <div>
        <v-card
            elevation="12"
            class="px-5 py-4 -xl d-inline-flex capitalize mt-2"
            color="golden5"
            height="200px"
            width="200"
            :id="this.index"
        >
            <v-row>
                <v-col
                    cols="12"
                    class="pa-3 d-flex justify-center"
                >
                    <span>
                        {{ item }}
                    </span>
                </v-col>
                <!-- <v-col
                    cols="12"
                    class="pa-0 d-flex justify-center"
                >
                    <span
                        class="color1"
                    >
                       Disponível {{ itemQuantity }} Kg
                    </span>
                </v-col> -->
                <v-col
                    cols="12"
                    class="d-flex justify-center"
                >
                    <v-form
                        ref="formQuantidade"
                        class="d-inline-flex justify-center"
                    >
                        <v-col
                            cols="3"
                        >
                            <v-icon
                                class="mt-4"
                                color="color2"
                                @click="quantity++, carrinho('+')"
                            >
                                mdi-plus
                            </v-icon>
                        </v-col>
                        <v-col
                            cols="6"
                        >
                            <v-text-field
                                v-model= "quantity"
                                persist-hint 
                                :hint="itemQuantity"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col
                            cols="3"
                        >
                            <v-icon
                                class="mt-4"
                                color="color2"
                                @click="check(), carrinho ('-')"
                            >
                                mdi-minus
                            </v-icon>
                        </v-col>
                    </v-form>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>
<script>
export default {
    name: 'CardItem',
    props: ['select','index','item', 'sale', 'estoqueLocal'],
    data() {
        return {
            quantity: null,
            itemQuantity: null,
        }
    },
    methods: {
        check() {
            this.quantity = Number(this.quantity)
            if(this.quantity > 0) {
                this.quantity--
            } else {
                this.quantity = 0
            }
        },
        carrinho (sinal) {
            this.quantity = Number(this.quantity)
            this.estoqueLocal.forEach(element => {
                if(this.item === element.nome) {
                    if(this.quantity > element.quantidadeKg) {
                        this.quantity= 0
                    }
                }
            })
            let indicePesquisa = this.sale.findIndex(produto => produto.nome === this.item)
            if (this.quantity > 0 && indicePesquisa === -1) {
                this.sale.push({
                    id: this.index,
                    nome: this.item,
                    quantidade: this.quantity
                })
                return
            } else {
                if(sinal == '+') { 
                    this.sale[indicePesquisa].quantidade ++
                } else if (sinal == '-') {
                    if(this.quantity > 0) {
                        this.sale[indicePesquisa].quantidade --
                    } else if (this.quantity < 0) {
                        this.sale[indicePesquisa].quantidade = 0
                    }
                }
                this.sale[indicePesquisa].quantidade = this.quantity
            }
            this.$emit('saleCreated', this.sale)
        },
        checkQuantityItem() {
            this.estoqueLocal.forEach(element => {
                if(element.nome === this.item) {
                    this.itemQuantity = `${element.quantidadeKg}`
                }
            })
        },
        
    },
    watch: {
        quantity:
        {
            handler(newValue) {
                if(newValue) {
                    this.carrinho()
                }
            },
            immediate: true
        },
    },
    created() {
            this.checkQuantityItem()
        }
}
</script>
<style scoped>
.sale {
    position: absolute; 
}
.v-field--variant-filled, .v-field__overlay {
    background-color: transparent !important;
}
.capitalize {
    text-transform: capitalize;
}
.color1 {
    color: #860B07 !important;
    font-weight: bolder;
}
:deep(.v-field--variant-filled .v-field__overlay) {
    background-color: transparent;
}
:deep(.v-field__outline)  {
    /* --v-field-border-opacity: 0; */
    display: none;
}
</style>