<template>
  <div class="content">
    <el-form
      ref="formData"
      :model="formData"
      @submit.prevent
    >
      <el-row :gutter="5">
        <el-col :span="12" class="p-1">
          <div class="heading">
            <div class="title">NOTIFICATIONS</div>
            <div class="divider"></div>
          </div>

          <el-row :gutter="5">
            <el-col :span="18" class="p-1">
              <el-form-item prop="notify_when_vendor_registered" class="text-end">
                <label for="notify_when_vendor_registered" class="FormLabel">
                  <span class="FormLabel__title">NEW VENDOR REGISTERED:</span>
                  <el-tooltip class="item" effect="dark" content="Gửi cho tôi thông báo khi một nhà cung cấp mới đã được đăng ký" placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </label>
                <div class="switch-wrap d-flex align-items-center justify-content-end">
                  <span class="switch-stt">OFF</span>
                  <el-switch
                    v-model="formData.notify_when_vendor_registered"
                    class="p-2"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    :active-value="true"
                    :inactive-value="false"
                    @change="toggle('notify_when_vendor_registered')"
                  />
                  <span class="switch-stt">ON</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="5">
            <el-col :span="18" class="p-1">
              <el-form-item prop="notify_new_message" class="text-end">
                <label for="notify_new_message" class="FormLabel">
                  <span class="FormLabel__title">NEW MESSAGE:</span>
                  <el-tooltip class="item" effect="dark" content="Gửi cho tôi thông báo khi có tin nhắn mới" placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </label>
                <div class="switch-wrap d-flex align-items-center justify-content-end">
                  <span class="switch-stt">OFF</span>
                  <el-switch
                    v-model="formData.notify_new_message"
                    class="p-2"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    :active-value="true"
                    :inactive-value="false"
                    @change="toggle('notify_new_message')"
                  />
                  <span class="switch-stt">ON</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

const defaultFormData = {
  notify_when_vendor_registered: '',
  notify_new_message: '',
};

export default {
  name: 'form-notifications-content',
  data() {
    return {
      formData: Object.assign({}, defaultFormData),
    };
  },
  watch: {
    systemConfig(data) {
      this.formData = Object.assign({}, data);
    }
  },
  computed: {
    ...mapGetters({
      'systemConfig': 'systemConfig/getSystemConfig'
    })
  },
  methods: {
    ...mapActions({
      'toggleSystemConfig': 'systemConfig/toggleSystemConfig'
    }),
    toggle(node) {
      this.toggleSystemConfig(node)
      .then(res => {
        this.$message({
          message: res.success,
          type: 'success',
          duration: 5 * 1000
        });
      })
      .catch(err => {
        this.formData[node] = !this.formData[node];
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