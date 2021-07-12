<template>
  <li class="DropdownMenu__title">
    <element-notification
      :type="notification.type"
      :data="notification.data"
    />
  </li>
</template>

<script>
import ElementNotification from '@/components/ElementNotification';

export default {
  components: {
    ElementNotification
  },
  props: ['notification']
}
</script>