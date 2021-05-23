<template>
  <div class="AppContainer">
    <App-header />
    <App-sidebar />
    <main class="AppMain">
      <App-main />
      <App-footer />
    </main>
  </div>
</template>

<script>
// Components @ > layouts
import { AppMain, AppHeader, AppSidebar, AppFooter, AppSetting } from './components';

export default {
  name: 'Layout',
  components: {
    AppMain,
    AppHeader,
    AppSidebar,
    AppFooter,
    AppSetting,
  }
}
</script>
<style>
  .AppContainer {
    overflow: hidden;
  }
  .AppMain {
    transition: transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    margin-left: 160px;
  }
</style>