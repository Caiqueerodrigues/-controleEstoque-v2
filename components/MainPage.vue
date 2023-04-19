<template>
    <v-container 
        fluid 
        id="main"
    >
        <v-row 
            justify="center"
        >
        <!--header-->
            <v-col
                xs="12"
                md="10"
                lg="8"
                xl="4"
                class="pt-3 pb-5 px-4"
            >
                <v-icon
                    class="mb-6"
                >
                    mdi-paw
                </v-icon>
                <v-icon
                    class="mt-6 ml-2"
                >
                    mdi-paw
                </v-icon>
                <span 
                    class="text-h4 h4"
                >
                    Casa de Rações 
                </span>
                <v-icon
                    class="mt-6"
                >
                    mdi-paw
                </v-icon>
                <v-icon
                    class="mb-6 ml-2"
                >
                    mdi-paw
                </v-icon>
                <span
                    class="mx-4 text-h4 h4"
                >
                    e
                </span>
                <v-icon
                    class="mb-6"
                >
                    mdi-paw
                </v-icon>
                <v-icon
                    class="mt-6 ml-2"
                >
                    mdi-paw
                </v-icon>
                <span
                    class="text-h4 h4"
                >
                    Pet Shop
                </span>
                <v-icon
                    class="mt-6 mr-2"
                >
                    mdi-paw
                </v-icon>
                <v-icon
                    class="mb-6"
                >
                    mdi-paw
                </v-icon>
            </v-col>
            <v-divider
                :thickness="3"
            ></v-divider>
        <!--Botao Dados-->
            <v-col 
                cols="4"
            >
                <p>
                    Com Dados Locais
                </p>
            </v-col>
            <v-col
                cols="3"
                class="pt-0 pt"
            >
                <v-switch
                    color="golden2"
                    id="escolhaDados"
                    inset
                    v-model="checked"
                    @click="escolhaDados()"
                >
                </v-switch>
            </v-col>
            <v-col
                cols="4"
            >
                <p class="ml-10">
                    Sem Dados Locais
                </p>
            </v-col>
        <!--Search Bar-->
            <!--search-->
            <v-col
                cols="12"
                md="8"
            >
                <Search :estoqueLocal="estoqueLocal" :dados="dadosAtuais" :salvarLocal="salvarLocal" />
            </v-col>
            <!--btn venda-->
            <v-col 
                class="width-min mx-5"
            >
                <v-btn
                    @click.stop="drawer = !drawer"
                    elevation="8"
                    size="x-large"
                    variant="outlined"
                    color="#0f0"
                    class="px-2 py-3 text-h6"
                    @click="showSale = true"
                >
                    <template
                        v-slot:prepend
                    >
                        <v-icon>
                            mdi-currency-usd
                        </v-icon>
                        Vender
                    </template>
                </v-btn>
            </v-col>
            <!--btn register-->
            <v-col
                class="width-min"
            >
                <v-btn
                    @click="showRegister = true"
                    elevation="8"
                    size="x-large"
                    variant="outlined"
                    color="#28B4FA"
                    class="px-2 text-h6 mx-0"
                    v-bind="props"
    
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
        <!--Table-->
            <v-col
                cols="11"
                lg="10"
            >
                <TableStock
                    :estoqueLocal="estoqueLocal"
                    :dados="dadosAtuais"
                    :showRegister="showRegister"
                    :salvarLocal="salvarLocal"
                    />
            </v-col>
        </v-row>
        <Sale 
            @closeSale="showSale = $event" 
            :estoqueLocal="estoqueLocal" 
            :dados="dadosAtuais" 
            :salvarLocal="salvarLocal" 
            :showSale="showSale"
        />
        <Register 
            @closeRegister="showRegister = $event" 
            :estoqueLocal="estoqueLocal" 
            :dados="dadosAtuais" 
            :salvarLocal="salvarLocal" 
            :showRegister="showRegister"
            :item="false"
        />
    </v-container>
    <!--footer-->
    <v-container
        class="footer text-subtitle-1 d-block"
        color="#460009"
        fluid
    >
        <v-divider></v-divider>
        <v-row
            justify="center w-100"
        >
            <v-col
                cols="12"
                class="pa-0 text-center"
            >
                <p 
                    class=" mt-4"
                >
                    <v-icon>
                        mdi-paw
                    </v-icon>
                    &copy;
                    <a href="https://www.linkedin.com/in/caique-rodrigues-a113ab249/" target="_blank">
                        Caique Rodrigues
                    </a>
                    <v-icon>
                        mdi-paw
                    </v-icon>
                </p>
            </v-col>
            <v-col
                cols="12"
                class="pa-0 text-center"
            >
                <p class="mx-auto my-0">
                    2023
                </p>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>

