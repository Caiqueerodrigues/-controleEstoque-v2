// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            titleTemplate: 'Controle de Estoque',
            htmlAttrs: {
                lang: 'pt-br'
            },
            meta: [
                { charset: 'UTF-8'},
                {name: 'viewport', content: 'width=device-width, initial-scale=1'},
                { hid: 'description', name: 'description', content: ''},
                { name: 'format-detection', content: 'telephone=no' },
                { hid: 'd4sign-domain-verification', name: 'd4sign-domain-verification',content: 'd3f378e8-f6ab-47cd-a98b-4cb40d038c52'},
            ],
        },
    },
    css: [
        "/assets/css/style.css",
        // "@/mdi/font/css/materialdesingicons.min.css",
        // 'vuetify/lib/style/main.sass'
    ],

    build: {
        transpile: ['vuetify']
    }, 

    vite: {
        define: {
            'process.env.DEBUG': false,
        },
    },

    components: { 
        dirs: [
            '~/components',
                {path: '~/components/', extensions: ['vue'], prefix: 'nuxt', global: true},
            '~/components/main/',
                {path: '~/components/main/', extensions: ['vue'], prefix: 'nuxt', global: true}
        ]
    }
    
})
