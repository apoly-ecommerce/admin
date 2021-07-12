<template>
  <section class="ConversationList">
    <div class="scroll-container">
      <conversation-item />
      <conversation-item />
      <conversation-item />
      <conversation-item />
      <conversation-item />
      <conversation-item />
    </div>
  </section>
</template>

<script>
import ConversationItem from './ConversationItem';

export default {
  components: {
    ConversationItem
  }
}
</script>