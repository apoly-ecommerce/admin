<template>
  <div class="ConversationList">
    <div class="virtualized-scroll">
      <div class="virtualized__innerScrollContainer">
        <template v-if="convList && convList.length">
          <tab-msg-thrd-chat-item
            v-for="(conv, index) in convList"
            :key="index"
            :conv="conv"
          />
        </template>
        <msg-tab-skeleton :count="5" v-else/>
      </div>
    </div>
  </div>
</template>

<script>
import MsgTabSkeleton from '../../CommonComponents/MsgTabSkeleton';
import TabMsgThrdChatItem from './TabMsgThrdChatItem';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    MsgTabSkeleton,
    TabMsgThrdChatItem
  },
  created() {
    this.setup();
  },
  computed: {
    ...mapGetters({
      'convList': 'message/getConvListSearch'
    })
  },
  methods: {
    ...mapActions({
      'fetchConvListFriends': 'message/fetchConvListFriends',
      'fetchChatRooms': 'message/fetchChatRooms'
    }),
    async setup() {
      try {
        await Promise.all([
          this.fetchConvListFriends(),
          this.fetchChatRooms(),
        ]);
      } catch (err) {
        console.error(err);
      }
    }
  }
}
</script>