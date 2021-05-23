<template>
  <section class="AppContent">
    <breadcrumb />
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view :key="getKey" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
// Components @ > components
import Breadcrumb from '@/components/Breadcrumb';

export default {
  name: 'App-main',
  components: {
    Breadcrumb
  },
  computed: {
    getKey() {
      return this.$route.path;
    }
  }
}
</script>
<style>
  .AppContent {
    padding: 15px;
    background-color: var(--content-bg);
    height: var(--app-content--height);
    overflow: auto;
  }
</style>