<template>
  <div v-if="conv" class="msg-item" data-id="div_TagMsgThreadChItem" role="button">
    <div class="conv-item d-flex aling-items-center">
      <div class="d-flex conv-item__avatar">
        <div class="thumbnail" :title="conv.role">
          <img class="avatar-photo" :src="conv.avatar" :alt="conv.title">
        </div>
      </div>
      <div class="conv-status"></div>
      <div class="conv-item-content d-flex flex-column justify-content-center">
        <div class="conv-item-title">
          <div class="d-flex justify-content-between align-items-center">
            <div class="conv-item-title__name truncate">
              <span>{{ conv.title }}</span>
            </div>
            <div class="conv-item-title__more">
              <span>{{ lastIbAt }}</span>
            </div>
          </div>
        </div>
        <div class="conv-item-body">
          <div class="conv-item-body__main">
            <div class="conv-message truncate">
              <span>{{ conv.truncate }}</span>
            </div>
          </div>
        </div>
      </div>
    <div class="conv-item-setting"></div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: ['conv'],
  computed: {
    lastIbAt() {
      return moment(this.$props.conv.last_ib_at).locale('vi').endOf('day').fromNow(true);
    }
  }
}
</script>