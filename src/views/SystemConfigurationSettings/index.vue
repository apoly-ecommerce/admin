<template>
  <section class="PageSettingSystemConfig">
    <section class="MultipleTabs_Content">
      <el-tabs type="border-card">
        <el-tab-pane>
          <div class="tab-pane-label" slot="label">
            <i class="fa fa-cubes"></i>
            <small>BASIC SETTINGS</small>
          </div>
          <form-basic-settings-content @update="update" />
        </el-tab-pane>

        <el-tab-pane>
          <div class="tab-pane-label" slot="label">
            <i class="fas fa-phone-alt"></i>
            <small>SUPPORT</small>
          </div>
          <form-support-content @update="update" />
        </el-tab-pane>

        <el-tab-pane>
          <div class="tab-pane-label" slot="label">
            <i class="fa fa-credit-card"></i>
            <small>PAYMENT METHODS</small>
          </div>
          <form-payment-method-content />
        </el-tab-pane>

        <el-tab-pane>
          <div class="tab-pane-label" slot="label">
            <i class="fas fa-bell"></i>
            <small>NOTIFICATIONS</small>
          </div>
          <form-notifications-content />
        </el-tab-pane>

      </el-tabs>
    </section>
  </section>
</template>

<script>
import FormBasicSettingsContent from './components/FormBasicSettingsContent';
import FormSupportContent from './components/FormSupportContent';
import FormPaymentMethodContent from './components/FormPaymentMethodContent';
import FormNotificationsContent from './components/FormNotificationsContent';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    FormBasicSettingsContent,
    FormSupportContent,
    FormPaymentMethodContent,
    FormNotificationsContent
  },
  created() {
    this.formSetup();
  },
  computed: {
    ...mapGetters({
      'systemConfig': 'systemConfig/getSystemConfig'
    }),
  },
  methods: {
    ...mapActions({
      'setIsLoading': 'app/handleSetIsLoading',
      'viewSystemConfig': 'systemConfig/viewSystemConfig',
      'updateSystemConfig': 'systemConfig/updateSystemConfig'
    }),
    async formSetup() {
      this.setIsLoading(true);
      try {
        await this.viewSystemConfig();
      } catch (err) {
        console.error('[App Error] => ', err);
        this.$message.error('Có lỗi trong quá trình tải dữ liệu !');
      }
      this.setIsLoading(false);
    },
    update(formData) {
      this.updateSystemConfig(formData)
      .then(res => {
        this.$message({
          message: res.success,
          type: 'success',
          duration: 5 * 1000
        });
      })
      .catch(err => {
        if (err.status === 405) {
          return this.$message({
            message: err.data.data.error,
            type: 'error',
            duration: 5 * 1000
          });
        }
        this.$message.error('Có lỗi trong quá trình tải dữ liệu !');
      });
    }
  }
}
</script>
<style src="@/styles/app/setting-config.css"></style>