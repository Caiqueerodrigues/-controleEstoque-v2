<template>
    <v-container 
        fluid 
        id="main"
    >
        <v-row 
            class="d-flex pt-3 pb-7 justify-center"
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
        </v-row>
        <v-divider></v-divider>
        <!--Botao Dados-->
        <v-row
            id="inicio"
        >
            <v-container 
                id="escolha"
                class="d-flex pa-0 justify-center"
            >
                <v-row 
                    class="justify-center mt-5 rowDados"
                >
                    <p 
                        class="pt-4 d-inline-flex mr-10"
                    >
                        Com Dados Locais
                    </p>
                    <v-switch 
                        class="d-inline-flex mb-4 mx-auto"
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
                </v-row>
            </v-container>
        </v-row>
        <!--Search Bar-->
        <v-container
            fluid
            class="d-flex justify-space-between pa-0"
        >
            <v-col>
                <Search :estoqueLocal="estoqueLocal" :dados="dadosAtuais" :salvarLocal="salvarLocal" />
            </v-col>
            <v-col class="d-flex">
                <Sale />
                <Register :estoqueLocal="estoqueLocal" :dados="dadosAtuais" :salvarLocal="salvarLocal"/>
            </v-col>
        </v-container>
        <!--Table-->
        <v-row>
            <TableStock :estoqueLocal="estoqueLocal"/>
        </v-row>
    </v-container>
    <!--footer-->
    <v-container
        class="footer text-subtitle-1 d-block"
        color="#460009"
        fluid
    >
        <v-divider></v-divider>
        <v-row>
            <p class="mx-auto pFooter mt-4">
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
        </v-row>
        <v-row>
            <p class="mx-auto pFooter my-0">
                2023
            </p>
        </v-row>
    </v-container>
</template>
<script>
export default {
    name: 'MainPage',
    data() {
        return {
            checked: true,
            estoqueLocal: [{
                nome: `exemplo de ração`,
                categoria: `ração`,
                quantidadeKG: 30,
                descricao: `sem corantes`,
                show: true,
                modificado: 25/12/2022,
            },
            {
                nome: `luck dog`,
                categoria: `ração`,
                quantidadeKG: 40,
                descricao: `sabor carne`,
                show: true,
                modificado: 20/03/2023,
            },
            {
                nome: `mix`,
                categoria: `ração`,
                quantidadeKG: 20,
                descricao: `todos sabores`,
                show: true,
                modificado: 28/03/2023,
            }],
            dados: false
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
                    this.estoqueLocal = JSON.parse(localStorage.getItem(`estoque`))
                }
            }
        },

        salvarLocal() {
            console.log(`chamou LOCAL STORAGE`);
            localStorage.setItem(`estoque`,JSON.stringify(this.estoqueLocal))
            this.estoqueLocal = JSON.parse(localStorage.getItem(`estoque`))
        }
    },
    computed: {
        dadosAtuais() { 
            return this.dados
        }
    } 
}

</script>
<style scoped>
    #main {
        min-height: 89vh;   
    }
    .rowDados {
        max-width: 400px;
    }
    a {
        text-decoration: none;
        color: #F8F25F;
    }
    @media (max-width: 350px) {
        h1, .v-icon {
            font-size: .9em;
        }
    }
    @media (max-width: 424px) {
        p {
            font-size: .7rem;
            max-width: 50px;
            margin: 5px !important;
            padding-top: 0 !important;
        }
        #inicio {
            max-width: 200px !important;
        }
        .rowDados {
            width: 90vw !important;
        }
        #escolha {
           margin: auto !important;
        }
}
</style>