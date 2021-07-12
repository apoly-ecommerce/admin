<template>
  <section class="ChatOnboard w-100">

    <div class="h-100 d-flex flex-column justify-content-between position-relative">
      <!-- Chat Container Top -->
      <section class="ChatHeader">
        <div class="ChatHeader-wrap h-100">
          <div class="h-100 d-flex justify-content-between align-items-center">
            <thread-chat />
            <tools-chat />
          </div>
        </div>
      </section>

      <!-- Chat Container Bottom -->
      <section class="ChatView">
        <article class="ChatView-wrap h-100">
          <msg-view />
          <msg-toolbar />
          <msg-form-group />
        </article>
      </section>
    </div>

  </section>
</template>

<script>
import ThreadChat from './components/ThreadChat';
import ToolsChat from './components/ToolsChat';
import MsgView from './components/MsgView';
import MsgToolbar from './components/MsgToolbar';
import MsgFormGroup from './components/MsgFormGroup';

export default {
  components: {
    ThreadChat,
    ToolsChat,
    MsgView,
    MsgToolbar,
    MsgFormGroup
  }
}
</script>

<style src="@/styles/app/chatOnboard-msg.css"></style>