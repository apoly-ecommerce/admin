<template>
  <div class="chat-message wrap-message" msg-id="msg_id_123">
    <div class="chat-message__inner">
      <div class="msg-card msg-text">
        <div class="msg-sender-name">
          <span style="padding: 2px 10px 0 2px; cursor: pointer;">Thạch</span>
        </div>
        <div>
          <div id="">
            <span class="msg-sender-text">Lorem ipsum dolor</span>
          </div>
        </div>
        <!-- <div style="margin: 3px -5px 0px;"></div> -->
        <div style="margin-top: 10px;">
          <div class="msg-send-time d-flex">
            <span class="msg-send-time__sendTime">13:16</span>
          </div>
        </div>
        <div class="message-reaction-container">
          <btn-receive-msg />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BtnReceiveMsg from './BtnReceiveMsg';

export default {
  components: {
    BtnReceiveMsg
  }
}
</script>