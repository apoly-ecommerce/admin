<template>
  <div class="content">
    <el-form
      ref="formData"
      :model="formData"
      :rules="formRules"
      @submit.prevent
    >
      <el-row :gutter="5">
        <el-col :span="14" class="p-1">
          <el-row :gutter="5">
            <el-col :span="6" class="p-1" style="text-align: right;">
              <label for="enable_live_chat" class="FormLabel">
                <span class="FormLabel__title">ENABLE LIVE CHAT:</span>
                <el-tooltip class="item" effect="dark" content="Bật trò chuyện trực tiếp trên trang sản phẩm và trang cửa hàng của bạn." placement="top">
                  <i class="fas fa-question-circle"></i>
                </el-tooltip>
              </label>
            </el-col>
            <el-col :span="18" class="p-1">
              <el-form-item prop="enable_live_chat">
                <div class="switch-wrap d-flex align-items-center justify-content-start" style="padding: 0 20px;">
                  <span class="switch-stt">OFF</span>
                  <el-switch
                    v-model="sFormData.enable_live_chat"
                    class="p-2"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="1"
                    inactive-value="0"
                    @change="handleNotificationToggle('enable_live_chat')"
                  />
                  <span class="switch-stt">ON</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :span="5">
            <el-col :span="6" class="p-1" style="text-align: right;">
              <label for="support_phone" class="FormLabel">
                <span class="FormLabel__title">SUPPORT PHONE:</span>
              </label>
            </el-col>
            <el-col :span="18" class="p-1">
              <el-form-item prop="support_phone">
                <el-input
                  class="hide-number-control"
                  placeholder="Support phone"
                  type="number"
                  ref="support_phone"
                  autocomplete="off"
                  spellcheck="false"
                  id="support_phone"
                  v-model="formData.support_phone"
                >
                  <i slot="prepend" class="fas fa-phone-alt"></i>
                  <el-tooltip slot="append" class="item" effect="dark" content="Khách hàng sẽ liên hệ với số này để được hỗ trợ và giải đáp thắc mắc" placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :span="5">
            <el-col :span="6" class="p-1" style="text-align: right;">
              <label for="support_phone_toll_free" class="FormLabel">
                <span class="FormLabel__title">TOLL FREE NUMBER:</span>
              </label>
            </el-col>
            <el-col :span="18" class="p-1">
              <el-form-item prop="support_phone_toll_free">
                <el-input
                  class="hide-number-control"
                  placeholder="Toll free number"
                  type="number"
                  ref="support_phone_toll_free"
                  autocomplete="off"
                  spellcheck="false"
                  id="support_phone_toll_free"
                  v-model="formData.support_phone_toll_free"
                >
                  <i slot="prepend" class="fas fa-phone-square-alt"></i>
                  <el-tooltip slot="append" class="item" effect="dark" content="Nếu bạn có số điện thoại miễn phí để được hỗ trợ khách hàng" placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :span="5">
            <el-col :span="6" class="p-1" style="text-align: right;">
              <label for="support_email" class="FormLabel">
                <span class="FormLabel__title">*SUPPORT EMAIL:</span>
              </label>
            </el-col>
            <el-col :span="18" class="p-1">
              <el-form-item prop="support_email">
                <el-input
                  placeholder="Support email"
                  type="text"
                  ref="support_email"
                  autocomplete="off"
                  spellcheck="false"
                  id="support_email"
                  v-model="formData.support_email"
                >
                  <i slot="prepend" class="far fa-envelope"></i>
                  <el-tooltip slot="append" class="item" effect="dark" content="Bạn sẽ nhận được tất cả email hỗ trợ tới địa chỉ này" placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :span="5">
            <el-col :span="6" class="p-1" style="text-align: right;">
              <label for="default_sender_email_address" class="FormLabel">
                <span class="FormLabel__title">*DEFAULT SENDER EMAIL ADDRESS:</span>
              </label>
            </el-col>
            <el-col :span="18" class="p-1">
              <el-form-item prop="default_sender_email_address">
                <el-input
                  placeholder="Sender email address"
                  type="text"
                  ref="default_sender_email_address"
                  autocomplete="off"
                  spellcheck="false"
                  id="default_sender_email_address"
                  v-model="formData.default_sender_email_address"
                >
                  <i slot="prepend" class="fas fa-at"></i>
                  <el-tooltip slot="append" class="item" effect="dark" content="Tất cả các email tự động gửi cho khách hàng sẽ được gửi từ địa chỉ email này. Và cũng có thể khi địa chỉ email của người gửi không thể đặt trong khi gửi email" placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :span="5">
            <el-col :span="6" class="p-1" style="text-align: right;">
              <label for="default_email_sender_name" class="FormLabel">
                <span class="FormLabel__title">*DEFAULT SENDER FULL NAME:</span>
              </label>
            </el-col>
            <el-col :span="18" class="p-1">
              <el-form-item prop="default_email_sender_name">
                <el-input
                  placeholder="Full name"
                  type="text"
                  ref="default_email_sender_name"
                  autocomplete="off"
                  spellcheck="false"
                  id="default_email_sender_name"
                  v-model="formData.default_email_sender_name"
                >
                  <i slot="prepend" class="fas fa-user"></i>
                  <el-tooltip slot="append" class="item" effect="dark" content="Tên này sẽ được sử dụng làm người gửi email gửi từ địa chỉ email người gửi mặc định" placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :span="5">
            <el-col :span="6" class="p-1" style="text-align: right;">
              <label for="return_refund" class="FormLabel">
                <span class="FormLabel__title">*RETURN & REFUND POLICY:</span>
                <el-tooltip class="item" effect="dark" content="Chính sách trả lại và hoàn tiền cho bạn cửa hàng. Vui lòng đọc chính sách của thị trường trước khi bạn chỉ định của bạn." placement="top">
                  <i class="fas fa-question-circle"></i>
                </el-tooltip>
              </label>
            </el-col>
            <el-col :span="18" class="p-1">
              <el-form-item prop="return_refund">
                <el-input
                  type="textarea"
                  ref="return_refund"
                  placeholder="Start from here"
                  v-model="formData.return_refund"
                  spellcheck="false"
                  id="return_refund"
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
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { shopSettingConfigSupportRule } from '@/validations';

const defaultFormData = {
  support_phone: '',
  support_phone_toll_free: '',
  support_email: '',
  default_sender_email_address: '',
  default_email_sender_name: '',
  return_refund: '',
};

const secondDefaultFormData = {
  enable_live_chat: '',
}

export default {
  name: 'form-support-content',
  data() {
    return {
      formData: {...defaultFormData},
      sFormData: {...secondDefaultFormData},
      formRules: shopSettingConfigSupportRule,
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
      this.$emit('update', this.formData);
    },
    handleNotificationToggle(node) {
      this.$emit('toggle', node);
    },
    appendDataToForm(data) {
      this.sFormData.enable_live_chat = data.enable_live_chat ? '1' : '0';
      this.formData.support_phone = data.support_phone;
      this.formData.support_phone_toll_free = data.support_phone_toll_free;
      this.formData.support_email = data.support_email;
      this.formData.default_sender_email_address = data.default_sender_email_address;
      this.formData.default_email_sender_name = data.default_email_sender_name;
      this.formData.return_refund = data.return_refund;
    }
  }
}
</script>