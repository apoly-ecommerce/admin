
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
        <template v-if="isUpdate('origin')">
          <el-row :gutter="5">
            <el-col :span="16" class="p-1">
              <el-form-item prop="name">
                <label for="name" class="FormLabel">
                  <span class="FormLabel__title">Fullname *</span>
                </label>
                <el-input
                  placeholder="Full name"
                  type="text"
                  ref="name"
                  autocomplete="off"
                  spellcheck="false"
                  id="name"
                  v-model="formData.name"
                />
                <div v-if="formError.name" class="el-form-item__error">{{ formError.name }}</div>
              </el-form-item>
            </el-col>

            <el-col :span="8" class="p-1">
              <el-form-item prop="active">
                <label for="slug" class="FormLabel">
                  <span class="FormLabel__title">Status *</span>
                </label>
                <el-select
                  v-model="formData.active"
                  placeholder="Select"
                  id="active"
                  class="w-100"
                >
                  <el-option value="1" label="Active"/>
                  <el-option value="0" label="Inactive"/>
                </el-select>
                <div v-if="formError.active" class="el-form-item__error">{{ formError.active }}</div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="5">
            <el-col :span="12" class="p-1">
              <el-form-item prop="nice_name">
                <label for="nice_name" class="FormLabel">
                  <span class="FormLabel__title">Nice name</span>
                </label>
                <el-input
                  placeholder="Nice name"
                  type="text"
                  name="nice_name"
                  ref="nice_name"
                  autocomplete="off"
                  spellcheck="false"
                  id="nice_name"
                  v-model="formData.nice_name"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12" class="p-1">
              <el-form-item prop="email">
                <label for="email" class="FormLabel">
                  <span class="FormLabel__title">Email *</span>
                </label>
                <el-input
                  placeholder="Email"
                  type="email"
                  name="email"
                  ref="email"
                  autocomplete="off"
                  spellcheck="false"
                  id="email"
                  v-model="formData.email"
                />
                <div v-if="formError.email" class="el-form-item__error">{{ formError.email }}</div>
              </el-form-item>
            </el-col>
          </el-row>
        </template>

        <template v-if="isUpdate('password')">
          <el-row :gutter="5">
            <el-col :span="12" class="p-1">
              <el-form-item prop="password">
                <label for="password" class="FormLabel">
                  <span class="FormLabel__title">Password *</span>
                </label>
                <el-input
                  placeholder="Password"
                  type="password"
                  name="password"
                  ref="password"
                  autocomplete="off"
                  spellcheck="false"
                  id="password"
                  v-model="formData.password"
                />
                <div v-if="formError.password" class="el-form-item__error">{{ formError.password }}</div>
              </el-form-item>
            </el-col>

            <el-col :span="12" class="p-1">
              <el-form-item prop="password_confirmation">
                <label for="password_confirmation" class="FormLabel">
                  <span class="FormLabel__title">Confirm Password *</span>
                </label>
                <el-input
                  placeholder="Confirm Password"
                  type="password"
                  name="password_confirmation"
                  ref="password_confirmation"
                  autocomplete="off"
                  spellcheck="false"
                  id="password_confirmation"
                  v-model="formData.password_confirmation"
                />
                <div v-if="formError.password_confirmation" class="el-form-item__error">{{ formError.password_confirmation }}</div>
              </el-form-item>
            </el-col>
          </el-row>
        </template>

        <template v-if="isUpdate('origin')">
          <el-row :gutter="5">
            <el-col :span="12" class="p-1">
              <el-form-item prop="dob">
                <label for="dob" class="FormLabel">
                  <span class="FormLabel__title">Date of birth *</span>
                </label>
                <el-date-picker
                  v-model="formData.dob"
                  type="date"
                  class="w-100"
                  format="dd-MM-yyyy"
                  placeholder="Date of birth"
                >
                </el-date-picker>
                <div v-if="formError.dob" class="el-form-item__error">{{ formError.dob }}</div>
              </el-form-item>
            </el-col>

            <el-col :span="12" class="p-1">
              <el-form-item prop="sex">
                <label for="gender" class="FormLabel">
                  <span class="FormLabel__title">Gender *</span>
                </label>
                <el-select class="w-100" v-model="formData.sex" placeholder="Gender">
                  <el-option label="Nam" value="male"/>
                  <el-option label="Nữ" value="female"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="5">
            <el-form-item prop="24" class="p-1">
              <label for="description" class="FormLabel">
                <span class="FormLabel__title">BIOGRAPHY</span>
              </label>
              <el-input
                type="textarea"
                ref="description"
                placeholder="Start from here"
                v-model="formData.description"
                maxlength="500"
                spellcheck="false"
                id="description"
                show-word-limit
              />
            </el-form-item>
          </el-row>
        </template>

        <template v-if="isUpdate('address')">
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
        </template>

        <template v-if="isUpdate('origin')">
          <el-row :gutter="5">
            <el-col :span="24" class="p-1">
              <el-form-item prop="avatarImage">
                <label for="avatarImage" class="FormLabel">
                  <span class="FormLabel__title">Avatar</span>
                  <el-tooltip class="item" effect="dark" content="is tooltip" placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </label>
                <div v-if="checkImageNotEmpty(formData.avatarImage.url)" class="ImageThumb_wrap">
                  <div class="thumbNail d-block">
                    <img :src="formData.avatarImage.url" alt="" />
                  </div>
                  <div class="confirm">
                    <el-tag type="danger">
                      <el-checkbox v-model="formData.avatarImage.isDel">
                        <small>Delete image</small>
                      </el-checkbox>
                    </el-tag>
                  </div>
                </div>
                <upload-image
                  :name="'UploadAvatarImage'"
                  :placeholer="'Avatar image'"
                  @upload="saveAvatarImage"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </el-form>
    </template>

    <template v-slot:form-footer>
      <el-button v-if="!merchantId" type="primary" size="mini" @click.prevent="handleActionForm(handleAdd)">
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
import UploadImage from '@/components/UploadImage';
import { userRules } from '@/validations';
import { mapActions } from 'vuex';
import { Message } from 'element-ui';
import moment from 'moment';

