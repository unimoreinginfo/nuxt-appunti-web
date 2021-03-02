<template>
  <div>
    <Navbar />
    <Nuxt />
  </div>
</template>

<style lang="scss">

    @import '@/assets/scss/style.scss';
    #mobile-toggle{
        display: none;
        width: 25px;
        .bar{
            background: #fefefe;
            width: 100%;
            height: 1px;
            margin-bottom: 7.5px;
        }
    }
    #mobile-menu{
        display: none;
        position: fixed;
        z-index: 199;
        top: 80px;
        height: calc(100vh - 80px);
        width: 100%;
        left: 100vw;
        background: $blue;
        ul{
            margin-top: -80px;
            padding: 0;
            list-style: none;
            li{
                font-family: 'IBM Plex Sans', sans-serif;
                margin-top: 10px;
                opacity: 0;
                transform: translateY(50px);
                a{
                    color: $white;
                    text-decoration: none;
                }
                width: 100%;
                font-size: 10vw;
            }
        }
    }
    @media screen and (max-width: 768px) {
        #mobile-toggle{
            display: block;
        }
        #mobile-menu{
            display: flex;
        }
    }

</style>