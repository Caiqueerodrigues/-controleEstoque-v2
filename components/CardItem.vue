<template>
    <div>
        <v-card
            elevation="12"
            class="px-5 py-4 -xl d-inline-flex capitalize mt-2"
            color="golden5"
            height="100px"
            width="200"
            :id="this.index"
        >
            <v-row
                class="pa-1 justify-center"
            >
                <span>
                    {{ item }}
                </span>
            </v-row>
            <v-row
                class="mx-10 my-8 sale"
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
                    <span>
                        {{ quantity }}
                    </span>
                    <v-icon
                        class="mx-1"
                        color="color2"
                        @click="check(), carrinho ('-')"
                    >
                        mdi-minus
                    </v-icon>
                </v-form>
            </v-row>
        </v-card>
    </div>
</template>
<script>
export default {
    name: 'CarItem',
    props: ['select','index','item', 'sale'],
    data() {
        return {
            quantity: 0,
        }
    },
    methods: {
        check() {
            if(this.quantity > 0) {
                this.quantity--
            } else {
                this.quantity = 0
            }
        },
        carrinho (sinal) {
            let indicePesquisa = this.sale.findIndex(produto => produto.nome === this.item)
            if (this.quantity > 0 && indicePesquisa === -1) {
                this.sale.push({
                id: this.index,
                nome: this.item,
                quantidade: this.quantity
                })
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
            }
            // this.$emit('saleCreated', this.sale)
        },
    },
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