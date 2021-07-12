<template>
  <div
    class="msg-item"
    msg-id=""
    tabindex="0"
    role="button"
  >
    <div class="conv-item h-100">
      <div class=" h-100 d-flex align-items-center">
        <div class="conv-item__avatar">
          <user-avatar />
        </div>
        <div class="conv-item__status">
          <user-status />
        </div>
        <div class="conv-item__content">
          <conv-item-content />
        </div>
        <div class="conv-item__setting">
          <conv-item-setting />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from '../../CommonComponents/UserAvatar';
import UserStatus from '../../CommonComponents/UserStatus';
import ConvItemContent from './ConvItemContent';
import ConvItemSetting from './ConvItemSetting';

export default {
  components: {
    UserAvatar,
    UserStatus,
    ConvItemContent,
    ConvItemSetting
  }
}
</script>