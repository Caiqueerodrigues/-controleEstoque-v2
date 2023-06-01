<template>
  <v-row
    id="row"
  >
    <v-col
      cols="12"
    >
      <v-table
        fixed-header
        class="mx-auto mt-3 rounded-xl"
      >
        <thead>
          <tr>
            <th
              class="text-left cat"
            >
              Categoria
            </th>
            <th
              class="text-left name"
            >
              Nome
            </th>
            <th
              class="text-left qtd"
            >
              Quantidade
            </th>
            <th
              class="text-left desc"
            >
              Descrição
            </th>
            <th
              class="statusDisplay"
            >
              Status
            </th>
            <th
              class="text-left vend"
            >
              Vendidos
            </th>
            <th
              class="text-left att"
            >
              Atualizada em
            </th>
            <th>
            </th>
            <th>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in estoqueLocal"
            :key="index"  v-show="item.show"
          >
            <td
              class="cat"
            >
              {{ item.categoria }}
            </td>
            <td
              class="name"
            >
              {{ item.nome }}
            </td>
            <td
              class="qtd"
            >
              {{ item.quantidadeKg }} Kg/Un
            </td>
            <td
              class="desc"
            >
              {{ item.descricao }}
            </td>
            <td
              class="statusDisplay"
            >
              <div
                v-if="item.quantidadeKg > 0"
                class="status"
              >
                {{ item.status}}
              </div>
              <div
                v-if="item.quantidadeKg == 0"
                class="status indisp"
              >
                {{ item.status}}
              </div>
            </td>
            <td
              class="pl-12 vend"
            >
              {{ item.vendido }}
            </td>
            <td
              class="att"
            >
              {{ item.modificado }}
            </td>
            <td>
              <v-icon
                color="#00f"
                title="Editar Item"
                @click="editarItem(index), showRegister = true"
              >
                mdi-pencil
              </v-icon>
            </td>
            <td>
              <v-icon
              @click="apagarItem(index)"
                color="#E13100"
                title="Excluir Item"
              >
                mdi-trash-can-outline
              </v-icon>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
      <v-col
        v-if="alert"
      >
        <v-alert
          v-model="alert"
          border="start"

          closable
          close-label="Confirmar Exclusão"
          color="#860B07"
          title="Confirmar Exclusão"
        >
          {{ exclusao }}
          <v-col
            id="colBtn"
          >
            <v-btn
              elevation="8"
              size="large"
              variant="outlined"
              class="ma-4"
              @click="confirm(true, index)"
            >
              Excluir
            </v-btn>
            <v-btn
              elevation="8"
              size="large"
              variant="outlined"
              @click="confirm(false)"
            >
              Cancelar
            </v-btn>
          </v-col>
        </v-alert>
    </v-col>
  </v-row>

  <Register 
    @closeRegister="showRegister = $event" 
    :item="item"
    :dados="dados" 
    :estoqueLocal="estoqueLocal"
    :salvarLocal="salvarLocal" 
    :showRegister="showRegister"
  />
</template>
<script>
export default {
  name: 'TableStock',
  props: ['estoqueLocal', 'dados', 'showRegister', 'salvarLocal'],
  data () {
    return {
      itemRemovido: [],
      exclusao:[],
      item: {},
      alert: false,
      confirmacao: null,
    }
  },
  methods: {
    apagarItem(index) {
      this.alert = !this.alert
      this.exclusao = `Tem certeza que deseja remover o item ${this.estoqueLocal[index].nome.toUpperCase()}?`
    },
    confirm(value, index) {
      this.confirmacao = value
      if(this.confirmacao === true) {
        this.itemRemovido.push(this.estoqueLocal.splice(index,1))
      }
      if(this.dados === true) {
        localStorage.setItem(`itensExcluidos`,JSON.stringify(this.itemRemovido))
        this.salvarLocal()
      }
      this.alert = !this.alert
    },
    editarItem(index) {
      this.item = this.estoqueLocal[index]
    }
  },
}
</script>
<style scoped>
  #row {
    position: relative !important;
  }
  .v-alert {
    color: #F8F25F;
    height: max-content;
    position: absolute;
    min-width: 80%;
    top: 95px;
    right: auto;
    bottom: 100px;
    left: auto;
  } 
  #colBtn {
    width: max-content;
    float: right;
    padding: 0;
  }
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
 .status {
  border-radius: 30px;
  background-color: #36BD5C;
  color: black;
  box-shadow: 2px 2px 5px black;
  text-align: center;
  padding: 4px;
 }
 .indisp {
  background-color: #E76A6A;
 }
 @media (max-width: 409px) {
  .cat, .desc, .statusDisplay, .vend, .att {
    display: none;
  }
 }
 @media (min-width: 410px) and (max-width: 510px) {
  .cat, .desc, .vend, .att {
    display: none;
  }
 }
 @media (min-width: 510px) and (max-width: 610px) {
  .cat, .vend, .att {
    display: none;
  }
 }
 @media (min-width: 610px) and (max-width: 710px) {
  .cat, .att {
    display: none;
  }
 }
 @media (min-width: 710px) and (max-width: 768px) {
  .att {
    display: none;
  }
 }
</style>