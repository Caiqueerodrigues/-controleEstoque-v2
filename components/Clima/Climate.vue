<template>
<v-row
    id="telaGrande"
>
    <v-col
        cols="11"
        id="dateClimate"
        class="align-center pa-0 mt-2"
    >
        <v-col
            cols="12"
            :class="{animation: pause}"
        >
            <span
                v-if=local
                class="info"
            >
                {{ date }}
            </span>
            <span
                id="climate"
                v-if=previsao
            >
                <span
                    class="info"
                >
                    {{ forecast[0].temperatura }}
                </span>
                <span
                    class="info"
                >
                    {{ forecast[0].umidade }}
                </span>
                <span
                    class="info"
                >
                    {{ forecast[0].sensacao }}
                </span>
                <span
                    class="info"
                >
                    {{ forecast[0].aparencia }}
                </span>
            </span>
            <!--sem localizacao-->
            <span
                v-else
            >
                <span
                    class="info"
                >
                    {{ dateLocal }}
                </span>
                <span
                    class="info"
                >
                    {{ permissao }}
                </span>
                <v-btn
                    id="permissao"
                    @click=localizacao()
                >
                    <template
                        v-slot:prepend
                    >
                        <v-icon>
                            mdi-arrow-top-left-thin
                        </v-icon>
                        Fornecer Permissao
                    </template>
                    <template
                        v-slot:append
                    >
                        <v-icon>
                            mdi-arrow-top-left-thick
                        </v-icon>
                    </template>
                </v-btn>
            </span>
        </v-col>
    </v-col>
    <v-col
        cols="1"
        class="pa-0 ma-0 pl-2 mt-2"
    >
        <v-btn
            id="pausar"
            @click="pausarPrevisao"
        >
            <template
                v-slot:prepend
            >
                <v-icon>
                    mdi-pause 
                </v-icon>
            </template>
        </v-btn>
    </v-col>
</v-row>
<!--tela pequena-->
<v-row
    id="telaPequena"
    class="justify-center"
>
    <v-col
        cols="8"
        md="3"
        class="pb-0 mx-auto"
    >
        <v-btn
            id="btnPrevisao"
            @click="dialog = true, localizacao()"
        >
            Previsâo do Tempo
        </v-btn>
        <v-dialog
            v-model="dialog"
            class="m-auto text-center"
        >
            <v-card
                id="dialog"
            >
                <v-card-text
                    v-if="previsao"
                >
                    <p
                        v-if=local
                        class="info my-3"
                    >
                        {{ date }}
                    </p>
                    <p
                        class="info my-3"
                    >
                        {{ forecast[0].temperatura }}
                    </p>
                    <p
                        class="info my-3"
                    >
                        {{ forecast[0].umidade }}
                    </p>
                    <p
                        class="info my-3"
                    >
                        {{ forecast[0].sensacao }}
                    </p>
                    <p
                        class="info my-3"
                    >
                        {{ forecast[0].aparencia }}
                    </p>
                </v-card-text>
                <!--sem localizacao-->
                <v-card-text
                    v-else
                >
                    <span
                        class="info"
                    >
                        {{ dateLocal }}
                    </span>
                    <p
                        class="info my-4"
                    >
                        {{ permissao }}
                    </p>
                    <v-btn
                        id="permissao"
                        @click=localizacao()
                    >
                        <template
                            v-slot:prepend
                        >
                            <v-icon>
                                mdi-arrow-top-left-thin
                            </v-icon>
                            Fornecer Permissao
                        </template>
                    </v-btn>
                </v-card-text>
                <v-card-actions>
                    <v-btn 
                        id="fechar"
                        @click="dialog = false"
                    >
                        Fechar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-col>
