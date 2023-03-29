<template>
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
            :rules="categoryRules"
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
            :rules="nameProductRules"
          >
          </v-text-field>
    </v-col>
     <!--quantity-->
    <v-col
    >
        <p
            class="font-weight-black"
        >
            Coloque a quantidade (Kg)
        </p>
        <v-select
            v-model="quantity"
            :items="items"
            :rules="[v => !!v || 'Quantiade necessária.']"
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
            :rules="descriptionRules"
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
</template>
<script>
export default {
    name: 'Form',
    props: ['estoqueLocal', 'dados', 'salvarLocal', 'drawer'],
    data: () => ({
        //category
        valid: false,
        category: ''.toLowerCase(),
        categoryRules: [
        value => {
        if (value) return true
            return 'Preencha a Categoria.'
        },
        value => {
            if (value?.length <= 10) return true
                return 'Categoria informada muito longa'
            },
        ],
        //name
        nameProduct: ''.toLowerCase(),
        nameProductRules: [
            value => {
                if (value?.length > 5) return true
                return 'O nome do produto precisa ter mais de 5 caracteres.'
            },
        ],
        //quantity
        valid: true,
        quantity: '',
        quantityRules: [
            v => !!v || 'Quantidade Necessária.',
        ],
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
        descriptionRules: [
            value => {
                if (value) return true
                    return 'Descrição Obrigatória.'
                },
                value => {
                if (value?.length >= 8) return true
                    return 'Minimo de 8 caracateres.'
            },
        ]
    }),
    methods: {
        register() {
            const indicePesquisa = this.estoqueLocal.findIndex(produto => produto.nome.toLowerCase().trim() === this.nameProduct)
            if (indicePesquisa === 1 || indicePesquisa === undefined) {
                alert(`[ERRO] Produto já existente no estoque`)
                this.drawer()
                return
            }   
            if(this.category != `` && this.name != ``  && this.quantity != `` && this.description!= `` ) {
                this.estoqueLocal.push({
                    categoria: this.category,
                    nome: this.nameProduct,
                    quantidadeKg: Number(this.quantity),
                    descricao: this.description,
                    show: true,
                    modificado:  new Date().toLocaleDateString(),
                })
                console.log(this.estoqueLocal)
            }
            if(this.dados === true) {
                this.salvarLocal()
            }
            this.drawer()
        }
    }
}
</script>
<style scoped>
    .v-col{
        padding: 0;
    }
</style>