<template>
    <v-col
        cols="12"
        md="40"
    >
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
</template>
<script>
  export default {
    name: 'inputCaterogry',
    data: () => ({
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
    }),
  }
</script>
<style scoped>
</style>