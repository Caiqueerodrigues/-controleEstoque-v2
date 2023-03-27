<template>
    <v-col
        cols="12"
        md="40"
    >
        <p
            class="font-weight-black pb-3"
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
            class="font-weight-black pb-3"
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
        cols="8"
    >
        <p
            class="font-weight-black pb-3"
        >
            Coloque a quantidade
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
            class="font-weight-black pb-3"
        >
            Faça uma breve Descrição
        </p>
        <v-textarea
            bg-color="grey-lighten-2"
            color="#F8F25F"
            v-model="quantity"
            :rules="quantityRules"
            :counter="10"
            rows="2"
            label="Descrição resumida"
            required
        >
        </v-textarea>
    </v-col>
</template>
<script>
    export default {
        name: 'Form',
        data: () => ({
            //category
            valid: false,
            category: '',
            categoryRules: [
            value => {
            if (value) return true
                return 'Preencha a Categoria.'
            },
            value => {
                if (value?.length <= 10) return true
                  return 'Nome informado muito longo'
                },
            ],
            //name
            nameProduct: '',
            nameProductRules: [
                value => {
                    if (value?.length > 5) return true
                    return 'O nome do produto precisa ter mais de 5 caracteres.'
                },
            ],
            //quantity
            valid: true,
            quantityRules: [
                v => !!v || 'Quantidade NEcessária.',
            ],
            select: null,
            items: [
                '10 Kg',
                '15 Kg',
                '20 Kg',
                '25 Kg',
                '30 Kg',
                '40 Kg',
                '50 Kg',
                '100 Kg'
            ],
            //Descritption
            valid: false,
            quantity: '',
            quantityRules: [
                value => {
                    if (value) return true
                        return 'Descrição Obrigatória.'
                    },
                    value => {
                    if (value?.length <= 10) return true
                        return 'Minimo de 10 caracateres.'
                },
            ]
        }),
    }
</script>