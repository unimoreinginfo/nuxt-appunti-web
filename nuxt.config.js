export default {
    buildDir: 'appunti.me',
    env: {
        URI: 'https://appunti.me'
    },
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'appunti.me',
        htmlAttrs: {
            lang: 'it'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            {
                href: 'https://fonts.gstatic.com',
                rel: 'preconnect'
            },
            {
                href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;500;700&family=IBM+Plex+Sans:wght@300&family=Lobster&display=swap',
                rel: 'stylesheet',
                type: 'text/css'
            }
        ]
    },
    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        {
            src: '~/plugins/client.js', ssr: false, mode: 'client'
        }
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/fontawesome',
        'cookie-universal-nuxt'
    ],
    fontawesome: {
        component: 'fa',
        icons: {
            solid: [
                'faChevronDown',
                'faDownload',
                'faUser',
                'faSignInAlt',
                'faCheckSquare',
                'faListAlt',
                'faUpload',
                'faEdit',
                'faCog',
                'faSignOutAlt',
                'faCircleNotch',
                'faTrash',
                'faArrowAltCircleLeft'
            ]
        }
    },
    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {},

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    },
    router: {
        middleware: ['authenticated']
    },
    serverMiddleware: [{
        path: '/bridge',
        handler: '~/bridge'
    }]
}
