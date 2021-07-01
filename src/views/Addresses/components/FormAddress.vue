<template>
  <form-action
    :name="formName"
    :size="'750px'"
    :isFormLoading="isFormLoading"
    @close="handleCloseForm"
  >
    <template v-slot:form-body>
      <el-form
        ref="formData"
        :model="formData"
        :rules="formRules"
        @submit.prevent
      >
        <template v-if="addressable_type === 'customer'">
          <el-row :gutter="5">
            <el-col :span="24" class="p-1">
              <el-form-item prop="address_title">
                <label for="address_title" class="FormLabel">
                  <span class="FormLabel__title">Address title</span>
                </label>
                <el-input
                  placeholder="Address title"
                  type="text"
                  name="address_title"
                  ref="address_title"
                  autocomplete="off"
                  spellcheck="false"
                  id="address_title"
                  v-model="formData.address_title"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="5">
            <el-col :span="24" class="p-1">
              <el-form-item prop="address_type">
                <label for="address_type" class="FormLabel">
                  <span class="FormLabel__title">Address type</span>
                </label>
                <el-radio-group v-model="formData.address_type" size="small">
                  <el-radio label="Primary" border>PRIMARY</el-radio>
                  <el-radio label="Billing" border>BILLING</el-radio>
                  <el-radio label="Shipping" border>SHIPPING</el-radio>
                </el-radio-group>
                <div v-if="formError.address_type" class="el-form-item__error">{{ formError.address_type }}</div>
              </el-form-item>
            </el-col>
          </el-row>
        </template>

        <el-row :gutter="5">
          <el-col :span="12" class="p-1">
            <el-form-item prop="address_line_1">
              <label for="address_line_1" class="FormLabel">
                <span class="FormLabel__title">Address line 1</span>
              </label>
              <el-input
                placeholder="Address line 1"
                type="text"
                name="address_line_1"
                ref="address_line_1"
                autocomplete="off"
                spellcheck="false"
                id="address_line_1"
                v-model="formData.address_line_1"
              />
              <div v-if="formError.address_line_1" class="el-form-item__error">{{ formError.address_line_1 }}</div>
            </el-form-item>
          </el-col>

          <el-col :span="12" class="p-1">
            <el-form-item prop="address_line_2">
              <label for="address_line_2" class="FormLabel">
                <span class="FormLabel__title">Address line 2</span>
              </label>
              <el-input
                placeholder="Address line 1"
                type="text"
                name="address_line_2"
                ref="address_line_2"
                autocomplete="off"
                spellcheck="false"
                id="address_line_2"
                v-model="formData.address_line_2"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="8" class="p-1">
            <el-form-item prop="city">
              <label for="city" class="FormLabel">
                <span class="FormLabel__title">City</span>
              </label>
              <el-input
                placeholder="City"
                type="text"
                name="city"
                ref="city"
                autocomplete="off"
                spellcheck="false"
                id="city"
                v-model="formData.city"
              />
              <div v-if="formError.city" class="el-form-item__error">{{ formError.city }}</div>
            </el-form-item>
          </el-col>

          <el-col :span="8" class="p-1">
            <el-form-item prop="zip_code">
              <label for="zip_code" class="FormLabel">
                <span class="FormLabel__title">Zip/Postal code</span>
              </label>
              <el-input
                placeholder="Zip/Postal code"
                type="text"
                name="zip_code"
                ref="zip_code"
                autocomplete="off"
                spellcheck="false"
                id="zip_code"
                v-model="formData.zip_code"
              />
              <div v-if="formError.zip_code" class="el-form-item__error">{{ formError.zip_code }}</div>
            </el-form-item>
          </el-col>

          <el-col :span="8" class="p-1">
            <el-form-item prop="phone">
              <label for="phone" class="FormLabel">
                <span class="FormLabel__title">Phone</span>
              </label>
              <el-input
                placeholder="Phone"
                type="text"
                name="phone"
                ref="phone"
                autocomplete="off"
                spellcheck="false"
                id="phone"
                v-model="formData.phone"
              />
              <div v-if="formError.phone" class="el-form-item__error">{{ formError.phone }}</div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="12" class="p-1">
            <el-form-item prop="country_id">
              <label for="country_id" class="FormLabel">
                <span class="FormLabel__title">Country</span>
              </label>
                <el-select
                v-model="formData.country_id"
                filterable
                ref="country_id"
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
              <div v-if="formError.country_id" class="el-form-item__error">{{ formError.country_id }}</div>
            </el-form-item>
          </el-col>

          <el-col :span="12" class="p-1">
            <el-form-item prop="state_id">
              <label for="state_id" class="FormLabel">
                <span class="FormLabel__title">State/Province/Region</span>
              </label>
                <el-select
                v-model="formData.state_id"
                filterable
                ref="state_id"
                placeholder="State/Province/Region"
                class="w-100"
                id="state_id"
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
      </el-form>
    </template>

    <template v-slot:form-footer>
      <el-button v-if="$route.name === 'add-address'" type="primary" size="mini" @click.prevent="handleActionForm(handleAdd)">
        <i class="PopupForm__SaveIcon fas fa-save"></i>
        <span class="PopupForm_SaveLabel">Save</span>
      </el-button>
      <el-button v-else type="primary" size="mini" @click.prevent="handleActionForm(handleUpdate)">
        <i class="PopupForm__SaveIcon fas fa-save"></i>
        <span class="PopupForm_SaveLabel">Update</span>
      </el-button>
    </template>
  </form-action>
