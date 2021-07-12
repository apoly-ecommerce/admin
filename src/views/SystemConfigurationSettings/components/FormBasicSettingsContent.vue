<template>
  <div class="content">
    <el-form
      ref="formData"
      :model="formData"
      :loading="true"
      @submit.prevent
    >
      <el-row :gutter="5">
        <el-col :span="12" class="p-1">
          <div class="heading">
            <div class="title">ADDRESS</div>
            <div class="divider"></div>
          </div>

          <el-row :gutter="5">
            <el-col :span="12" class="p-1">
              <el-form-item prop="address_default_country">
                <label for="address_default_country" class="FormLabel">
                  <span class="FormLabel__title">COUNTRY</span>
                </label>
                  <el-select
                  v-model="formData.address_default_country"
                  filterable
                  ref="address_default_country"
                  placeholder="Select"
                  class="w-100"
                >
                  <el-option
                    v-for="country in countries"
                    :key="country.id"
                    :label="country.name"
                    :value="country.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12" class="p-1">
              <el-form-item prop="address_default_state">
                <label for="address_default_state" class="FormLabel">
                  <span class="FormLabel__title">STATTE/PROVINCE</span>
                </label>
                  <el-select
                  v-model="formData.address_default_state"
                  filterable
                  ref="address_default_state"
                  placeholder="State/Province"
                  class="w-100"
                  id="address_default_state"
                  autocomplete="off"
                  spellcheck="false"
                >
                  <el-option
                    v-for="state in states"
                    :key="state.id"
                    :label="state.name"
                    :value="state.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="5">
            <el-col :span="12" class="p-1">
              <el-form-item prop="show_address_title" class="text-end">
                <label for="show_address_title" class="FormLabel">
                  <span class="FormLabel__title">SHOW ADDRESS TITLE:</span>
                  <el-tooltip class="item" effect="dark" content="Gửi cho tôi thông báo khi bất kỳ mặt hàng nào trong kho của tôi đạt đến mức số lượng cảnh báo" placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </label>
                <div class="switch-wrap d-flex align-items-center justify-content-end">
                  <span class="switch-stt">OFF</span>
                  <el-switch
                    v-model="formData.show_address_title"
                    class="p-2"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    :active-value="true"
                    :inactive-value="false"
                    @change="toggle('show_address_title')"
                  />
                  <span class="switch-stt">ON</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="5">
            <el-col :span="12" class="p-1">
              <el-form-item prop="address_show_country" class="text-end">
                <label for="address_show_country" class="FormLabel">
                  <span class="FormLabel__title">SHOW COUNTRY NAME IN ADDRESS:</span>
                  <el-tooltip class="item" effect="dark" content="Gửi cho tôi thông báo khi bất kỳ mặt hàng nào trong kho của tôi đạt đến mức số lượng cảnh báo" placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </label>
                <div class="switch-wrap d-flex align-items-center justify-content-end">
                  <span class="switch-stt">OFF</span>
                  <el-switch
                    v-model="formData.address_show_country"
                    class="p-2"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    :active-value="true"
                    :inactive-value="false"
                    @change="toggle('address_show_country')"
                  />
                  <span class="switch-stt">ON</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="5">
            <el-col :span="12" class="p-1">
              <el-form-item prop="address_show_map" class="text-end">
                <label for="address_show_map" class="FormLabel">
                  <span class="FormLabel__title">SHOW MAP:</span>
                  <el-tooltip class="item" effect="dark" content="Gửi cho tôi thông báo khi bất kỳ mặt hàng nào trong kho của tôi đạt đến mức số lượng cảnh báo" placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </label>
                <div class="switch-wrap d-flex align-items-center justify-content-end">
                  <span class="switch-stt">OFF</span>
                  <el-switch
                    v-model="formData.address_show_map"
                    class="p-2"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    :active-value="true"
                    :inactive-value="false"
                    @change="toggle('address_show_map')"
                  />
                  <span class="switch-stt">ON</span>
                </div>
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

        <el-col :span="12" class="p-1">
          <div class="heading">
            <div class="title">OTHERS</div>
            <div class="divider"></div>
          </div>

          <el-row :span="5">
            <el-col :span="12" class="p-1">
              <el-form-item prop="enable_chat" class="text-end">
                <label for="enable_chat" class="FormLabel">
                  <span class="FormLabel__title">ENABLE LIVE CHAT:</span>
                  <el-tooltip class="item" effect="dark" content="Gửi cho tôi thông báo khi bất kỳ mặt hàng nào trong kho của tôi đạt đến mức số lượng cảnh báo" placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </label>
                <div class="switch-wrap d-flex align-items-center justify-content-end">
                  <span class="switch-stt">OFF</span>
                  <el-switch
                    v-model="formData.enable_chat"
                    class="p-2"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    :active-value="true"
                    :inactive-value="false"
                    @change="toggle('enable_chat')"
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
  address_default_country: '',
  address_default_state: '',
  show_address_title: '',
  address_show_country: ''
};

export default {
  name: 'form-basic-settings-content',
  data() {
    return {
      formData: Object.assign({}, defaultFormData),
      countries: [],
    };
  },
  created() {
    this.formSetup();
  },
  watch: {
    systemConfig(data) {
      this.formData = Object.assign({}, data);
    }
  },
  computed: {
    ...mapGetters({
      'systemConfig': 'systemConfig/getSystemConfig'
    }),
    states() {
      if (this.formData.address_default_country) {
        let countrySelected = this.countries.filter(item => item.id === this.formData.address_default_country)[0];
        if (countrySelected) return countrySelected.states;
      } return [];
    },
  },
  methods: {
    ...mapActions({
      'fetchCountries': 'country/fetchCountries',
      'toggleSystemConfig': 'systemConfig/toggleSystemConfig'
    }),
    async formSetup() {
      const dataCountry = await this.fetchCountries();
      this.countries = dataCountry.countries;
    },
    update() {
      this.$emit('update', {
        address_default_country: this.formData.address_default_country,
        address_default_state: this.formData.address_default_state,
      });
    },
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