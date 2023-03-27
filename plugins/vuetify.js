import 'vuetify/styles'
import { createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

//icons
import '@mdi/font/css/materialdesignicons.css'

export default defineNuxtPlugin(nuxtApp => {
    const vuetify = createVuetify({
        ssr: true,
        components,
        directives,
        theme: {
            defaultTheme: "myTheme",
            themes: {
                myTheme: {
                    dark: false,
                    colors: {
                        color1: "#221000",
                        color2: "#860B07",
                        golden1: "#825200",
                        golden2: "#F8F25F",
                        golden3: "#b98f05",
                        golden4: "#c79746",
                        golden5: "#F8F25F",
                    },
                }
            }
        },
        icons: {
            defaultSet: 'mdi',
        }
    })
      
    nuxtApp.vueApp.use(vuetify, {
        iconfont: 'md'
    })
})
      