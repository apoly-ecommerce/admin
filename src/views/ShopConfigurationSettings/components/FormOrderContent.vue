<template>
  <div class="content">
    <el-form
      ref="formData"
      :model="formData"
      @submit.prevent
    >
      <el-row :gutter="5">
        <el-col :span="12" class="p-1">
          <el-row :gutter="5">
              <el-col :span="6" class="p-1" style="text-align: right;">
              <label for="order_number_prefix" class="FormLabel">
                <span class="FormLabel__title">ORDER NUMBER PREFIX:</span>
              </label>
            </el-col>
            <el-col :span="18" class="p-1">
              <el-form-item prop="order_number_prefix">
                <el-input
                  placeholder="Order number prefix"
                  type="text"
                  ref="order_number_prefix"
                  autocomplete="off"
                  spellcheck="false"
                  id="order_number_prefix"
                  v-model="formData.order_number_prefix"
                >
                  <el-tooltip slot="append" class="item" effect="dark" content="Tiền tố sẽ được thêm tự động vào đầu mã đơn hàng" placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="12" class="p-1">
          <el-row :gutter="5">
              <el-col :span="6" class="p-1" style="text-align: right;">
              <label for="order_number_suffix" class="FormLabel">
                <span class="FormLabel__title">AND SUFFIX:</span>
              </label>
            </el-col>
            <el-col :span="18" class="p-1">
              <el-form-item prop="order_number_suffix">
                <el-input
                  placeholder="Order number suffix"
                  type="text"
                  ref="order_number_suffix"
                  autocomplete="off"
                  spellcheck="false"
                  id="order_number_suffix"
                  v-model="formData.order_number_suffix"
                >
                  <el-tooltip slot="append" class="item" effect="dark" content="Hậu tối sẽ được thêm tự động vào cuối mã đơn hàng" placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="12" class="p-1">
          <el-row :gutter="5">
              <el-col :span="6" class="p-1" style="text-align: right;">
              <label for="default_payment_method_id" class="FormLabel">
                <span class="FormLabel__title">DEFAULT PAYMENT METHOD:</span>
              </label>
            </el-col>
            <el-col :span="18" class="p-1">
              <el-form-item prop="default_payment_method_id">
                <el-select
                  v-model="formData.default_payment_method_id"
                  filterable
                  placeholder="Select"
                  class="w-100"
                >
                  <el-option
                    v-for="paymethod in formSelect.paymethod_list"
                    :key="paymethod.id"
                    :label="paymethod.name"
                    :value="paymethod.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
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
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

const defaultFormData = {
  order_number_prefix: '',
  order_number_suffix: '',
  default_payment_method_id: '',
};

const defaultFormSelect = {
  paymethod_list: [],
};

export default {
  name: 'form-order-content',
  data() {
    return {
      formData: {...defaultFormData},
      formSelect: {...defaultFormSelect},
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
    appendDataToForm(data) {
      this.formData.order_number_prefix = data.order_number_prefix;
      this.formData.order_number_suffix = data.order_number_suffix;
      this.formData.default_payment_method_id = data.default_payment_method_id;
    }
  }
}
</script>