<template>
  <form-action
    :name="formName"
    :size="'850px'"
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
                  <span class="FormLabel__title">MERCHANT NAME*</span>
                </label>
                <el-input
                  placeholder="Enter Full Name of The Merchant"
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
              <el-form-item prop="email">
                <label for="email" class="FormLabel">
                  <span class="FormLabel__title">EMAIL ADDRESS*</span>
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

            <el-col :span="12" class="p-1">
              <el-form-item prop="password">
                <label for="password" class="FormLabel">
                  <span class="FormLabel__title">TEMPORARY PASSWORD*</span>
                </label>
                <el-input
                  placeholder="Temporary password"
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
          </el-row>

          <el-row :gutter="5">
            <el-col :span="12" class="p-1">
              <el-form-item prop="shop_name">
                <label for="shop_name" class="FormLabel">
                  <span class="FormLabel__title">SHOP NAME*</span>
                  <el-tooltip class="item" effect="dark" content="Thương hiệu hoặc tên hiển thị của cửa hàng" placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </label>
                <el-input
                  placeholder="Shop name"
                  type="shop_name"
                  name="shop_name"
                  ref="shop_name"
                  autocomplete="off"
                  spellcheck="false"
                  id="shop_name"
                  @blur="coverValueToSlug"
                  v-model="formData.shop_name"
                />
                <div v-if="formError.shop_name" class="el-form-item__error">{{ formError.shop_name }}</div>
              </el-form-item>
            </el-col>

            <el-col :span="12" class="p-1">
              <el-form-item prop="legal_name">
                <label for="legal_name" class="FormLabel">
                  <span class="FormLabel__title">LEGAL NAME*</span>
                  <el-tooltip class="item" effect="dark" content="Tên pháp lý của cửa hàng" placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
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
                <div v-if="formError.legal_name" class="el-form-item__error">{{ formError.legal_name }}</div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="5">
            <el-col :span="12" class="p-1">
              <el-form-item prop="slug">
                <label for="slug" class="FormLabel">
                  <span class="FormLabel__title">SLUG*</span>
                  <el-tooltip class="item" effect="dark" content="Đây sẽ được sử dụng làm URL cửa hàng của bạn, Bạn không thể thay đổi nó sau này." placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </label>
                <el-input
                  placeholder="Slug"
                  type="slug"
                  name="slug"
                  ref="slug"
                  autocomplete="off"
                  spellcheck="false"
                  id="slug"
                  @blur="coverValueToSlug"
                  v-model="formData.slug"
                />
                <small v-if="formData.slug">{{ getUrlSlug }}</small>
                <div v-if="formError.slug" class="el-form-item__error">{{ formError.slug }}</div>
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
                <div v-if="formError.external_url" class="el-form-item__error">{{ formError.external_url }}</div>
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
                <div v-if="formError.image" class="el-form-item__error">{{ formError.image }}</div>
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
import { merchantRules } from '@/validations';
import { changeToSlug } from '@/helpers';
import { mapActions } from 'vuex';

const defaultFormData = {
  name: '',
  active: '',
  email: '',
  password: '',
  shop_name: '',
  legal_name: '',
  slug: '',
  external_url: '',
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
  legal_name: '',
  slug: '',
  shop_name: '',
  email: '',
  external_url: '',
  password: '',
  active: '',
  image: ''
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
      formRules: merchantRules,
      merchantId: this.$route.params.id,
      isFormLoading: false,
      countries: [],
    }
  },
  watch: {
    $route(to, from) {
      this.merchantId = to.params.id;
      if (to.name !== 'list-merchant') {
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
    getUrlSlug() {
      return `http://example.com/shop/${this.formData.slug}`;
    }
  },
  methods: {
    ...mapActions({
      'fetchListCountries': 'country/fetchListCountries',
      'storeMerchant': 'merchant/storeMerchant'
    }),
    async formSetup() {
      try {
        this.resetFormData();
        this.getFormName();
        this.isFormLoading = true;
        if (this.$route.query.update === 'address' ) {
          const [dataCountry] = await Promise.all([this.fetchListCountries()]);
          this.countries = dataCountry.countries;
        }
        this.isFormLoading = false;
      } catch (error) {
        console.error('[App Error] => ', error);
        if (error.status === 404) {
          this.$confirm('Người buôn này không tồn tại, hoặc đã bị xóa trước đó !', 'Thông báo lỗi', {
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
    coverValueToSlug(e) {
      let val = e.target.value;
      this.formData.slug = changeToSlug(val);
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
      this.formData  = {...defaultFormData};
      this.formError = {...defaultFormError};
      this.formData.avatarImage.url   = '';
      this.formData.avatarImage.file  = null;
      this.formData.avatarImage.isDel = false;
    },
    handleActionForm(callback) {
      this.$refs['formData'].validate(valid => {
        if (valid) {
          callback().then(res => {
          this.$message({
              message: res.success,
              type: 'success',
              duration: 5 * 1000
            });
            this.back('/vendor/merchant', { form: 'success' });
          }).catch(error => {
            console.error('[App Error] => ', error);
            if (error.status === 422) {
            this.$message({
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
    handleAdd() {
      return this.storeMerchant(this.setFormData());
    },
    handleUpdate() {},
    setFormData() {
      let formData = new FormData();
      formData.append('name', this.formData.name);
      formData.append('active', this.formData.active);
      formData.append('email', this.formData.email);
      formData.append('password', this.formData.password);
      formData.append('shop_name', this.formData.shop_name);
      formData.append('legal_name', this.formData.legal_name);
      formData.append('slug', this.formData.slug);
      formData.append('external_url', this.formData.external_url);
      formData.append('description', this.formData.description);
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
      console.log(data);
    },
    checkImageNotEmpty(img) {
      if (img && !(img.split('?text=')[1] === 'No_Image_Found')) {
        return true;
      } return false;
    },
    isUpdate(type) {
      if (this.$route.name === 'add-merchant')
        this.$route.query.update = 'origin';
      return this.$route.query.update === type;
    }
  }
}
</script>