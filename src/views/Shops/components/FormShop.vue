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
                  <span class="FormLabel__title">Name *</span>
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
            <el-col :span="24" class="p-1">
              <el-form-item prop="legal_name">
                <label for="legal_name" class="FormLabel">
                  <span class="FormLabel__title">Legal name</span>
                </label>
                <el-input
                  placeholder="The legal name of the shop"
                  type="text"
                  name="legal_name"
                  ref="legal_name"
                  autocomplete="off"
                  spellcheck="false"
                  id="legal_name"
                  v-model="formData.legal_name"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="5">
            <el-col :span="12" class="p-1">
              <el-form-item prop="email">
                <label for="email" class="FormLabel">
                  <span class="FormLabel__title">Email Address</span>
                  <el-tooltip class="item" effect="dark" content="Tất cả các thông báo sẽ được gửi đến địa chỉ email này (hàng tồn kho, đơn đặt hàng, v.v.) chấp nhận email hỗ trợ khách hàng (nếu được đặt)" placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </label>
                <el-input
                  placeholder="Enter a valid email address"
                  type="text"
                  name="email"
                  ref="email"
                  autocomplete="off"
                  spellcheck="false"
                  id="email"
                  v-model="formData.email"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12" class="p-1">
              <el-form-item prop="external_url">
                <label for="external_url" class="FormLabel">
                  <span class="FormLabel__title">EXTERNAL URL</span>
                  <el-tooltip class="item" effect="dark" content="Nếu bạn sở hữu một trang web, bạn có thể đặt liên kết bên ngoài tại đây, url có thể được đặt làm trang đích của cửa hàng." placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </label>
                <el-input
                  placeholder="External url"
                  type="text"
                  name="external_url"
                  ref="external_url"
                  autocomplete="off"
                  spellcheck="false"
                  id="external_url"
                  v-model="formData.external_url"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="5">
            <el-col :span="24" class="p-1">
              <el-form-item prop="description">
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
            </el-col>
          </el-row>

          <el-row :gutter="5">
            <el-col :span="12" class="p-1">
              <el-form-item prop="logoImage">
                <label for="Logo image" class="FormLabel">
                  <span class="FormLabel__title">Brand logo</span>
                </label>
                <div v-if="checkImageNotEmpty(formData.logoImage.url)" class="ImageThumb_wrap">
                  <div class="thumbNail d-block">
                    <img :src="formData.logoImage.url" alt="" />
                  </div>
                  <div class="confirm">
                    <el-tag type="danger">
                      <el-checkbox v-model="formData.logoImage.isDel">
                        <small>Delete image</small>
                      </el-checkbox>
                    </el-tag>
                  </div>
                </div>
                <upload-image
                  :name="'UploadlogoImage'"
                  :placeholer="'Logo image'"
                  :caption="formData.logoImage.caption"
                  @upload="saveLogoImage"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12" class="p-1">
              <el-form-item prop="imageCover">
                <label for="Image cover" class="FormLabel">
                  <span class="FormLabel__title">Cover image</span>
                  <el-tooltip class="item" effect="dark" content="is tooltip" placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </label>
                <div v-if="checkImageNotEmpty(formData.coverImage.url)" class="ImageThumb_wrap">
                  <div class="thumbNail d-block">
                    <img :src="formData.coverImage.url" alt="" />
                  </div>
                  <div class="confirm">
                    <el-tag type="danger">
                      <el-checkbox v-model="formData.coverImage.isDel">
                        <small>Delete image</small>
                      </el-checkbox>
                    </el-tag>
                  </div>
                </div>
                <upload-image
                  :name="'UploadCoverImage'"
                  :placeholer="'Cover image'"
                  :caption="formData.coverImage.caption"
                  @upload="saveCoverImage"
                />
              </el-form-item>
            </el-col>
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
      </el-form>
    </template>

    <template v-slot:form-footer>
      <el-button v-if="!shopId" type="primary" size="mini" @click.prevent="handleActionForm(handleAdd)">
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
import { shopRules } from '@/validations';
import { mapActions } from 'vuex';
import { Message } from 'element-ui';

