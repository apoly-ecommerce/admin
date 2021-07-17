<template>
  <div class="AppContainer">
    <App-header />
    <App-sidebar />
    <main class="AppMain">
      <App-main />
      <App-footer />
    </main>

    <!-- Widget Message -->
    <chat-room-widget />
  </div>
</template>

<script>
import { AppMain, AppHeader, AppSidebar, AppFooter, AppSetting } from './components';
import { ChatRoomWidget } from '@/components/MessageWidget';

export default {
  name: 'Layout',
  components: {
    AppMain,
    AppHeader,
    AppSidebar,
    AppFooter,
    AppSetting,
    ChatRoomWidget
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