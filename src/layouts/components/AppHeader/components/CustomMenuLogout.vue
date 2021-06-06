<template>
  <li class="NavBar_CustomMenu__item">
    <a href="javascript:;" @click.prevent="handleShowDialog" class="NavBar_CustomMenu__link NavBar_MenuLink">
      <fa-icon class="NavBar_CustomMenu__icon" icon="sign-out-alt" />
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
import { MessageBox } from 'element-ui';

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
      'logout' : 'user/logout'
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
      }).catch(error => {
        this.$message.error('Failed to restore Role !');
        alert("The system is having some problems, you can't log out of your account !");
      });
      this.isShowDialog = true;
    },
    handleShowDialog() {
      this.isShowDialog = true;
    }
  }
}
</script>