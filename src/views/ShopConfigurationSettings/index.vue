<template>
  <section class="PageSettingShopConfig">
    <section class="MultipleTabs_Content">
      <el-tabs type="border-card">
        <el-tab-pane>
          <div class="tab-pane-label" slot="label">
            <i class="fas fa-shopping-cart"></i>
            <small>ORDER</small>
          </div>
          <form-order-content
            v-if="isLoaded"
            @update="handleUpdate"
          />
        </el-tab-pane>

        <el-tab-pane>
          <div class="tab-pane-label" slot="label">
            <i class="fas fa-laptop"></i>
            <small>VIEWS</small>
          </div>
          <form-views-content
            v-if="isLoaded"
            @toggle="handleNotificationToggle"
            @update="handleUpdate"
          />
        </el-tab-pane>

        <el-tab-pane>
          <div class="tab-pane-label" slot="label">
            <i class="fas fa-phone-alt"></i>
            <small>SUPPORT</small>
          </div>
          <form-support-content
            v-if="isLoaded"
            @toggle="handleNotificationToggle"
            @update="handleUpdate"
          />
        </el-tab-pane>

        <el-tab-pane>
          <div class="tab-pane-label" slot="label">
            <i class="fas fa-bell"></i>
            <small>NOTIFICATIONS</small>
          </div>
          <form-notifications-content
            v-if="isLoaded"
            @toggle="handleNotificationToggle"
          />
        </el-tab-pane>
      </el-tabs>
    </section>
  </section>
</template>

<script>
import FormOrderContent from './components/FormOrderContent';
import FormViewsContent from './components/FormViewsContent';
import FormSupportContent from './components/FormSupportContent';
import FormNotificationsContent from './components/FormNotificationsContent';
import { mapActions } from 'vuex';
import { Message } from 'element-ui';

export default {
  components: {
    FormOrderContent,
    FormViewsContent,
    FormSupportContent,
    FormNotificationsContent
  },
  data() {
    return {
      isLoaded: false,
      config: null
    }
  },
  created() {
    this.formSetup();
  },
  methods: {
    ...mapActions({
      'setIsLoading': 'app/handleSetIsLoading',
      'viewConfig': 'config/viewConfig',
      'updateConfig': 'config/updateConfig',
      'toggleNotification': 'config/toggleNotification'
    }),
    async formSetup() {
      try {
        this.isLoaded = false;
        this.setIsLoading(true);
        const dataViewConfig = await this.viewConfig();
        this.config = dataViewConfig.config.shop_id;
        this.setIsLoading(false);
        this.isLoaded = true;
      } catch (error) {
        console.log(error);
        this.$message.error('Có lỗi trong quá trình tải dữ liệu !');
      }
    },
    handleUpdate(formData) {
      this.updateConfig({formData, config: this.config})
      .then(res => {
        Message({
          message: res.success,
          type: 'success',
          duration: 5 * 1000
        });
      })
      .catch(error => {
        console.error('[App Error] => ', error);
        this.$message.error('Cật nhật không thành công !');
      });
    },
    handleNotificationToggle(node) {
      this.toggleNotification(node)
      .then(res => {
        Message({
          message: res.success,
          type: 'success',
          duration: 5 * 1000
        });
      })
      .catch(error => {
        console.error('[App Error] => ', error);
        this.$message.error('Cật nhật không thành công !');
      });
    }
  }
}
</script>
<style src="@/styles/app/setting-config.css"></style>