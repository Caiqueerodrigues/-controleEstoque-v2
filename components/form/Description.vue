<template>
    <v-col
    >
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
        name: 'Description',
        data: () => ({
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
        })
    }
</script>
<style scoped>
    #description {
        height: 2em !important;
    }
</style>