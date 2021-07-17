<template>
  <div class="PageMessage">
    <div class="d-flex h-100">
      <sidebar-components />
      <div class="msg-divider right"></div>
      <chat-onboard-components />
    </div>
  </div>
</template>

<script>
import SidebarComponents from './SidebarComponents'
import ChatOnboardComponents from './ChatOnboardComponents';

export default {
  components: {
    SidebarComponents,
    ChatOnboardComponents
  }
}
</script>
<style src="@/styles/app/msg-container.css"></style>