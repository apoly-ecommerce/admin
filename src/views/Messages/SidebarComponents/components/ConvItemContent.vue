<template>
  <div>
    <div class="d-flex align-items-center justify-content-between">
      <user-username />
      <div class="fromNow">10 ngày</div>
    </div>
    <div class="content-body-text">
      <small class="truncate-msg">Lorem ipsum dolor sit...</small>
    </div>
  </div>
</template>

<script>
import UserUsername from '../../CommonComponents/UserUsername';

export default {
  components: {
    UserUsername
  }
}
</script>