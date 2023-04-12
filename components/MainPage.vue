<template>
    <v-container 
        fluid 
        id="main"
    >
        <!--header-->
        <v-row>
            <v-col
                class="d-flex pt-3 pb-5 justify-center px-4"
            >
                <v-icon>
                    mdi-paw
                </v-icon>
                <v-icon
                    class="mt-7"
                >
                    mdi-paw
                </v-icon>
                <h1>Casa de Rações </h1>
                <v-icon
                    class="mt-8"
                >
                    mdi-paw
                </v-icon>
                <v-icon>
                    mdi-paw
                </v-icon>
                <h1
                    class="mx-4"
                >
                    e
                </h1>
                <v-icon>
                    mdi-paw
                </v-icon>
                <v-icon
                    class="mt-6 mx-2"
                >
                    mdi-paw
                </v-icon>
                <h1>
                    Pet Shop
                </h1>
                <v-icon
                    class="mt-6 mx-4"
                >
                    mdi-paw
                </v-icon>
                <v-icon>
                    mdi-paw
                </v-icon>
            </v-col>
        </v-row>
        <v-divider
            :thickness="3"
        ></v-divider>
        <!--Botao Dados-->
        <v-row
            id="inicio"
            class="d-flex justify-center ma-0"
        >
            <v-col 
                class="rowDados justify-center d-flex pa-0"
            >
                <p 
                    class="pt-4 d-inline-flex mr-10"
                >
                    Com Dados Locais
                </p>
                <v-switch 
                    class="d-inline-flex mx-auto"
                    color="golden2"
                    id="escolhaDados"
                    inset 
                    v-model="checked"
                    @click="escolhaDados()"
                >
                </v-switch>
                <p 
                    class="d-inline-flex pt-4"
                    >
                    Sem Dados Locais
                </p>
            </v-col>
        </v-row>
        <!--Search Bar-->
        <v-row
            no-gutters
            class="pr-10"
        >
            <!--search-->
            <v-col
                cols="12"
                md="8"
            >
                <Search :estoqueLocal="estoqueLocal" :dados="dadosAtuais" :salvarLocal="salvarLocal" />
            </v-col>
            <!--btn register-->
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
            <!--btn venda-->
            <v-col>
                <v-btn
                    @click="showRegister = true"
                    elevation="8"
                    size="x-large"
                    variant="outlined"
                    color="#28B4FA"
                    class="px-2 text-h6 mx-0"
                    v-bind="props"
                    id="btnCadastrar"
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
        </v-row>
        <!--Table-->
        <v-row
            class="px-4"
        >
            <v-col>
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
        <v-row>
            <v-col
                cols="12"
                class="pa-0 d-flex justify-center"
            >
                <p 
                    class=" mt-4"
                    id="copy"
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
                class="d-flex justify-center pa-0"
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
        min-height: 87.5vh;   
    }
    .rowDados {
        max-width: 400px;
        max-height: min-content;
    }
    .width-min {
        max-width: min-content;
    }
    a {
        text-decoration: none;
        color: #F8F25F;
    }
    @media (max-width: 446px) {
        h1, .v-icon {
            font-size: .8em;
        }
        #inicio {
            max-width: 200px !important;
        }
        .rowDados {
            width: 90vw !important;
            margin-left:80px !important;
        }
        #escolha {
           margin: auto !important;
        }
        #copy {
            min-width: 100vw;
            place-content: center;
            display: flex;
            margin-top: 15px !important;
            font-size: .9em;
            margin-bottom: -20px !important;
        }
        p {
            font-size: .7rem;
            max-width: 50px;
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
            max-width: 300px !important;
        }
    }
</style>