const defaultFormData = {
  name: '',
  active: '',
  legal_name: '',
  email: '',
  external_url: '',
  description: '',
  logoImage: {
    url: '',
    file: null,
    isDel: false,
    caption: 'Kích thước hình ảnh biểu trưng phải tối thiểu là 300x300px',
  },
  coverImage: {
    url: '',
    file: null,
    isDel: false,
    caption: 'Kích thước ảnh bìa phải là 1280x300px'
  },
  address_line_1: '',
  address_line_2: '',
  city: '',
  zip_code: '',
  phone: '',
  country_id: '',
  state_id: '',
};

const defaultFormError = {

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
      formRules: shopRules,
      isFormLoading: false,
      addressId: null,
      shopId: this.$route.params.id,
      countries: [],
    }
  },
  watch: {
    $route(to, from) {
      this.customerId = to.params.id;
      if (to.name !== 'list-shop') {
        this.formSetup();
      }
    },
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
      'fetchShopItemById': 'shop/fetchShopItemById',
      'fetchListCountries': 'country/fetchListCountries',
      'updateShop': 'shop/updateShop',
      'updateAddress': 'address/updateAddress'
    }),
    async formSetup() {
      try {
        this.resetFormData();
        this.getFormName();
        this.isFormLoading = true;
        if (this.shopId) {
          const dataShop = await this.fetchShopItemById(this.shopId);
          this.appendDataToForm(dataShop.shop);
        }
        if (this.$route.query.update === 'address') {
          const [dataCountry] = await Promise.all([this.fetchListCountries()]);
          this.countries = dataCountry.countries;
        }
        this.isFormLoading = false;
      } catch (error) {
        console.error('[App Error] => ', error);
          if (error.status === 404) {
            this.$confirm('Cửa hàng này không tồn tại, hoặc đã bị xóa trước đó !', 'Thông báo lỗi', {
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
    back(router = '/vendor/shop', query = {}) {
      this.resetFormData();
      this.$refs['formData'].resetFields();
      this.$router.push({ path: router, query });
    },
    saveLogoImage(file) {
      this.formData.logoImage.file = file;
    },
    saveCoverImage(file) {
      this.formData.coverImage.file = file;
    },
    handleCloseForm() {
      this.back();
    },
    resetFormData() {
      this.formData  = {...defaultFormData};
      this.formError = {...defaultFormError};
      this.formData.logoImage.url   = '';
      this.formData.logoImage.file  = null;
      this.formData.logoImage.isDel = false;
      this.formData.coverImage.url   = '';
      this.formData.coverImage.file  = null;
      this.formData.coverImage.isDel = false;
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
            this.back('/vendor/shop', { form: 'success' });
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
        return this.updateShop({ formData: this.setFormData(), id: this.shopId });
      }
      if (this.$route.query.update === 'address') {
        return this.updateAddress({ formData: this.formData, id: this.addressId });
      }
    },
    setFormData() {
      let formData = new FormData();
      formData.append('name', this.formData.name);
      formData.append('active', this.formData.active);
      formData.append('legal_name', this.formData.legal_name);
      formData.append('email', this.formData.email);
      formData.append('external_url', this.formData.external_url);
      formData.append('description', this.formData.description);
      if (this.formData.logoImage.file) {
        formData.append('images[logo]', this.formData.logoImage.file);
      }
      if (this.formData.logoImage.isDel) {
        formData.append('delete_image[logo]', '1');
      }
      if (this.formData.coverImage.file) {
        formData.append('images[cover]', this.formData.coverImage.file);
      }
      if (this.formData.coverImage.isDel) {
        formData.append('delete_image[cover]', '1');
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
      this.formData.active = data.active ? '1' : '0';
      this.formData.legal_name = data.legal_name;
      this.formData.email = data.email;
      this.formData.external_url = data.external_url || '';
      this.formData.description = data.description || '';
      this.formData.logoImage.url = data.logo_image;
      this.formData.coverImage.url = data.cover_image;

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
      return this.$route.query.update === type;
    }
  },
}
</script>