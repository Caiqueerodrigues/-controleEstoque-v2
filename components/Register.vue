<template>
    <v-layout class="d-flex mx-0">
        <v-navigation-drawer
            v-model="show"
            temporary
            location="right"
            class="pa-5 w-50"
        >
            <h1
                class="my-4" 
            >
                Cadastrar Produto
            </h1>
            <!--X-->
            <v-icon
                class="float-right mt-n12"
                id="close"
                @click="show = false"
            >
                mdi-alpha-x-box-outline
            </v-icon>
            <v-form
                ref="registerProductForm"
            >
                <v-col
                    md="40"
                >
                    <p
                        class="font-weight-black"
                    >
                        Insira a Categoria
                    </p>
                    <v-text-field
                        v-model="category"
                        :rules="[rules.required('categoria')]"
                        :counter=" 10"
                        label="Nome da categoria"
                        required
                        id="inputCategory"
                    >
                    </v-text-field>
                </v-col>
                <!--name-->
                <v-col>
                    <p
                        class="font-weight-black"
                    >
                        Insira o nome do Produto
                    </p>
                        <v-text-field
                        v-model="nameProduct"
                        label="Nome do produto"
                        :rules="[rules.required('nome')]"
                        >
                        </v-text-field>
                </v-col>
                <!--quantity-->
                <v-col>
                    <p
                        class="font-weight-black"
                    >
                        Coloque a quantidade (Kg)
                    </p>
                    <v-select
                        v-model="quantity"
                        :items="items"
                        :rules="[v => !!v || 'Quantidade necessária.']"
                        label="120"
                        required
                    >
                    </v-select>
                </v-col>
                <!--Description-->
                <v-col>
                    <p
                        class="font-weight-black"
                    >
                        Faça uma breve Descrição
                    </p>
                    <v-textarea
                        bg-color="grey-lighten-2"
                        color="#F8F25F"
                        v-model="description"
                        :rules="[rules.required('descrição')]"
                        :counter="10"
                        rows="2"
                        label="Descrição resumida"
                        required
                    >
                    </v-textarea>
                </v-col>
                <!--BTN-->
                <v-col>
                    <v-btn
                        elevation="8"
                        size="x-large"
                        color="#28B4FA"
                        class="w-100 mr-8 mt-3 pa-2"
                        @click="register()"
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
                </v-col>
            </v-form>
        </v-navigation-drawer>
    </v-layout>
</template>
<script>
import {MESSAGES} from '@/lib/messages.js'
export default {
    name: 'RegisterProduct',
    props: ['estoqueLocal', 'dados', 'salvarLocal','showRegister'],
    data () {
      return {
        //categoria
        valid: false,
        category: ''.toLowerCase(),
        rules: {
            required: (fieldname) => (v) => !!v || `${MESSAGES[1010](fieldname).msg}`
        },
        //name
        nameProduct: ''.toLowerCase(),
        rules: {
            required: (fieldname) => (v) => !!v || `${MESSAGES[1010](fieldname).msg}`
        },
        //quantity
        valid: true,
        quantity: '',
        select: null,
        items: [
            '10',
            '15',
            '20',
            '25',
            '30',
            '40',
            '50',
            '100'
        ],
        //Descritption
        valid: false,
        description: ''.toLowerCase(),
        rules: {
            required: (fieldname) => (v) => !!v || `${MESSAGES[1010](fieldname).msg}`
        }
      }
    },
    methods: {
        closeDrawer() {
            this.show = !this.show
            this.$refs.registerProductForm.reset()
        },

        register() {
            const indicePesquisa = this.estoqueLocal.findIndex(produto => produto.nome.toLowerCase().trim() === this.nameProduct)

            if (indicePesquisa != -1 || indicePesquisa === undefined) {
                alert(`[ERRO] Produto já existente no estoque`)
                return
            }   
            if(this.category != `` && this.name != ``  && this.quantity != `` && this.description!= `` ) {
                this.estoqueLocal.push({
                    categoria: this.category,
                    nome: this.nameProduct,
                    quantidadeKg: Number(this.quantity),
                    descricao: this.description,
                    vendido: 0,
                    status: 'disponível',
                    show: true,
                    modificado:  new Date().toLocaleDateString(),
                })
                console.log(this.estoqueLocal)
                this.closeDrawer()
            }
            if(this.dados === true) {
                this.salvarLocal()
            }
        }
    },
    computed: {
        show: {
            get() {
                return this.showRegister;
            },
            set(nv) {
                this.$emit("closeRegister", nv);
            },
        },
    },
}
</script>
<style scoped>
    
</style>