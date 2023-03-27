<template>
     <v-col>
         <v-text-field
            v-model="nameProduct"
            label="Nome do produto"
            :rules="nameProductRules"
          >
          </v-text-field>
     </v-col>
</template>
<script>
    export default {
        name: 'InputName',
        data: () => ({
            nameProduct: '',
            nameProductRules: [
                value => {
                    if (value?.length > 5) return true
                    return 'O nome do produto precisa ter mais de 5 caracteres.'
                },
            ],
        }),
    }
</script>