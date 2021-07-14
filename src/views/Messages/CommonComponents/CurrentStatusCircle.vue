<template>
  <div class="user-mode-icon-avt position-absolute" style="bottom: 0; right: 0;">
    <div :style="modeStyle"></div>
  </div>
</template>

<script>
export default {
  computed: {
    modeStyle() {
      return {
        width: '10px',
        height: '10px',
        background: '#15a85f',
        borderRadius: '50%',
        display: 'inline-block',
        boxShadow: '0px 0px 0px 1px #fff'
      }
    }
  }
}
</script>