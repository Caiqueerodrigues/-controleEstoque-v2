<template>
  <v-table
    fixed-header
    class="mx-auto mt-3 w-75 rounded-xl"
  >
    <thead>
      <tr>
        <th class="text-left">
          Categoria
        </th>
        <th class="text-left">
          Nome
        </th>
        <th>
          Quantidade
        </th>
        <th>
          Descrição
        </th>
        <th>
          Atualizada em
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in estoqueLocal"
        :key="index" v-show="item.show"
      >
        <td>
          {{ item.categoria }}
        </td>
        <td>
          {{ item.nome }}
        </td>
        <td>
          {{ item.quantidadeKG }} Kg
        </td>
        <td>
          {{ item.descricao }}
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
<script>
  export default {
    name: 'TableStock',
    props: ['estoqueLocal'],
}
</script>
<style scoped>
  thead > tr > th {
    color: #b98f05 !important;
    background-color: #860B07 !important;
  }
 .v-table {
  text-transform: capitalize;
  background-color: transparent;
  color: #F8F25F;
  border: 2px solid #F8F25F;
 }
</style>