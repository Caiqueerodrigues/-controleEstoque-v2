<template>
    <v-layout 
        class="d-flex mx-0"
    >
        <v-navigation-drawer
            v-model="show"
            temporary
            location="right"
            class="pa-5 w-50"
        >
            <!--Titulo-->
            <v-row>
                <v-col
                    cols="12"
                >
                    <v-alert
                        v-if="erro"
                        type="error"
                        title="Produto já existe no estoque"
                        text= 'Verifique as informações ou altere o nome por favor.'
                    >
                    </v-alert>
                </v-col>
                <v-col>
                    <h1
                        class="my-4"
                    >
                        {{ titlePage }}
                    </h1>
                    <!--X-->
                    <v-icon
                        class="float-right mt-n12"
                        id="close"
                        @click="show = false"
                    >
                        mdi-close
                    </v-icon>
                
                    <v-form
                        ref="registerProductForm"
                    >
                <!--Categoria-->
                        <v-col
                            cols="11"
                        >
                            <p
                                class="font-weight-black"
                            >
                                {{ titleCategory }}
                            </p>
                            <v-text-field
                                v-model="category"
                                :rules="[rules.required('categoria')]"
                                :counter="10"
                                validate-on="blur"
                                label="Nome da categoria"
                                required
                                id="inputCategory"
                            >
                            </v-text-field>
                        </v-col>
                        <!--name-->
                        <v-col
                            cols="11"
                        >
                            <p
                                class="font-weight-black"
                            >
                                {{ titleName }}
                            </p>
                                <v-text-field
                                v-model="nameProduct"
                                validate-on="blur"
                                label="Nome do produto"
                                :rules="[rules.required('nome')]"
                                >
                                </v-text-field>
                        </v-col>
                        <!--quantity-->
                        <v-col
                            cols="11"
                        >
                            <p
                                class="font-weight-black"
                            >
                                {{ titleQuantity }}
                            </p>
                            <v-select
                                v-model="quantity"
                                validate-on="blur"
                                :items="items"
                                :rules="[v => !!v || 'Quantidade necessária.']"
                                label="120"
                                required
                            >
                            </v-select>
                        </v-col>
                        <!--Description-->
                        <v-col
                            cols="11"
                        >
                            <p
                                class="font-weight-black"
                            >
                                {{ titleDescription }}
                            </p>
                            <v-textarea
                                validate-on="blur"
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
                        <v-col
                            cols="11"
                        >
                            <v-btn
                                id="btnCadastrar"
                                elevation="8"
                                size="x-large"
                                color="#28B4FA"
                                class="w-100 mr-8 mt-3 pa-2"
                                @click="registerEdit()"
                            >
                                <template
                                    v-slot:prepend
                                >
                                    <v-icon>
                                        mdi-plus-thick
                                    </v-icon>
                                    {{ btnTitle }}
                                </template>
                            </v-btn>
                        </v-col>
                    </v-form>
                </v-col>
            </v-row>
        </v-navigation-drawer>
    </v-layout>
</template>
<script>
import {MESSAGES} from '@/lib/messages.js'
export default {
    name: 'RegisterProduct',
    props: ['estoqueLocal', 'dados', 'salvarLocal','showRegister', 'item'],
    data () {
      return {
        titlePage: '',
        titleCategory: '',
        titleName: '',
        titleQuantity: '',
        titleDescription: '',
        btnTitle: '',
        eventBtn: '',
        erro: false,
        rules: {
            required: (fieldname) => (v) => !!v|| `${MESSAGES[1010](fieldname).msg}`
        },
        //categoria
        valid: false,
        category: '',
        //name
        nameProduct: '',
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
        description: '',
        rules: {
            required: (fieldname) => (v) => !!v || `${MESSAGES[1010](fieldname).msg}`
        }
      }
    },
    methods: {
        closeDrawer() {
            this.show = !this.show
            this.$refs.registerProductForm.reset()
            this.erro = false
        },

        editItem() {
            console.log(this.estoqueLocal)
            // const proximoId = this.estoqueLocal.length
            console.log(this.item)
            this.closeDrawer()
        },

        registerEdit() {
            if(!this.item) { 
                const indicePesquisa = this.estoqueLocal.findIndex(produto => produto.nome.toLowerCase().trim() === this.nameProduct)
                const proximoId = this.estoqueLocal.length

                if (indicePesquisa != -1 || indicePesquisa === undefined) {
                    this.erro = true
                    return
                }   
                if(this.category != `` && this.name != ``  && this.quantity != `` && this.description!= `` ) {
                    this.estoqueLocal.push({
                        id: proximoId,
                        categoria: this.category,
                        nome: this.nameProduct,
                        quantidadeKg: Number(this.quantity),
                        descricao: this.description,
                        vendido: 0,
                        status: 'disponível',
                        show: true,
                        modificado:  new Date().toLocaleDateString(),
                    })
                    this.closeDrawer()
                }
            }

            if(this.item) {
                this.item.categoria = this.category 
                this.item.nome = this.nameProduct 
                this.item.quantidadeKg = this.quantity 
                this.item.descricao = this.description 
                this.item.modificado = new Date().toLocaleDateString()
                
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
        }
    },
    watch: {
        item:
        {
            handler(newValue) {
                if(newValue) {
                    this.titlePage = 'Editar Produto'
                    this.titleCategory = 'Edite a Categoria'
                    this.titleName= 'Edite o nome'
                    this.titleQuantity= 'Quantidade'
                    this.titleDescription = 'Editar a Descrição'
                    this.btnTitle = 'Salvar Alterações'

                    this.category = this.item.categoria
                    this.nameProduct = this.item.nome
                    this.quantity = this.item.quantidadeKg
                    this.description = this.item.descricao
                } 
                if(!newValue) {
                    this.titlePage = 'Cadastrar Produto'
                    this.titleCategory = 'Insira a Categoria'
                    this.titleName = 'Insira o nome do Produto'
                    this.titleQuantity = 'Coloque a Quantidade'
                    this.titleDescription = 'Faça uma breve Descrição'
                    this.btnTitle = 'Cadastrar Produto'

                    this.category = ''.toLowerCase()
                    this.nameProduct = ''.toLowerCase()
                    this.quantity = ''.toLowerCase()
                    this.description = ''.toLowerCase()
                }
            },
            immediate: true
        }
    }
}
</script>
<style scoped>
    @media (max-width: 750px) {
        h1 {
            font-size: 1.2em;
        }
        #btnCadastrar {
            font-size: .7rem;
        }
    }
</style>