</template>

<script>
import FormAction from '@/components/FormAction';
import { addressRules } from '@/validations';
import { mapActions } from 'vuex';
import { Message } from 'element-ui';
import { strUcFirst } from '@/helpers';

const defaultFormData = {
  address_title: '',
  address_type: 'Primary',
  address_line_1: '',
  address_line_2: '',
  city: '',
  zip_code: '',
  phone: '',
  country_id: '',
  state_id: '',
};

const defaultFormError = {
  address_type: '',
  address_line_1: '',
  city: '',
  zip_code: '',
  country_id: ''
};

export default {
  components: {
    FormAction
  },
  data() {
    return {
      formName: '',
      formData: {...defaultFormData},
      formError: {...defaultFormError},
      formRules: addressRules,
      addressId: this.$route.params.id,
      isFormLoading: false,
      countries: [],
      addressable_type: this.$route.params.addressable_type,
      addressable_id: this.$route.params.addressable_id
    }
  },
  watch: {
    $route(to, from) {
      this.addressId = to.params.id;
      this.addressable_type = to.params.addressable_type;
      this.addressable_id   = to.params.addressable_id;
      if (to.name !== 'list-address') {
        this.formSetup();
      }
    }
  },
  created() {
    this.formSetup();
  },
  computed: {
    states() {
      if (this.formData.country_id) {
        let countrySelected = this.countries.filter(item => item.id === this.formData.country_id)[0];
        if (countrySelected) return countrySelected.states;
      } return [];
    },
  },
  methods: {
    ...mapActions({
      'fetchListCountries': 'country/fetchListCountries',
      'storeAddress': 'address/storeAddress',
      'fetchAddressItemById': 'address/fetchAddressItemById',
      'updateAddress': 'address/updateAddress'
    }),
    async formSetup() {
      try {
        this.resetFormData();
        this.getFormName();
        this.isFormLoading = true;
        if (this.addressId) {
          let dataAddress = await this.fetchAddressItemById(this.addressId);
          this.appendDataToForm(dataAddress.address);
        }
        const [dataCountry] = await Promise.all([this.fetchListCountries()]);
        this.countries = dataCountry.countries;
        this.isFormLoading = false;
      } catch (error) {
        console.error('[App Error] => ', error);
        if (error.status === 404) {
          this.$confirm('Địa chỉ này không tồn tại, hoặc đã bị xóa trước đó !', 'Thông báo lỗi', {
            confirmButtonText: 'Quay về',
            cancelButtonText: 'Thêm mới',
            type: 'error'
          }).then(() => {
            this.back(`/admin/${this.addressable_type}`);
          }).catch(() => {
            this.back(`/admin/${this.addressable_type}/add`);
          });
        } else {
          this.$message.error('Có lỗi trong quá trình tải dữ liệu !');
          this.back(`/admin/${this.addressable_type}`);
        }
      }
    },
    getFormName() {
      this.formName = this.$route.meta && this.$route.meta.title;
    },
    back(router = `/address/addresses/${this.addressable_type}/${this.addressable_id}`, query = {}) {
      this.resetFormData();
      this.$router.push({ path: router, query });
    },

    handleCloseForm() {
      if (this.$route.query.back_to) {
        this.back(this.$route.query.back_to);
      }
      else {
        this.back();
      }
    },
    resetFormData() {
      this.formData = {...defaultFormData};
    },
    handleActionForm(callback) {
      this.$refs['formData'].validate(valid => {
        if (valid) {
          callback().then(res => {
            Message({
              message: res.success,
              type: 'success',
              duration: 5 * 1000
            });
            if (this.$route.query.back_to) {
              this.back(this.$route.query.back_to, { form: 'success' });
            }
            else {
              this.back(`/address/addresses/${this.addressable_type}/${this.addressable_id}`, { form: 'success' });
            }
          }).catch(error => {
            if (error.data) {
              console.error('[App Error] => ', error);
              if (error.status === 422) {
                Message({
                  message: 'Dữ liệu không hợp lệ, vui lòng kiễm tra lại !',
                  type: 'error',
                  duration: 5 * 1000
                });
              }
              this.appendErrorToForm(error.data.errors);
            }
          });
        }
      });
    },
    handleAdd() {
      let namespace = 'App\\Models\\';
      if (this.addressable_type === 'user') { namespace = 'App\\' };
      return this.storeAddress({
        ...this.formData,
          addressable_type: `${namespace + strUcFirst(this.addressable_type)}`,
          addressable_id: this.addressable_id
      });
    },
    handleUpdate() {
      return this.updateAddress({ formData: this.formData, id: this.addressId });
    },
    appendDataToForm(data) {
      this.formData.address_title = data.address_title || '';
      this.formData.address_type = data.address_type || '';
      this.formData.address_line_1 = data.address_line_1 || '';
      this.formData.address_line_2 = data.address_line_2 || '';
      this.formData.city = data.city || '';
      this.formData.zip_code = data.zip_code || '';
      this.formData.phone = data.phone || '';
      this.formData.country_id = data.country ? data.country.id : '';
      this.formData.state_id = data.state ? data.state.id : '';
    },
    appendErrorToForm(errors) {
      if (errors) {
        for (const [key, value] of Object.entries(errors)) {
          this.formError[key] = value[0];
        }
      }
    },
  }
}
</script>