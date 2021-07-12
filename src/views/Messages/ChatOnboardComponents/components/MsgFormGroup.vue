<template>
  <section class="MsgFormGroup">
    <div class="d-flex justify-content-between align-items-center position-relative">
      <div class="MsgFormInput">
        <el-input
          type="textarea"
          ref=""
          placeholder="Nhập tin nhắn gửi tới Phan Huy Kha"
          v-model="strSearch"
          spellcheck="false"
          id="message-value"
        />
      </div>
      <div class="MsgFormBtns">
        <div class="d-flex justify-content-between align-items-center">
          <div id="SendMsgBtn" role="button">
            <i class="el-icon-s-promotion"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import MsgFormBtnLike from './MsgFormBtnLike';
import MsgFormBtnSticker from './MsgFormBtnSticker.vue';

const iconConfig = {
  placement: 'top',
  size: '30px',
  name: 'fa-send',
  color: '#fff'
}

export default {
  components: {
    MsgFormBtnLike,
    MsgFormBtnSticker,
  },
  data() {
    return {
      strSearch: '',
      iconConfig: Object.assign({}, iconConfig)
    }
  }
}
</script>