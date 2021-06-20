<template>
  <form-action
    :name="formName"
    :size="'800px'"
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

        <el-row :gutter="5">
          <el-col :span="16" class="p-1">
            <el-form-item prop="name">
              <label for="name" class="FormLabel">
                <span class="FormLabel__title">Name *</span>
              </label>
              <el-input
                placeholder="Nanufacturer name"
                type="text"
                ref="name"
                autocomplete="off"
                spellcheck="false"
                id="name"
                @blur="coverValueToSlug"
                v-model="formData.name"
              />
              <div v-if="formError.name" class="el-form-item__error">{{ formError.name }}</div>
            </el-form-item>
          </el-col>

          <el-col :span="8" class="p-1">
            <el-form-item prop="active">
              <label for="active" class="FormLabel">
                <span class="FormLabel__title">Status *</span>
                <el-tooltip class="item" effect="dark" placement="top" content="is Tooltip !">
                  <i class="fas fa-question-circle"></i>
                </el-tooltip>
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
            <el-form-item prop="url">
              <label for="url" class="FormLabel">
                <span class="FormLabel__title">Url</span>
                <el-tooltip class="item" effect="dark" placement="top" content="Liên kết trang web chính thức của nhà sản xuất.">
                  <i class="fas fa-question-circle"></i>
                </el-tooltip>
              </label>
              <el-input
                placeholder="Web address"
                type="text"
                name="url"
                ref="url"
                autocomplete="off"
                spellcheck="false"
                id="url"
                v-model="formData.url"
              >
                <template slot="prepend">Https://</template>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12" class="p-1">
            <el-form-item prop="country_id">
              <label for="country_id" class="FormLabel">
                <span class="FormLabel__title">Country</span>
              </label>
              <el-select
                v-model="formData.country_id"
                filterable
                placeholder="Select"
                class="w-100"
              >
                <el-option
                  v-for="(country, index) in countries"
                  :key="index"
                  :label="country.name"
                  :value="country.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="12" class="p-1">
            <el-form-item prop="email">
              <label for="email" class="FormLabel">
                <span class="FormLabel__title">Email</span>
                <el-tooltip class="item" effect="dark" placement="top" content="Hệ thống sẽ sử dụng địa chỉ email này để liên lạc với nhà sản xuất.">
                  <i class="fas fa-question-circle"></i>
                </el-tooltip>
              </label>
              <el-input
                placeholder="Enter a valid email address"
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
            <el-form-item prop="phone">
              <label for="phone" class="FormLabel">
                <span class="FormLabel__title">Phone</span>
                <el-tooltip class="item" effect="dark" placement="top" content="Số điện thoại hỗ trợ của nhà sản xuất.">
                  <i class="fas fa-question-circle"></i>
                </el-tooltip>
              </label>
              <el-input
                placeholder="Phone number"
                type="phone"
                name="phone"
                ref="phone"
                autocomplete="off"
                spellcheck="false"
                id="phone"
                v-model="formData.phone"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="24" class="p-1">
            <el-form-item prop="description">
              <label for="description" class="FormLabel">
                <span class="FormLabel__title">Description</span>
                <el-tooltip class="item" effect="dark" placement="top" content="is tooltip">
                  <i class="fas fa-question-circle"></i>
                </el-tooltip>
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
              <label for="logoImage" class="FormLabel">
                <span class="FormLabel__title">Brand logo</span>
              </label>
              <template>
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
                  :name="'UploadLogoImage'"
                  :placeholer="'Brand logo'"
                  :caption="formData.logoImage.caption"
                  @upload="saveLogoImage"
                />
              </template>
            </el-form-item>
          </el-col>

          <el-col :span="12" class="p-1">
            <el-form-item prop="coverImage">
              <label for="coverImage" class="FormLabel">
                <span class="FormLabel__title">Cover image</span>
                <el-tooltip class="item" effect="dark" content="is tooltip" placement="top">
                  <i class="fas fa-question-circle"></i>
                </el-tooltip>
              </label>
              <template>
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
                  :placeholer="'Category featured image'"
                  :caption="formData.coverImage.caption"
                  @upload="saveCoverImage"
                />
              </template>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="12" class="p-1">
            <el-form-item prop="FeatureImage">
              <label for="Featured image" class="FormLabel">
                <span class="FormLabel__title">Featured image</span>
                <el-tooltip class="item" effect="dark" content="is tooltip" placement="top">
                  <i class="fas fa-question-circle"></i>
                </el-tooltip>
              </label>
              <template>
                <div v-if="checkImageNotEmpty(formData.featureImage.url)" class="ImageThumb_wrap">
                  <div class="thumbNail d-block">
                    <img :src="formData.featureImage.url" alt="" />
                  </div>
                  <div class="confirm">
                    <el-tag type="danger">
                      <el-checkbox v-model="formData.featureImage.isDel">
                        <small>Delete image</small>
                      </el-checkbox>
                    </el-tag>
                  </div>
                </div>
                <upload-image
                  :name="'UploadFeatureImage'"
                  :placeholer="'Category featured image'"
                  :caption="formData.featureImage.caption"
                  @upload="saveFeatureImage"
                />
              </template>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </template>

    <template v-slot:form-footer>
      <el-button v-if="!manufacturerId" type="primary" size="mini" @click.prevent="handleActionForm(handleAdd)">
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
// Components @ > *
import FormAction from '@/components/FormAction';
import UploadImage from '@/components/UploadImage';
// Validations
import { manufacturerRules } from '@/validations';
// Store
import { mapActions } from 'vuex';
// Helpers
import { changeToSlug } from '@/helpers';

import { Message } from 'element-ui';

