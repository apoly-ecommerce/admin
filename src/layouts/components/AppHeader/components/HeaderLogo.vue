<template>
  <router-link
    class="AppHeader__logo"
    to="/"
    activeClass=""
    exactActiveClass=""
    ariaCurrentValue="app-header"
  >
    <span class="AppHeader__logoThumbNail">
      <img :src="getLogo" class="img-contain" alt="App name">
    </span>
  </router-link>
</template>

<script>
// import store
import { mapGetters } from 'vuex';

export default {
  name: 'header-logo',
  computed: {
    ...mapGetters({
      'getLogo': 'app/getLogo'
    }),
  }
}
</script>