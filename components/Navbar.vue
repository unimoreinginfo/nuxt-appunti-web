<template>
  <div>
    <div id="navbar" class="flexbox justify-between" style="background: #5352ed;">
      <span id="logo" class="bright">
        <a href="/" style="text-decoration: none; color: inherit;">appunti.me</a>
      </span>
      <div id="desktop">
        <a href="/"><nav class="bright">home</nav></a>
        <a href="/subjects"><nav class="bright">materie disponibili</nav></a>
        <a href="/login" v-if="!$store.getters.isLogged"><nav class="bright"><b>login</b></nav></a>
        <a href="/panel" v-if="$store.getters.isLogged"><nav class="bright"><b>il tuo profilo</b></nav></a>
      </div>
      <div id="mobile-toggle" @click="toggleMenu">
        <div class="bar first"></div>
        <div class="bar second"></div>
      </div>
    </div>
    <div id="mobile-menu" class="flexbox align-center justify-center">
        <ul>
            <li><a href="/"><nav class="bright">home</nav></a></li>
            <li><a href="/subjects"><nav class="bright">materie disponibili</nav></a></li>
            <li><a href="/login" v-if="!$store.getters.isLogged"><nav class="bright"><b>login</b></nav></a></li>
            <li><a href="/panel" v-if="$store.getters.isLogged"><nav class="bright"><b>il tuo profilo</b></nav></a></li>
        </ul>
    </div>
  </div>
</template>