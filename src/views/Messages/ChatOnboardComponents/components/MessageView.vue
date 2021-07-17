<template>
<div id="messageView" class="message-view w-100">
  <div class="message-view__blur__overlay"></div>

  <drap-file-message />

  <div id="messageViewContainer" class="message-view__scroll">
    <div class="ScrollMsgContainer virtualized-scroll">
      <div class="message-view__scroll__inner fadeInAndOut" id="messageViewScroll">
        <div class="chat-date">
          <div class="start line"></div>
          <span>14:45  14/07/2021</span>
          <div class="d-flex">
            <div class="end line"></div>
          </div>
        </div>
        <!-- Start Chat item -->
        <div class="chat-item d-flex">
          <div class="avatar--overlay">
            <img class="u-avatar__photo" src="https://s120-ava-talk.zadn.vn/5/0/5/2/139/120/14f8a2cfec4005ed2e58a4ec2b3300df.jpg" alt="">
          </div>
          <div class="chat-content d-flex flex-column">
            <chat-message />
            <chat-message />
            <chat-message />
            <chat-message />
          </div>
        </div>
        <!-- End Chat Item -->

        <!-- Start Chat item -->
        <div class="chat-item d-flex me">
          <div class="avatar--overlay">
            <img class="u-avatar__photo" src="https://s120-ava-talk.zadn.vn/5/0/5/2/139/120/14f8a2cfec4005ed2e58a4ec2b3300df.jpg" alt="">
          </div>
          <div class="chat-content d-flex flex-column">
            <chat-message />
            <chat-message />
            <chat-message />
            <chat-message />
          </div>
        </div>
        <!-- End Chat Item -->

        <!-- Start Chat item -->
        <div class="chat-item d-flex">
          <div class="avatar--overlay">
            <img class="u-avatar__photo" src="https://s120-ava-talk.zadn.vn/5/0/5/2/139/120/14f8a2cfec4005ed2e58a4ec2b3300df.jpg" alt="">
          </div>
          <div class="chat-content d-flex flex-column">
            <chat-message />
            <chat-message />
            <chat-message />
            <chat-message />
          </div>
        </div>
        <!-- End Chat Item -->
      </div>
    </div>
  </div>
  <div class="chat-notify scroll-to-bottom" role="button">
    <i class="el-icon-arrow-down"/>
  </div>
  <img class="message-view__blur" src="https://s120-ava-talk.zadn.vn/7/d/9/b/2/120/8077323e0d598ba74c7c5466be2b544d.jpg" alt="" style="opacity: 0.85; image-rendering: pixelated;">
</div>
</template>

<script>
import DrapFileMessage from './DrapFileMessage';
import ChatMessage from './ChatMessage';

export default {
  components: {
    DrapFileMessage,
    ChatMessage
  }
}
</script>