export default {
    name: 'MainPage',
    data() {
        return {
            checked: true,
            estoque: [
                {
                    nome: `exemplo de ração`,
                    categoria: `ração`,
                    quantidadeKg: 30,
                    descricao: `sem corantes`,
                    show: true,
                    vendido: 0,
                    status: 'disponível',
                    id: 0,
                    modificado: '25/12/2022',
                },
                {
                    nome: `luck dog`,
                    categoria: `ração`,
                    quantidadeKg: 40,
                    descricao: `sabor carne`,
                    show: true,
                    vendido: 0,
                    status: 'disponível',
                    id: 1,
                    modificado: '20/03/2023',
                },
                {
                    nome: `osso defumado`,
                    categoria: `alimento`,
                    quantidadeKg: 10,
                    descricao: `100% natural`,
                    show: true,
                    vendido: 0,
                    status: 'disponível',
                    id: 2,
                    modificado: '27/02/2023',
                },
                {
                    nome: `bolinha`,
                    categoria: `brinquedos`,
                    quantidadeKg: 17,
                    descricao: `borracha sintética`,
                    show: true,
                    vendido: 0,
                    status: 'disponível',
                    id: 3,
                    modificado: '12/03/2023',
                },
                {
                    nome: `mix`,
                    categoria: `ração`,
                    quantidadeKg: 20,
                    descricao: `todos sabores`,
                    show: true,
                    vendido: 0,
                    status: 'disponível',
                    id: 4,
                    modificado: '28/03/2023',
                }
            ],
            showSale: false,
            showRegister: false,
            dados: false,
        }
    },
    methods: {
        escolhaDados() {
            if(!this.checked) {
                console.log('Sem dados locais')
                this.dados = false 
            } else {
                console.log(`Com dados locais`)
                this.dados = true
                if(localStorage.length === 0) {
                    this.salvarLocal()
                    return
                } else {
                    this.estoque = JSON.parse(localStorage.getItem(`estoque`))
                }
            }
        },

        salvarLocal() {
            console.log(`chamou LOCAL STORAGE`);
            localStorage.setItem(`estoque`,JSON.stringify(this.estoque))
            this.estoqueLocal = JSON.parse(localStorage.getItem(`estoque`))
        }
    },
    computed: {
        dadosAtuais() { 
            return this.dados
        }, 
        estoqueLocal() {
            return this.estoque
        }
    } 
}

</script>
<style scoped>
    #main {
        min-height: 89.7vh;
    }
    .width-min {
        max-width: min-content;
    }
    a {
        text-decoration: none;
        color: #F8F25F;
    }
    @media (max-width: 340px) {
        .h4, .v-icon {
            font-size: .6em !important;
        }
        #inicio {
            max-width: 200px !important;
        }
        .pt {
            padding-top: 10px !important;
        }
        .rowDados {
            width: 90vw !important;
            margin-left:80px !important;
        }
        #escolha {
           margin: auto !important;
        }
        #copy {
            place-content: center;
            display: flex;
            margin-top: 15px !important;
            font-size: .9em;
            margin-bottom: -20px !important;
        }
        p {
            font-size: .7rem;
            max-width: 90vw;
            margin: 5px !important;
            padding-top: 4px !important;
        }
        .v-btn {
            margin: 4px auto !important;
            padding: 0px 103px !important;
        }
        #btnCadastrar {
            margin: 5px 20px 0 !important;
            padding: 0 90px !important;
            /* max-width: 300px !important; */
        }
    }
</style>