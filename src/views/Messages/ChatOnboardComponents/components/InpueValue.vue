<template>
  <div class="w-100">
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
  </div>

</template>

<script>

export default {
  data() {
    return {
      html: '',
      keyUpCode: '',
      keyDownCode: ''
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
        let result = `<div>${noHtml}</div>${isHtml}`.replaceAll('<div', "<div class='msg_txt_line'");
        this.$emit('keyup', result);
      } else {
        this.$emit('keyup', '');
      }
    },
  }
}
</script>