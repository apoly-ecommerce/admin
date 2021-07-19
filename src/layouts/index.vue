<template>
  <div class="AppContainer">
    <App-header />
    <App-sidebar />
    <main class="AppMain">
      <App-main />
      <App-footer />
    </main>
  </div>
</template>

<script>
import { AppMain, AppHeader, AppSidebar, AppFooter, AppSetting } from './components';
import InitPusher from '@/utils/pusher';
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
  name: 'Layout',
  components: {
    AppMain,
    AppHeader,
    AppSidebar,
    AppFooter,
    AppSetting,
  },
  created() {
    // User Channel
    InitPusher.privateChannel('user', channel => {
      channel.bind('user.created', data => {
        if (
          (data.creator_id  !== this.store.userAuth.id) &&
          (data.shop_id     === this.store.userAuth.shop_id)
        ) {
          notifySound();
          this.$message({
            message: `${data.name} vừa được thêm vào danh sách bạn bè`,
            type: 'info',
            duration: 5 * 1000
          });
        }
      })
    });
  },
  computed: {
    ...mapState({
      store: mapStateToProps
    }),
  }
}
</script>
<style>
  .AppContainer {
    overflow: hidden;
  }
  .AppMain {
    transition: transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    margin-left: 160px;
  }
</style>