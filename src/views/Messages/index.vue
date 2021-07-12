<template>
  <section class="PageMessage">
    <section class="d-flex">
      <sidebar-components />
      <div class="msg-divider"></div>
      <chat-onboard-components />
    </section>
  </section>
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