<template>
  <div id="chatInput" class="chat-input-control">
    <div class="chat-input__content">
      <div class="chat-input__content__input">
        <div class="d-flex">
          <div class="chat-input-container">
            <div class="d-flex w-100">
              <div
                ref="msgValueToSend"
                contenteditable="true"
                id="chatInputControl"
                class="rich-input empty"
                spellcheck="false"
                autocomplete="off"
                data-trailer="Thạch"
                :placeholder="!html ? 'Nhập tin nhắn tới Thạch' : false"
                @keyup="onkeyup"
              ></div>
              <div class="chat-input-btns">
                <div class="chatbar-emoji btn-chatbar-primary position-relative" role="button" title="Biểu cảm">
                  <i class="far fa-laugh"></i>
                </div>
                <div class="chatbar-btn-group">
                  <div v-if="!messageText" class="chatbar-emoji btn-chatbar-primary" role="button" title="Gửi yêu thương đến Thạch">
                    <span class="emoji-sizer emoji-outer" style="background: url(https://chat.zalo.me/assets/emoji.1e7786c93c8a0c1773f165e2de2fd129.png?v=20180604) 84% 72.5% / 5100%; -webkit-user-drag: none; margin: 0px; width: 24px; height: 24px; position: relative;">/-heart</span>
                  </div>
                  <div
                    v-else
                    role="button"
                    class="chatbar-btn-item send-msg-btn btn-chatbar-primary"
                    @click="onSendMessage"
                  >
                    <i class="fas fa-paper-plane"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputValue from './InpueValue';

export default {
  components: {
    InputValue
  },
  data() {
    return {
      searchData: "",
      messageText: "",
      html: ""
    }
  },
  methods: {
    onkeyup: function(e) {
      let _self   = e.target;
      let allData = _self.innerHTML;
      this.html   = allData;
      if (allData) {
        let firstDivIdx = allData.indexOf('<');
        let noHtml = allData.slice(0, firstDivIdx);
        let isHtml = allData.slice(firstDivIdx, allData.length);
        if (firstDivIdx === -1) {
          isHtml = '';
          noHtml = allData;
        }
        this.messageText = `<div>${noHtml}</div>${isHtml}`.replaceAll('<div', "<div class='msg_txt_line'");
      } else {
        this.messageText = '';
      }
    },
    onSendMessage() {
      this.onResetData();
    },
    onResetData() {
      this.html = '';
      this.messageText = '';
      this.$refs.msgValueToSend.innerHTML = '';
    }
  }
}
</script>