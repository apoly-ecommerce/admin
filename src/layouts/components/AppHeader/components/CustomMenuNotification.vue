<template>
  <li class="NavBar_CustomMenu__item DropdownMenu">
    <a href="javascript:;" class="NavBar_CustomMenu__link DropdownMenu__btn NavBar_MenuLink"
      @click.prevent="activeDropdownMenu(tabName)"
    >
      <el-badge :value="total" class="item">
        <i class="fas fa-bell NavBar_CustomMenu__icon"></i>
      </el-badge>
    </a>
    <ul class="DropdownMenu__table"
      v-if="dropdownName && dropdownName===tabName"
    >
      <i
        class="fas fa-times DropdownMenu__btn--close"
        @click="activeDropdownMenu('')"
      ></i>
      <template v-if="notifications && notifications.length">
        <notification-item
          v-for="(notification, index) in notifications"
          :key="index"
          :notification="notification"
        />
      </template>
      <li v-else class="DropdownMenu__title">Không có thông báo nào</li>
      <li class="DropdownMenu__divider"></li>
      <li class="DropdownMenu__footer">
        <router-link
          class="DropdownMenu__link"
          to="/notifications"
        >
          Danh sách thông báo
        </router-link>
      </li>
    </ul>
  </li>
</template>

<script>
import NotificationItem from './NotificationItem';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    NotificationItem
  },
  name: 'custom-menu-notification',
  props: {
    dropdownName: { type: String, default: '' }
  },
  data() {
    return {
      tabName: 'notification',
      notifications: [],
      total: 0
    };
  },
  watch: {
    unread_notifications(data, oldData) {
      this.notifications = data;
      this.total = data.length;
    }
  },
  created() {
    this.fetchUnreadNotifications();
  },
  computed: {
    ...mapGetters({
      'unread_notifications': 'notification/getUnreadNotifications'
    })
  },
  methods: {
    ...mapActions({
      'fetchUnreadNotifications': 'notification/fetchUnreadNotifications',
      'markAllNotificationsAsRead': 'notification/markAllNotificationsAsRead'
    }),
    activeDropdownMenu(name) {
      if (name && this.total) {
        this.markAllNotificationsAsRead()
        .then(res => {
          this.total = 0;
        })
        .catch(err => {
          console.error(err);
        });
      } else {
        this.notifications = [];
      }
      this.$emit('eventActiveDropdownMenu', name);
    }
  }
}
</script>