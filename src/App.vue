<template>
  <div id="app">
    <loading :class="{ 'show': isLoading }"/>
    <router-view></router-view>
  </div>
</template>

<script>
// Components
import Loading from '@/components/Loading';

// Store
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    Loading
  },
  computed: {
    ...mapGetters({ 'isLoading': 'app/getIsLoading' })
  }
}
</script>
