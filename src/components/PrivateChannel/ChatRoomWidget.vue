<template></template>
<script>
import Pusher from 'pusher-js';
import { pusherAuthorizer } from '@/helpers';
import { notifySound } from '@/utils/notificationSound';
import { mapState , mapActions } from 'vuex';

function mapStateToProps(state) {
  const userAuth = {...state.auth.userAuth};
  return {
    userAuth,
    me: userAuth.id,
  }
}

export default {
  created() {
    this.pusherConnect();
  },
  data() {
    return {
      pusher: null,
      channel: null,
    };
  },
  computed: {
    ...mapState({
      store: mapStateToProps
    }),
  },
  methods: {
    ...mapActions({
      'unshiftConvItemIntoRoom': 'message/unshiftConvItemIntoRoom'
    }),
    pusherConnect() {
      this.pusher = new Pusher('644241614abb9f91947c', {
        cluster: 'us2',
        encrypted: true,
        authorizer: pusherAuthorizer,
      });
      this.channel = this.pusher.subscribe('private-chatRoom');
      this.handleChatRoomCreated();
    },

    handleChatRoomCreated() {
      this.channel.bind('chatRoom.created', data => {
        this.$emit('created', data);
        const userCreated = data.user_created;
        if (
            (userCreated.id !== this.store.userAuth.id) &&
            data.invited_users.includes(this.store.userAuth.id)
          ) {
          const roomName = data.name;
          this.$message({
            message: `${userCreated.name} đã mời bạn tham gia nhóm ${roomName}`,
            type: 'success',
            duration: 5 * 1000
          });
          notifySound();
        }
        this.unshiftConvItemIntoRoom({
          avatar: data.image,
          title: data.name,
          last_ib_at: data.created_at,
          truncate: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, voluptas.'
        });
      });
    },
  }
}
</script>