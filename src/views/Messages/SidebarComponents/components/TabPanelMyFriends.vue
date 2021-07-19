<template>
  <div>
    <tab-msg-thrd-chat-item
      v-for="(friend, $index) in myFriends"
      :key="$index"
      :conv="friend"
    />
    <infinite-loading @infinite="infiniteHandler">
      <span slot="no-more"></span>
      <msg-tab-skeleton slot="no-results" :count="5"/>
    </infinite-loading>
  </div>
</template>

<script>
import TabMsgThrdChatItem from './TabMsgThrdChatItem';
import InfiniteLoading from 'vue-infinite-loading';
import MsgTabSkeleton from './MsgTabSkeleton';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    TabMsgThrdChatItem,
    InfiniteLoading,
    MsgTabSkeleton
  },
  data() {
    return {
      list: [],
      listQuery: {
        limit: 10,
        page: 1
      },
      ps: null
    };
  },
  computed: {
    ...mapGetters({
      'myFriends': 'message/getConvListSearch'
    })
  },
  methods: {
    ...mapActions({
      'fetchMyFriends': 'message/fetchMyFriends'
    }),
    infiniteHandler($state) {
      this.fetchMyFriends(this.listQuery)
      .then(data => {
        if (data.friends.length) {
          this.listQuery.page += 1;
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },
  }
};
</script>