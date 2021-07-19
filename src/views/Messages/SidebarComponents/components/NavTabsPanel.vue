<template>
  <div class="ConversationList">
    <div class="list-group-wrap">

      <template v-if="convList && convList.length">
        <div class="virtualized-scroll" :style="heightScroll()" id="infinite-list-conv">
          <!-- <tab-msg-thrd-chat-item
            v-for="(conv, index) in convList"
            :key="index"
            :conv="conv"
          /> -->
        </div>
      </template>
      <msg-tab-skeleton :count="5" v-else/>
    </div>
  </div>
</template>

<script>
import TabMsgThrdChatItem from './TabMsgThrdChatItem';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    TabMsgThrdChatItem,
  },
  created() {
    this.setup();
  },
  data() {
    return {
      loading: false,
      items: [],
    };
  },
  computed: {
    ...mapGetters({
      'convList': 'message/getConvListSearch',
    })
  },
  methods: {
    ...mapActions({
      'fetchFriends': 'message/fetchFriends',
      'fetchChatRooms': 'message/fetchChatRooms',
    }),
    async setup() {
      try {
        await Promise.all([
          this.fetchFriends(),
          // this.fetchChatRooms(),
        ]);
      } catch (err) {
        console.error(err);
      }
    },
    heightScroll() {
      let hSbt = +document.querySelector(".SidebarTop").offsetHeight;
      let hLW  = +document.querySelector(".msgSidebar-menu").offsetHeight;
      return {
        height: `${hLW-hSbt-2}px`
      };
    }
  }
}
</script>