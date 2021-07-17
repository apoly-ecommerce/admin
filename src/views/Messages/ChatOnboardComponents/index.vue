<template>
  <div class="chatOnboard-component">
    <div class="chatOnboard-wrap d-flex flex-column h-100">
      <div class="header-onboard d-flex justify-content-between align-items-center">
        <thread-chat />
        <header-btns />
      </div>
      <article class="chatView-onboard d-flex">
        <message-view />
        <chat-toolbar/>
        <chat-input />
      </article>
    </div>
  </div>
</template>

<script>
import ThreadChat from './components/ThreadChat';
import MessageView from './components/MessageView';
import ChatInput from './components/ChatInput';
import ChatToolbar from './components/ChatToolbar';
import HeaderBtns from './components/HeaderBtns';

export default {
  components: {
    ThreadChat,
    MessageView,
    ChatInput,
    ChatToolbar,
    HeaderBtns
  }
}
</script>
<style src="@/styles/app/chatOnboard-msg.css"></style>