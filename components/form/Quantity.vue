<template>
    <v-col
        cols="8"
    >
        <v-select
        v-model="quantity"
        :items="items"
        :rules="[v => !!v || 'Quantiade necessária.']"
        label="120"
        required
        >
        </v-select>
    </v-col>
</template>
<script>
    export default {
        name: 'inputQuantity',
        data: () => ({
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
        }),
    }
</script>