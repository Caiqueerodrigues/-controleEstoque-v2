<template>
    <div>
        <v-card
            elevation="12"
            class="px-5 py-4 -xl d-inline-flex capitalize mt-2"
            color="golden5"
            height="300px"
            width="200"
            :id="this.index"
        >
            <v-row>
                <v-col
                    cols="12"
                    class="pa-1 d-flex justify-center"
                >
                    <span>
                        {{ item }}
                    </span>
                </v-col>
                <v-col
                    cols="12"
                    class="d-flex justify-center"
                >
                    <v-form
                        ref="formQuantidade"
                    >
                        <v-icon
                            class="mx-1"
                            color="color2"
                            @click="quantity++, carrinho('+')"
                        >
                            mdi-plus
                        </v-icon>
                        <!-- <span>
                            {{ quantity }}
                        </span> -->
                        <v-text-field
                            v-model= "quantity"
                            id="inputQuantity"
                            autofocus="true"
                            clearable                      
                        >
                        </v-text-field>
                        <v-icon
                            class="mx-1"
                            color="color2"
                            @click="check(), carrinho ('-')"
                        >
                            mdi-minus
                        </v-icon>
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

.inputQuantity {
    width: 10px !important;
    height: 10px !important;
}
.capitalize {
    text-transform: capitalize;
}
</style>