const defaultFormData = {
  name: '',
  slug: '',
  active: '',
  url: '',
  country_id: '',
  email: '',
  phone: '',
  description: '',
  logoImage: {
    url: '',
    file: null,
    isDel: false,
    caption: 'Kích thước hình logo tối thiểu là 300x300px'
  },
  coverImage: {
    url: '',
    file: null,
    isDel: false,
    caption: 'Kích thước ảnh bìa phải là 1280x300px'
  },
  featureImage: {
    url: '',
    file: null,
    isDel: false,
    caption: 'Kích thước hình ảnh nổi bật phải là 380x160px'
  }
};

const defaultFormError = {
  name: '',
  active: '',
  email: ''
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
      formRules: manufacturerRules,
      manufacturerId: this.$route.params.id,
      countries: [],
      isFormLoading: false
    };
  },
   watch: {
    $route(to, from) {
      this.manufacturerId = to.params.id;
      if (to.name !== 'list-manufacturer') {
        this.formSetup();
      }
    }
  },
  created() {
    this.formSetup();
  },
  methods: {
    ...mapActions({
      'setIsLoading': 'app/handleSetIsLoading',
      'fetchListCountries': 'country/fetchListCountries',
      'addManufacturer': 'manufacturer/addManufacturer',
      'fetchManufacturerItemById': 'manufacturer/fetchManufacturerItemById',
      'updateManufacturer': 'manufacturer/updateManufacturer'
    }),
    async formSetup() {
      try {
        this.resetFormData();
        this.getFormName();
        this.isFormLoading = true;
        if (this.manufacturerId) {
          let dataManufacturer = await this.fetchManufacturerItemById(this.manufacturerId);
          this.appendDataToForm(dataManufacturer.manufacturer);
        }
        const [dataCountries] = await Promise.all([this.fetchListCountries()]);
        this.countries = dataCountries.countries;
        this.isFormLoading = false;
      } catch (error) {
        if (error.status === 404) {
          console.error('[App Error] => ', error);
          this.$confirm('Nhà cung cấp này không tồn tại, hoặc đã bị xóa trước đó !', 'Thông báo lỗi', {
            confirmButtonText: 'Quay về',
            cancelButtonText: 'Thêm mới',
            type: 'error'
          }).then(() => {
            this.$router.push('/catalog/manufacturer');
          }).catch(() => {
            this.$router.push('/catalog/manufacturer/add');
          });
        } else {
          this.$message.error('Có lỗi trong quá trình tải dữ liệu !');
          this.$router.push('/catalog/manufacturer');
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
    back(router = '/catalog/manufacturer', query = {}) {
      this.resetFormData();
      this.$router.push({ path: router, query });
    },
    handleCloseForm() { this.back(); },
    saveLogoImage(file) {
      this.formData.logoImage.file = file;
    },
    saveCoverImage(file) {
      this.formData.coverImage.file = file;
    },
    saveFeatureImage(file) {
      this.formData.featureImage.file = file;
    },
    resetFormData() {
      this.formData = {...defaultFormData};
      this.formData.logoImage.url   = '';
      this.formData.logoImage.file  = null;
      this.formData.logoImage.isDel = false;

      this.formData.coverImage.url   = '';
      this.formData.coverImage.file  = null;
      this.formData.coverImage.isDel = false;

      this.formData.featureImage.url   = '';
      this.formData.featureImage.file  = null;
      this.formData.featureImage.isDel = false;
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
            this.back('/catalog/manufacturer', { form: 'success' });
          }).catch(error => {
            Message({
              message: error.data.message,
              type: 'error',
              duration: 5 * 1000
            });
            this.appendErrorToForm(error.data.errors);
          });
        }
      });
    },
    handleAdd() {
      return this.addManufacturer(this.setFormData());
    },
    handleUpdate() {
      return this.updateManufacturer({ formData: this.setFormData(), id: this.manufacturerId });
    },
    setFormData() {
      let formData = new FormData();
      formData.append('name', this.formData.name);
      formData.append('slug', this.formData.slug);
      formData.append('active', this.formData.active);
      formData.append('url', this.formData.url);
      formData.append('country_id', this.formData.country_id);
      formData.append('email', this.formData.email);
      formData.append('phone', this.formData.phone);
      formData.append('description', this.formData.description);
      // Start file ...
      if (this.formData.logoImage.isDel) {
        formData.append('delete_image[logo]', '1');
      }
      if (this.formData.coverImage.isDel) {
        formData.append('delete_image[cover]', '1');
      }
      if (this.formData.featureImage.isDel) {
        formData.append('delete_image[feature]', '1');
      }
      if (this.formData.logoImage.file) {
        formData.append('images[logo]', this.formData.logoImage.file);
      }
      if (this.formData.coverImage.file) {
        formData.append('images[cover]', this.formData.coverImage.file);
      }
      if (this.formData.featureImage.file) {
        formData.append('images[feature]', this.formData.featureImage.file);
      }
      // End file ...
      return formData;
    },
    appendErrorToForm(errors) {
      for (const [key, value] of Object.entries(errors)) {
        this.formError[key] = value[0];
      }
    },
    appendDataToForm(data) {
      this.formData.name = data.name;
      this.formData.active = data.active.toString();
      this.formData.slug = changeToSlug(data.name);
      this.formData.url = data.url;
      this.formData.country_id = data.country_id;
      this.formData.email = data.email;
      this.formData.phone = data.phone;
      this.formData.description = data.description;
      this.formData.logoImage.url = data.logo_image_url;
      this.formData.coverImage.url = data.cover_image_url;
      this.formData.featureImage.url = data.feature_image_url;
    },
    checkImageNotEmpty(img) {
      if (img && !(img.split('?text=')[1] === 'No_Image_Found')) {
        return true;
      } return false;
    }
  }
}
</script>