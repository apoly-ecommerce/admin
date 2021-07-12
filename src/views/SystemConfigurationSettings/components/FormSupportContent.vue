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
          <el-row :span="5">
            <el-col :span="24" class="p-1">
              <el-form-item prop="support_phone">
                <label for="support_phone" class="FormLabel">
                  <span class="FormLabel__title">SUPPORT PHONE:</span>
                </label>
                <el-input
                  placeholder="Support phone"
                  type="number"
                  name="support_phone"
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
            <el-col :span="24" class="p-1">
              <el-form-item prop="support_phone_toll_free">
                <label for="support_phone_toll_free" class="FormLabel">
                  <span class="FormLabel__title">TOLL FREE NUMBER:</span>
                </label>
                <el-input
                  placeholder="Toll free number"
                  type="number"
                  name="support_phone_toll_free"
                  ref="support_phone_toll_free"
                  autocomplete="off"
                  spellcheck="false"
                  id="support_phone_toll_free"
                  v-model="formData.support_phone_toll_free"
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
            <el-col :span="24" class="p-1">
              <el-form-item prop="support_email">
                <label for="support_email" class="FormLabel">
                  <span class="FormLabel__title">*SUPPORT EMAIL:</span>
                </label>
                <el-input
                  placeholder="Support email"
                  type="text"
                  name="support_email"
                  ref="support_email"
                  autocomplete="off"
                  spellcheck="false"
                  id="support_email"
                  v-model="formData.support_email"
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
            <el-col :span="24" class="p-1">
              <el-form-item prop="default_sender_email_address">
                <label for="default_sender_email_address" class="FormLabel">
                  <span class="FormLabel__title">*DEFAULT SENDER EMAIL ADDRESS:</span>
                </label>
                <el-input
                  placeholder="Sender email address"
                  type="text"
                  name="default_sender_email_address"
                  ref="default_sender_email_address"
                  autocomplete="off"
                  spellcheck="false"
                  id="default_sender_email_address"
                  v-model="formData.default_sender_email_address"
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
            <el-col :span="24" class="p-1">
              <el-form-item prop="default_email_sender_name">
                <label for="default_email_sender_name" class="FormLabel">
                  <span class="FormLabel__title">*DEFAULT SENDER FULL NAME:</span>
                </label>
                <el-input
                  placeholder="Sender email address"
                  type="text"
                  name="default_email_sender_name"
                  ref="default_email_sender_name"
                  autocomplete="off"
                  spellcheck="false"
                  id="default_email_sender_name"
                  v-model="formData.default_email_sender_name"
                >
                  <i slot="prepend" class="fas fa-phone-alt"></i>
                  <el-tooltip slot="append" class="item" effect="dark" content="Khách hàng sẽ liên hệ với số này để được hỗ trợ và giải đáp thắc mắc" placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <div class="heading">
            <div class="title">SOCIAL LINKS</div>
            <div class="divider"></div>
          </div>

          <el-row :span="5">
            <el-col :span="24" class="p-1">
              <el-form-item prop="facebook_link">
                <label for="facebook_link" class="FormLabel">
                  <span class="FormLabel__title">FACEBOOK:</span>
                </label>
                <el-input
                  placeholder="Facebook link"
                  type="text"
                  name="facebook_link"
                  ref="facebook_link"
                  autocomplete="off"
                  spellcheck="false"
                  id="facebook_link"
                  v-model="formData.facebook_link"
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
            <el-col :span="24" class="p-1">
              <el-form-item prop="youtube_link">
                <label for="youtube_link" class="FormLabel">
                  <span class="FormLabel__title">YOUTUBE:</span>
                </label>
                <el-input
                  placeholder="Youtobe link"
                  type="text"
                  name="youtube_link"
                  ref="youtube_link"
                  autocomplete="off"
                  spellcheck="false"
                  id="youtube_link"
                  v-model="formData.youtube_link"
                >
                  <i slot="prepend" class="fas fa-phone-alt"></i>
                  <el-tooltip slot="append" class="item" effect="dark" content="Khách hàng sẽ liên hệ với số này để được hỗ trợ và giải đáp thắc mắc" placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="5">
            <el-col :span="24" class="p-1">
              <el-button class="button-submit" type="primary" size="mini" @click="update">
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
import { systemSettingConfigSupportRule } from '@/validations';
import { mapGetters } from 'vuex';

const defaultFormData = {
  support_phone: '',
  support_phone_toll_free: '',
  support_email: '',
  default_sender_email_address: '',
  default_email_sender_name: '',

  facebook_link: '',
  youtube_link: ''
}

export default {
  name: 'form-support-content',
  data() {
    return {
      formData: Object.assign({}, defaultFormData),
      formRules: systemSettingConfigSupportRule,
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
    update() {
      this.$refs['formData'].validate(valid => {
        if (valid) {
          console.log(this.formData);
          this.$emit('update', this.formData);
        }
      })
    },
  }
}
</script>