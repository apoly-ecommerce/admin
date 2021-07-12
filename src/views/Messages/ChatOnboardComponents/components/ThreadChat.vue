<template>
  <section class="ThreadChat">
    <div class="d-flex align-items-center">
      <div class="avatarChat">
        <user-avatar />
      </div>
      <div class="threadChat__title">
        <div class="main-title-container">
          <user-username />
        </div>
        <div class="sub-title-container">
          <small class="last-online-at">Truy cập 14 phút trước</small>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UserAvatar from '../../CommonComponents/UserAvatar';
import UserUsername from '../../CommonComponents/UserUsername';

export default {
  components: {
    UserAvatar,
    UserUsername
  }
}
</script>