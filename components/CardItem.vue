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
                    <span>
                       Disponível {{  }} Kg
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
                            cols="8"
                        >
                            <v-text-field
                                v-model= "quantity"
                                autofocus="true"
                                clearable
                                color="#860B07"
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
    props: ['select','index','item', 'sale'],
    data() {
        return {
            quantity: null,
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
                    } else {
                        this.sale[indicePesquisa].quantidade = 0
                    }
                }
                this.sale[indicePesquisa].quantidade = this.quantity
            }
            // this.$emit('saleCreated', this.sale)
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
        }
    }
}
</script>
<style scoped>
.sale {
    position: absolute; 
}
.capitalize {
    text-transform: capitalize;
}
</style>