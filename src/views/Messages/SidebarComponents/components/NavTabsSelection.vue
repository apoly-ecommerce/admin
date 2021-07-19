<template>
  <div class="navTabs-selection">
    <div class="navTag-wrap">
      <div v-if="userAuth" class="author flex-c">
        <div class="author-avatar position-relative" role="button">
          <div class="avatar-thumbnail">
            <img
              class="avatar-photo img"
              :title="userAuth.name"
              :src="userAuth.image"
              :alt="userAuth.name"
            >
          </div>
          <current-status-circle />
        </div>
      </div>
      <div class="tabs">
        <div
          title="Danh sách bạn bè"
          class="tab-item flex-c"
          role="button"
          data-id=""
          :class="{ 'active': tabActive === 'myFriends' }"
          @click="changeTabActive('myFriends')"
        >
          <el-badge :value="3" class="item">
            <i class="fas fa-address-book"></i>
          </el-badge>
          <span class="d-none">Danh sách bạn bè</span>
        </div>

        <div
          title="Tin nhắn cá nhân"
          class="tab-item flex-c"
          role="button"
          data-id=""
          :class="{ 'active': tabActive === 'convFriends' }"
          @click="changeTabActive('convFriends')"
        >
          <el-badge :value="3" class="item">
            <i class="fas fa-comment-dots" />
          </el-badge>
          <span class="d-none">Tin nhắn cá nhân</span>
        </div>

        <div
          title="Tin nhắn nhóm"
          class="tab-item flex-c"
          role="button"
          data-id=""
          :class="{ 'active': tabActive === 'convGroup' }"
          @click="changeTabActive('convGroup')"
        >
          <el-badge :value="3" class="item">
            <i class="fas fa-comments" />
          </el-badge>
          <span class="d-none">Tin nhắn nhóm</span>
        </div>

        <div
          title="Báo cáo sự cố"
          role="button"
          data-id=""
          class="tab-item flex-c"
          :class="{ 'active': tabActive === 'convFeedback' }"
          @click="changeTabActive('convFeedback')"
        >
          <el-badge :value="3" class="item">
            <i class="el-icon-warning" />
          </el-badge>
          <span class="d-none">Báo cáo sự cố</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CurrentStatusCircle from '../../CommonComponents/CurrentStatusCircle';

export default {
  components: {
    CurrentStatusCircle
  },
  computed: {
    ...mapGetters({
      'tabActive': 'message/getTabChatSelected',
      'userAuth' : 'auth/getUserAuth'
    })
  },
  methods: {
    ...mapActions({
      'changeTabActive': 'message/changeTabActive'
    })
  }
}
</script>