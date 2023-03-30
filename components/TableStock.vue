<template>
  <v-table
    fixed-header
    class="mx-auto mt-3 rounded-xl"
  >
    <thead>
      <tr>
        <th 
          class="text-left"
        >
          Categoria
        </th>
        <th 
          class="text-left"
        >
          Nome
        </th>
        <th 
          class="text-left"
        >
          Quantidade
        </th>
        <th
          class="text-left"
        >
          Descrição
        </th>
        <th
          class="text-left"
        >
          Vendidos
        </th>
        <th
          class="text-left"
        >
          Atualizada em
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in estoqueLocal"
        :key="index"  v-show="item.show"
      >
        <td>
          {{ item.categoria }}
        </td>
        <td>
          {{ item.nome }}
        </td>
        <td>
          {{ item.quantidadeKG }} Kg/Un
        </td>
        <td>
          {{ item.descricao }}
        </td>
        <td
          class="pl-12"
        >
          {{ item.vendido }}
        </td>
        <td>
          {{ item.modificado }}
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
<script>
export default {
  name: 'TableStock',
  props: ['estoqueLocal'],
  data () {
    return {
    }
  },
  methods: {
  }
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

 .venda {
  max-height: 35px !important;
  align-items: center;
  justify-content: center;
  display: flex;
  overflow-y: hidden;
 }
</style>