</v-row>
</template>
<script>
export default {
    name: 'Climate e Date',
    data() {
        return {
            data: new Date(),
            dia: '',
            mes: '',
            ano: '',
            date: '',
            dateLocal:'',
            meses:[
                {
                    mes: '01',
                    nome: 'Janeiro'
                },
                {
                    mes: '02',
                    nome: 'Fevereiro'
                },
                {
                    mes: '03',
                    nome: 'Março'
                },
                {
                    mes: '04',
                    nome: 'Abril'
                },
                {
                    mes: '05',
                    nome: 'Maio'
                },
                {
                    mes: '06',
                    nome: 'Junho'
                },
                {
                    mes: '07',
                    nome: 'Julho'
                },
                {
                    mes: '08',
                    nome: 'Agosto'
                },
                {
                    mes: '09',
                    nome: 'Setembro'
                },
                {
                    mes: '10',
                    nome: 'Outubro'
                },
                {
                    mes: '11',
                    nome: 'Novembro'
                },
                {
                    mes: '12',
                    nome: 'Dezembro'
                },
            ],
            url: '',
            latitude: '',
            longitude: '',
            cidade: '',
            estado: '',
            estados: [
                {
                    nome: 'Acre',
                    sigla:'AC',
                },
                { 
                    nome: 'Alagoas',
                    sigla: 'AL',
                },
                { 
                    nome: 'Amapá',
                    sigla: 'AP',
                },
                { 
                    nome: 'Amazonas',
                    sigla: 'AM',
                },
                { 
                    nome: 'Bahia',
                    sigla: 'BA',
                },
                { 
                    nome: 'Ceará',
                    sigla: 'CE',
                },
                { 
                    nome: 'Espírito Santo',
                    sigla: 'ES',
                },
                { 
                    nome: 'Goiás',
                    sigla: 'GO',
                },
                { 
                    nome: 'Maranhão',
                    sigla: 'MA',
                },
                { 
                    nome: 'Mato Grosso',
                    sigla: 'MT',
                },
                { 
                    nome: 'Mato Grosso do Sul',
                    sigla: 'MS',
                },
                { 
                    nome: 'Minas Gerais',
                    sigla: 'MG',
                },
                { 
                    nome: 'Pará',
                    sigla: 'PA',
                },
                { 
                    nome: 'Paraíba',
                    sigla: 'PB',
                },
                { 
                    nome: 'Paraná',
                    sigla: 'PR',
                },
                { 
                    nome: 'Pernambuco',
                    sigla: 'PE',
                },
                { 
                    nome: 'Piauí',
                    sigla: 'PI',
                },
                { 
                    nome: 'Rio de Janeiro',
                    sigla: 'RJ',
                },
                { 
                    nome: 'Rio Grande do Norte',
                    sigla: 'RN',
                },
                { 
                    nome: 'Rio Grande do Sul',
                    sigla: 'RS',
                },
                { 
                    nome: 'Rondônia',
                    sigla: 'RO',
                },
                { 
                    nome: 'Roraima',
                    sigla: 'RR',
                },
                { 
                    nome: 'Santa Catarina',
                    sigla: 'SC',
                },
                { 
                    nome: 'São Paulo',
                    sigla: 'SP',
                },
                { 
                    nome: 'Sergipe',
                    sigla: 'SE',
                },
                { 
                    nome: 'Tocantins',
                    sigla: 'TO',
                },
                { 
                    nome: 'Distrito Federal',
                    sigla: 'DF',
                },
            ],
            local: '', 
            tokenApi: '687b5fa667114db36c9f70a8500d7c74',
            previsao: false,
            forecast:[],
            permissao:'Forneça o acesso a Localização para ver a previsão do tempo em tempo real!',
            pause: true,
            dialog: false,
        }
    },
    methods: {
        cabecalho() {
            this.dia = String(this.data.getDate()).padStart(2, '0'),
            this.mes = String(this.data.getMonth() + 1).padStart(2, '0'),
            this.meses.forEach(numeroMes => {
                if(numeroMes.mes === this.mes) {
                    this.mes = numeroMes.nome
                }
            })
            this.ano = this.data.getFullYear(),
            this.date = `${this.local}, ${this.dia} de ${this.mes} de ${this.ano}`
            this.dateLocal = `${this.dia} de ${this.mes} de ${this.ano}`
        },
        localizacao(){
            if(navigator.geolocation) {
               navigator.geolocation.getCurrentPosition(position => {
                    this.latitude = position.coords.latitude
                    this.longitude = position.coords.longitude

                    this.url = `https://nominatim.openstreetmap.org/reverse?lat=${this.latitude}&lon=${this.longitude}&format=json`;
                    this.getCountry(this.url)
                })
            }
        },
        //converter latitude e longitude em cidade e estado
        async getCountry(link) { 
            fetch(link)
            .then(response => response.json())
            .then(data => {
                this.cidade = data.address.city
                this.estado = data.address.state
                this.estados.forEach(estadoBR => {
                    if(estadoBR.nome === this.estado) {
                        this.estado = estadoBR.sigla
                        this.local = ` ${this.cidade} - ${this.estado} `
                        // this.getIdCity()
                        this.getClimate()
                        this.cabecalho()
                    }
                })
            })
        },
        async getClimate() {
            let lang = 'pt_br'
            let linkClimate = `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${this.tokenApi}&lang=${lang}&units=metric`

            //dados atuais
            fetch(linkClimate)
            .then(response => response.json())
            .then(data => {
                this.forecast.push(
                    {
                        nome: data.name,
                        temperatura: `Temperatura Atual: ${Math.floor(data.main.temp)} °C`,
                        umidade: `Umidade do Ar: ${data.main.humidity} %`,
                        sensacao: `Sensação Térmica: ${Math.floor(data.main.feels_like)} °C`,
                        aparencia: `Previsão: ${data.weather[0].description.charAt(0).toUpperCase()}${data.weather[0].description.slice(1)}`,
                        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                    }
                )
                this.previsao = true
            })
            .catch(error => {
                console.log("Não foi possível obter os dados atuais do tempo.", error)
            })
        },
        pausarPrevisao() {
            this.pause = !this.pause
        }
    },
    created() {
        this.cabecalho()        
    },
    mounted() {
        this.localizacao()
    },
    watch: {
        tela:
        {
            handler(newValue) {
                console.log(newValue)
                if(newValue > 767) {
                    this.telaGrande = true
                }
                if(newValue <= 767) {
                    this.telaGrande = false
                }
            },
            immediate: true
        }
    }
}
</script>
<style scoped>
    #dateClimate, #dialog {
        background: linear-gradient(#460009, #660103, #460009);
        border-radius: 10px;
        width: 90vw;
        font-weight: bolder;
        overflow: hidden;
    }

    #dialog {
        border: 2px solid #b98f05;
        color: #b98f05;
        max-width: 85vw;
        margin: auto;
        overflow-y: scroll;
    }
    .info {
        margin:0 5px;
        padding: 10px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.264);
        backdrop-filter: blur( 13.5px );
        -webkit-backdrop-filter: blur( 13.5px );
        color: #F8F25F;
        box-shadow: 2px 2px 5px #F8F25F;
    }
    
    #permissao, #btnPrevisao {
        background-color: #660103;
        color: #F8F25F;
        border: 2px solid #b98f05;
    }
    #pausar, #fechar {
        background-color: transparent;
        color: #F8F25F;
        border: 2px solid #b98f05;
    }
    .v-btn--size-default {
        --v-btn-height: 30px;
        min-width: 30px;
        padding:0 8px;
        margin: 0 auto;
    }
    .v-btn__prepend {
        -webkit-margin-start: 0; 
        margin-inline-start: 0;
        -webkit-margin-end: 0; 
        margin-inline-end: 0;
    }
    .animation {
        animation: moviment 20s linear infinite;
    }

    #telaGrande {
        display: none;
    }
    @keyframes moviment {
        0% {
            margin-left: 100%;
        }
        100% {
            margin-left: -100%;
        }
    }

    @media (min-width: 1320px) {

        #telaGrande {
            display: flex;
        }
        #telaPequena {
            display: none;
        }
    }
</style>