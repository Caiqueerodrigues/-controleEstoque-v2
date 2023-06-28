<template>
<v-row
    id="dateClimate"
    class="align-center"
>
    <v-col
        cols="12"
        id="rowSpan"
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
        </span>
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
            permissao:'Forneçao acesso a Localização para ver a previsão do tempo!'
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
            this.dateLocal = `${this.dia}/${this.mes}/${this.ano}`
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
    },
    created() {
        this.cabecalho()        
    },
    mounted() {
        this.localizacao()
    }
}
</script>
<style scoped>
    #dateClimate {
        background: linear-gradient(#460009, #660103, #460009);
        border-radius: 10px;
        font-weight: bolder;
        overflow: hidden;
    }

    .info {
        margin:0 5px;
        padding: 10px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.264);
        backdrop-filter: blur( 13.5px );
        -webkit-backdrop-filter: blur( 13.5px );
    }
    
    #rowSpan {
        
        animation: moviment 20s linear infinite;
    }
    @keyframes moviment {
        0% {
            margin-left: 100%;
        }
        100% {
            margin-left: -100%;
        }
    }
</style>