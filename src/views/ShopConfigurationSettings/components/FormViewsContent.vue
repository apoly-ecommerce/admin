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
            <div class="title">BACK OFFICE</div>
            <div class="divider"></div>
          </div>
          <el-row :gutter="5">
            <el-col :span="6" class="p-1" style="text-align: right;">
              <label for="pagination" class="FormLabel">
                <span class="FormLabel__title">PAGINATION:</span>
              </label>
            </el-col>
            <el-col :span="18" class="p-1">
              <el-form-item prop="pagination">
                <el-input-number class="w-100"
                  v-model="formData.pagination"
                  size="medium"
                  :min="1"
                  ref="pagination"
                  id="pagination"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="5" class="p-1"/>
            <el-col :span="19" class="p-1">
              <el-button type="primary" size="mini" @click="handleUpdate">
                <i class="PopupForm__SaveIcon fas fa-save"></i>
                <span class="PopupForm_SaveLabel">UPDATE</span>
              </el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12" class="p-1">
          <div class="heading">
            <div class="title">STORE FRONT</div>
            <div class="divider"></div>
          </div>
          <el-row :gutter="5">
            <el-col :span="18" class="p-1">
              <el-form-item prop="show_shop_desc_with_listing" class="text-right">
                <label for="show_shop_desc_with_listing" class="FormLabel">
                  <span class="FormLabel__title">SHOW SHOP DESCRIPTION WITH LISTING:</span>
                  <el-tooltip class="item" effect="dark" content="Hiển thị mô tả cửa hàng trên trang mô tả sản phẩm trên giao diện người dùng." placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </label>
                <div class="switch-wrap d-flex align-items-center justify-content-end">
                  <span class="switch-stt">OFF</span>
                  <el-switch
                    v-model="formData.show_shop_desc_with_listing"
                    class="p-2"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="1"
                    inactive-value="0"
                    @change="handleNotificationToggle('show_shop_desc_with_listing')"
                  />
                  <span class="switch-stt">ON</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="5">
            <el-col :span="18" class="p-1">
              <el-form-item prop="show_refund_policy_with_listing" class="text-right">
                <label for="show_refund_policy_with_listing" class="FormLabel">
                  <span class="FormLabel__title">SHOW REFUND POLICY WITH LISTING:</span>
                  <el-tooltip class="item" effect="dark" content="Hiển thị chính sách trả lại và hoàn lại tiền trên trang mô tả sản phẩm trên giao diện người dùng." placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </label>
                <div class="switch-wrap d-flex align-items-center justify-content-end">
                  <span class="switch-stt">OFF</span>
                  <el-switch
                    v-model="formData.show_refund_policy_with_listing"
                    class="p-2"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="1"
                    inactive-value="0"
                    @change="handleNotificationToggle('show_refund_policy_with_listing')"
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
import { mapGetters } from 'vuex';

const defaultFormData = {
  pagination: 10,
  show_shop_desc_with_listing: '',
  show_refund_policy_with_listing: '',
};

export default {
  name: 'form-views-content',
  data() {
    return {
      formData: {...defaultFormData}
    };
  },
  created() {
    this.formSetup();
  },
  computed: {
    ...mapGetters({
      'settingConfig': 'config/getSettingConfig'
    })
  },
  methods: {
    async formSetup() {
      this.appendDataToForm(this.settingConfig);
    },
    handleUpdate() {
      const { pagination } = this.formData;
      this.$emit('update', { pagination });
    },
    handleNotificationToggle(node) {
      this.$emit('toggle', node);
    },
    appendDataToForm(data) {
      this.formData.pagination = data.pagination;
      this.formData.show_shop_desc_with_listing = data.show_shop_desc_with_listing ? '1' : '0'
      this.formData.show_refund_policy_with_listing = data.show_refund_policy_with_listing ? '1' : '0'
    }
  }
}
</script>