const defaultFormData = {
  name: '',
  active: '',
  nice_name: '',
  email: '',
  password: '',
  password_confirmation: '',
  dob: '',
  sex: '',
  description: '',
  address_line_1: '',
  address_line_2: '',
  city: '',
  zip_code: '',
  phone: '',
  country_id: '',
  state_id: '',
  avatarImage: {
    url: '',
    file: null,
    isDel: false
  }
};

const defaultFormError = {
  name: '',
  password: '',
  password_confirmation: '',
  phone: '',
  email: '',
  dob: '',
  active: ''
};

export default {
  components: {
    FormAction,
    UploadImage
  },
  data() {
    return {
      formName: '',
      formData: {...defaultFormData},
      formError: {...defaultFormError},
      formRules: userRules,
      merchantId: this.$route.params.id,
      addressId: null,
      isFormLoading: false,
      countries: [],
    }
  },
  watch: {
    $route(to, from) {
      this.merchantId = to.params.id;
      if (to.name !== 'list-user') {
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
      'fetchMerchantItemById': 'merchant/fetchMerchantItemById',
      'updateMerchant': 'merchant/updateMerchant',
      'updatePasswordMerchant': 'merchant/updatePasswordMerchant',
      'updateAddress': 'address/updateAddress'
    }),
    async formSetup() {
      try {
        this.resetFormData();
        this.getFormName();
        this.isFormLoading = true;
        if (this.merchantId) {
          const dataMerchant = await this.fetchMerchantItemById(this.merchantId);
          this.appendDataToForm(dataMerchant.merchant);
        }
        if (this.$route.query.update === 'address') {
          const [dataCountry] = await Promise.all([this.fetchListCountries()]);
          this.countries = dataCountry.countries;
        }
        this.isFormLoading = false;
      } catch (error) {
        console.error('[App Error] => ', error);
        if (error.status === 404) {
          this.$confirm('Thương nhân này không tồn tại, hoặc đã bị xóa trước đó !', 'Thông báo lỗi', {
            confirmButtonText: 'Quay về',
            cancelButtonText: 'Thêm mới',
            type: 'error'
          }).then(() => {
            this.back();
          }).catch(() => {
            this.back('/vendor/merchant/add');
          });
        } else {
          this.$message.error('Có lỗi trong quá trình tải dữ liệu !');
          this.back();
        }
      }
    },
    getFormName() {
      this.formName = this.$route.meta && this.$route.meta.title;
    },
    back(router = '/vendor/merchant', query = {}) {
      this.resetFormData();
      this.$refs['formData'].resetFields();
      this.$router.push({ path: router, query });
    },
    saveAvatarImage(file) {
      this.formData.avatarImage.file = file;
    },
    handleCloseForm() {
      this.back();
    },
    resetFormData() {
      this.formData = {...defaultFormData};
      this.formData.avatarImage.url   = '';
      this.formData.avatarImage.file  = null;
      this.formData.avatarImage.isDel = false;
    },
    handleActionForm(callback) {
      this.$refs['formData'].validate(valid => {
        if (valid) {
          if (this.formData.password !== this.formData.password_confirmation) {
            this.appendErrorToForm({password_confirmation: ['Nhập lại mật khẩu không chính xác']});
            return;
          }
          callback().then(res => {
            Message({
              message: res.success,
              type: 'success',
              duration: 5 * 1000
            });
            this.back('/vendor/merchant', { form: 'success' });
          }).catch(error => {
            console.error('[App Error] => ', error);
            if (error.status === 422) {
              Message({
                message: 'Dữ liệu không hợp lệ, vui lòng kiễm tra lại !',
                type: 'error',
                duration: 5 * 1000
              });
            }
            this.appendErrorToForm(error.data.errors);
          });
        }
      });
    },
    handleUpdate() {
      if (this.$route.query.update === 'origin') {
        return this.updateMerchant({ formData: this.setFormData(), id: this.merchantId });
      }
      if (this.$route.query.update === 'password') {
        const formData = {
          password: this.formData.password,
          password_confirmation: this.formData.password_confirmation
        };
        return this.updatePasswordMerchant({ formData, id: this.merchantId });
      }
      if (this.$route.query.update === 'address') {
        const { address_line_1, address_line_2, city, zip_code, phone, country_id, state_id } = this.formData;
        const formData = { address_line_1, address_line_2, city, zip_code, phone, country_id, state_id };
        return this.updateAddress({ formData, id: this.addressId });
      }
    },
    setFormData() {
      let formData = new FormData();
      formData.append('name', this.formData.name);
      formData.append('active', this.formData.active);
      formData.append('nice_name', this.formData.nice_name);
      formData.append('email', this.formData.email);
      if (!this.merchantId) {
        formData.append('password', this.formData.password);
        formData.append('password_confirmation', this.formData.password_confirmation);
      }
      formData.append('role_id', this.formData.role_id);
      if (this.formData.dob) {
        formData.append('dob', moment(this.formData.dob).format('YYYY-MM-DD'));
      }
      formData.append('sex', this.formData.sex);
      formData.append('description', this.formData.description);
      formData.append('address_line_1', this.formData.address_line_1);
      formData.append('address_line_2', this.formData.address_line_2);
      formData.append('city', this.formData.city);
      formData.append('zip_code', this.formData.zip_code);
      formData.append('phone', this.formData.phone);
      formData.append('country_id', this.formData.country_id);
      formData.append('state_id', this.formData.state_id);
      if (this.formData.avatarImage.file) {
        formData.append('image', this.formData.avatarImage.file);
      }
      if (this.formData.avatarImage.isDel) {
        formData.append('delete_avatar', '1');
      }
      return formData;
    },
    appendErrorToForm(errors) {
      if (errors) {
        for (const [key, value] of Object.entries(errors)) {
          this.formError[key] = value[0];
        }
      }
    },
    appendDataToForm(data) {
      this.formData.name = data.name;
      this.formData.active = data.active.toString();
      this.formData.nice_name = data.nice_name;
      this.formData.email = data.email;
      this.formData.role_id = data.role_id;
      this.formData.dob = data.dob;
      this.formData.sex = data.sex;
      this.formData.description = data.description ? data.description : '';
      this.formData.avatarImage.url = data.image;

      if (this.$route.query.update === 'address') {
        this.formData.address_line_1 = data.primaryAddress ? data.primaryAddress.address_line_1 : '';
        this.formData.address_line_2 = data.primaryAddress ? data.primaryAddress.address_line_2 : '';
        this.formData.city = data.primaryAddress ? data.primaryAddress.city : '';
        this.formData.zip_code = data.primaryAddress ? data.primaryAddress.zip_code : '';
        this.formData.phone = data.primaryAddress ? data.primaryAddress.phone : '';
        this.formData.country_id = data.primaryAddress ? data.primaryAddress.country_id : '';
        this.formData.state_id = data.primaryAddress ? data.primaryAddress.state_id : '';
        this.addressId = data.primaryAddress ? data.primaryAddress.id : '';
      }
    },
    checkImageNotEmpty(img) {
      if (img && !(img.split('?text=')[1] === 'No_Image_Found')) {
        return true;
      } return false;
    },
    isUpdate(type) {
      if (this.$route.name === 'add-user') return true;
      return this.$route.query.update === type;
    }
  }
}
</script>