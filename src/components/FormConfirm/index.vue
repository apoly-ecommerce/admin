<template>
  <div class="Canvas Canvas_canvasSemiTransparentBlack">
    <div class="CanvasContent_base">
      <div class="Dialog_dialog">
        <div class="Dialog_content">
          <p class="Dialog_text">{{ text }}</p>
        </div>
        <div class="Dialog_footer">
          <button type="button" @click="closeDialog" class="Dialog_button Dialong_cancel">
            <span class="base_text">Cancel</span>
          </button>
          <button type="button" @click="agreeDialog" class="Dialog_button Dialong_agree">
            <span class="base_text">Logout</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'form-confirm',
  props: {
    text: {
      type: String,
      require: true
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close');
    },
    agreeDialog() {
      this.$emit('agree');
    }
  }
}
</script>
<style>
  .Canvas {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .Canvas .CanvasContent_base {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 25px;
  }
  .Dialog_dialog {
    background-color: var(--app-bg);
    border-radius: 3px;
    min-width: 270px;
    max-width: 325px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.12);
    transform: translateY(-50px);
  }
  .Dialog_dialog .Dialog_content {
    padding: 25px;
    color: #000;
    border-bottom: 1px solid #f2f2f2;
  }
  .Dialog_dialog .Dialog_footer {
    display: flex;
  }
  .Dialog_dialog .Dialog_button {
    flex: 0 0 50%;
    max-width: 50%;
    height: 48px;
    background: none;
    font-weight: 600;
    border-bottom: 1px!important;
    border-top: 0;
    border-right: 0;
    border-left: 0;
    color: gray;
    font-size: 1.05rem;
  }
  .Dialog_dialog .Dialog_button.Dialong_cancel {
    border-right: 1px solid #f2f2f2;
  }
  .Dialog_dialog .Dialog_button.Dialong_agree {
    color: #1dbfaf;
  }
  .Dialog_dialog .Dialog_button.Dialong_agree:hover {
    opacity: .8;
  }
  .Canvas_canvasSemiTransparentBlack {
    background: rgba(0,0,0,0.6);
  }
</style>