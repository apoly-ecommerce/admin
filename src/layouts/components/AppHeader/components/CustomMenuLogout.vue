<template>
  <li class="NavBar_CustomMenu__item">
    <a href="javascript:;" @click.prevent="handleShowDialog" class="NavBar_CustomMenu__link NavBar_MenuLink">
      <i class="NavBar_CustomMenu__icon fas fa-sign-out-alt"></i>
      <span class="NavBar_CustomMenu__label">Log out</span>
    </a>
    <form-confirm
      v-if="isShowDialog"
      :text="'You want to sign out of your account?'"
      @close="closeDialog"
      @agree="agreeDialog"
    />
  </li>
</template>

<script>
// Store
import { mapActions } from 'vuex';
// Components
import FormConfirm from '@/components/FormConfirm';

export default {
  name: 'custom-menu-logout',
  components: {
    FormConfirm
  },
  data() {
    return {
      isShowDialog: false
    }
  },
  methods: {
    ...mapActions({
      'logout' : 'auth/logout'
    }),
    closeDialog() {
      this.isShowDialog = false;
    },
    agreeDialog() {
      this.logout().then(res => {
        this.$message({
          type: 'success',
          message: res.success
        });
        this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      }).catch(err => {
        this.$message.error('Failed to restore Role !');
        console.error('[App Error] => ', err);
      });
      this.isShowDialog = true;
    },
    handleShowDialog() {
      this.isShowDialog = true;
    }
  }
}
</script>