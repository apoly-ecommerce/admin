<template>
  <form-action
    :name="formName"
    :size="'90%'"
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
            <div class="FormOption__Item">
              <div class="FormTop__Heading">THÔNG TIN CƠ BẢN</div>
              <div class="FormTop__Content">
                <el-row :gutter="5">
                  <el-col :span="18" class="p-1">
                    <el-form-item prop="name">
                      <label for="name" class="FormLabel">
                        <span class="FormLabel__title">Name *</span>
                        <el-tooltip class="item" effect="dark" placement="top" content="Khách hàng sẽ không nhìn thấy điều này. Tên này chỉ giúp người bán tìm thấy mặt hàng để liệt kê.">
                          <i class="fas fa-question-circle"></i>
                        </el-tooltip>
                      </label>
                      <el-input
                        placeholder="Product name"
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

                  <el-col :span="6" class="p-1">
                    <el-form-item prop="active">
                      <label for="active" class="FormLabel">
                        <span class="FormLabel__title">Status *</span>
                        <el-tooltip class="item" effect="dark" placement="top" content="Người bán sẽ chỉ tìm thấy các mặt hàng đang hoạt động.">
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
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="5">
                  <el-col :span="6" class="p-1">
                    <el-form-item prop="mpn">
                      <label for="mpn" class="FormLabel">
                        <span class="FormLabel__title">Mpn *</span>
                        <el-tooltip class="item" effect="dark" placement="top" content="Mã bộ phận của nhà sản xuất (MPN) là mã định danh duy nhất do nhà sản xuất cấp. Bạn có thể lấy MPN từ nhà sản xuất. Không bắt buộc nhưng được khuyến nghị">
                          <i class="fas fa-question-circle"></i>
                        </el-tooltip>
                      </label>
                      <el-input
                        placeholder="Manufacturer Part Number"
                        type="text"
                        ref="mpn"
                        autocomplete="off"
                        spellcheck="false"
                        id="mpn"
                        v-model="formData.mpn"
                      />
                    </el-form-item>
                  </el-col>

                  <el-col :span="18" class="p-1">
                    <el-form-item prop="list_tags">
                      <label for="list_tags" class="FormLabel">
                        <span class="FormLabel__title">Tags</span>
                      </label>
                      <el-select
                        v-model="formData.tag_list"
                        class="w-100"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        placeholder="Choose tags for your product">
                        <el-option
                          v-for="(tag, index) in tags"
                          :key="index"
                          :label="tag.label"
                          :value="tag.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="5">
                  <el-col :span="24" class="p-1">
                    <el-form-item prop="detail_information">
                      <label for="detail_information" class="FormLabel">
                        <span class="FormLabel__title">Thông tin chi tiết</span>
                        <el-tooltip class="item" effect="dark" placement="top" content="is tooltip">
                          <i class="fas fa-question-circle"></i>
                        </el-tooltip>
                      </label>
                      <editor
                        :api-key="tinymceSetup.api_key"
                        :init="tinymceSetup.config"
                        v-model="formData.detail_information"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="5">
                  <el-col :span="24" class="p-1">
                    <el-form-item prop="description">
                      <label for="description" class="FormLabel">
                        <span class="FormLabel__title">Mô tả sản phẩm</span>
                        <el-tooltip class="item" effect="dark" placement="top" content="is tooltip">
                          <i class="fas fa-question-circle"></i>
                        </el-tooltip>
                      </label>
                      <editor
                        :api-key="tinymceSetup.api_key"
                        :init="tinymceSetup.config"
                        v-model="formData.description"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="5">
                  <el-col :span="24" class="p-1">
                    <el-form-item prop="feature_image">
                      <label for="feature_image" class="FormLabel">
                        <span class="FormLabel__title">Describe images</span>
                        <el-tooltip class="item" effect="dark" placement="top" content="Khách hàng sẽ không nhìn thấy điều này. Điều này chỉ giúp người bán tìm thấy mặt hàng để liệt kê.">
                          <i class="fas fa-question-circle"></i>
                        </el-tooltip>
                      </label>
                      <div class="line-break"></div>
                      <cloudinary-upload
                        :max="10"
                        :caption="'* Bạn có thể tải lên tối đa 10 hình ảnh'"
                        :init="{ cloud_name: 'phamdinhhungit', upload_preset: 'm15alpjo' }"
                        :imgs="formData.media_list"
                        @change="handleUploadDescribeImages"
                        @clErrorMaxFile="handleClErrorMaxFile"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>

          <el-col :span="8" class="p-1">
            <div class="FormOption__Item">
              <div class="FormTop__Heading">THÔNG TIN BỔ XUNG</div>
              <div class="FormTop__Content">
                <el-row :gutter="5">
                  <el-col :span="24" class="p-1">
                    <el-form-item prop="category_list">
                      <label for="category_list" class="FormLabel">
                        <span class="FormLabel__title">Categorise</span>
                      </label>
                      <el-select
                        v-model="formData.category_list"
                        class="w-100"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        placeholder="Select categories">
                        <el-option-group
                          v-for="sub_group in categorySubGroupsHasCategories"
                          :key="sub_group.id"
                          :label="sub_group.group.name +' > '+ sub_group.name"
                        >
                          <el-option
                            v-for="category in sub_group.categories"
                            :key="category.id"
                            :value="category.id"
                            :label="category.name"
                          />
                        </el-option-group>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="5">
                  <el-col :span="24">
                    <el-form-item prop="requires_shipping">
                      <label for="image_desc" class="FormLabel">
                        <span class="FormLabel__title">Yêu cầu vận chuyển</span>
                      </label>
                      <div class="line-break"></div>
                      <template>
                        <el-radio class="mx-1" v-model="formData.requires_shipping" label="1" border>Có</el-radio>
                        <el-radio class="mx-1" v-model="formData.requires_shipping" label="0" border>Không</el-radio>
                      </template>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="5">
                  <el-col :span="24" class="p-1">
                    <label for="image_desc" class="FormLabel">
                      <b class="FormLabel__title">Bảo hành</b>
                    </label>
                    <div class="line-break"></div>
                  </el-col>

                  <el-col :span="24" class="p-1">
                    <el-form-item prop="warranty_period">
                      <label for="image_desc" class="FormLabel">
                        <span class="FormLabel__title">Thời gian bảo hành</span>
                      </label>
                      <el-input
                        placeholder="Thời gian bảo hành"
                        type="number"
                        ref="warranty_period"
                        autocomplete="off"
                        spellcheck="false"
                        id="warranty_period"
                        v-model="formData.warranty_period"
                      >
                        <el-select v-model="formData.warranty_period_type" slot="prepend" style="width: 90px">
                          <el-option label="Ngày" value="Ngày" />
                          <el-option label="Tháng" value="Tháng" />
                          <el-option label="Năm" value="Năm" />
                        </el-select>
                      </el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24" class="p-1">
                    <el-form-item prop="warranty_form">
                      <label for="image_desc" class="FormLabel">
                        <span class="FormLabel__title">Hình thức bảo hành</span>
                      </label>
                      <el-input
                        placeholder="Hình thức bảo hành"
                        type="text"
                        ref="warranty_form"
                        autocomplete="off"
                        spellcheck="false"
                        id="warranty_form"
                        v-model="formData.warranty_form"
                      />
                    </el-form-item>
                  </el-col>

                  <el-col :span="24" class="p-1">
                    <el-form-item prop="warranty_place">
                      <label for="image_desc" class="FormLabel">
                        <span class="FormLabel__title">Nơi bảo hành</span>
                      </label>
                      <el-input
                        placeholder="Nơi bảo hành"
                        type="text"
                        ref="warranty_place"
                        autocomplete="off"
                        spellcheck="false"
                        id="warranty_place"
                        v-model="formData.warranty_place"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="5">
                  <el-col :span="24" class="p-1">
                    <label for="image_desc" class="FormLabel">
                      <b class="FormLabel__title">Hỗ trợ</b>
                    </label>
                    <div class="line-break"></div>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item prop="requires_shipping">
                      <label for="image_desc" class="FormLabel">
                        <span class="FormLabel__title">Kiễm tra hàng khi nhận</span>
                        <el-tooltip class="item" effect="dark" placement="top" content="Cho phép khách hàng kiễm tra sản phẩm trước khi nhận">
                          <i class="fas fa-question-circle"></i>
                        </el-tooltip>
                      </label>
                      <div class="line-break"></div>
                      <template>
                        <el-radio class="mx-1" v-model="formData.allow_inspection" label="1" border>Có</el-radio>
                        <el-radio class="mx-1" v-model="formData.allow_inspection" label="0" border>Không</el-radio>
                      </template>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24" class="p-1">
                    <el-form-item prop="return_time">
                      <label for="image_desc" class="FormLabel">
                        <span class="FormLabel__title">Thời gian đổi trả</span>
                      </label>
                      <el-input
                        placeholder="Thời gian đổi trả"
                        type="number"
                        ref="return_time"
                        autocomplete="off"
                        spellcheck="false"
                        id="return_time"
                        v-model="formData.return_time"
                      >
                        <el-select v-model="formData.return_time_type" slot="prepend" style="width: 90px">
                          <el-option label="Ngày" value="Ngày" />
                          <el-option label="Tháng" value="Tháng" />
                          <el-option label="Năm" value="Năm" />
                        </el-select>
                      </el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24" class="p-1">
                    <el-form-item prop="percent_refund">
                      <label for="image_desc" class="FormLabel">
                        <span class="FormLabel__title">Phần trăm hoàn tiền</span>
                      </label>
                      <el-input
                        placeholder="Phần trăm hoàn tiền"
                        type="number"
                        ref="percent_refund"
                        autocomplete="off"
                        spellcheck="false"
                        id="percent_refund"
                        v-model="formData.percent_refund"
                      >
                        <template slot="prepend">%</template>
                      </el-input>
                    </el-form-item>
                  </el-col>

                </el-row>

                <el-row :gutter="5">
                  <el-col :span="24">
                    <el-form-item prop="feature_image">
                      <label for="image_desc" class="FormLabel">
                        <b class="FormLabel__title">Avatar</b>
                        <el-tooltip class="item" effect="dark" placement="top" content="">
                          <i class="fas fa-question-circle"></i>
                        </el-tooltip>
                      </label>
                      <div class="line-break"></div>
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
                          @upload="saveFeatureImage"
                        />
                      </template>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="5">
                  <el-col :span="24" class="p-1">
                    <label for="branding" class="FormLabel">
                      <b class="FormLabel__title">Branding</b>
                    </label>
                    <div class="line-break"></div>
                  </el-col>
                </el-row>

                <el-row :gutter="5">
                  <el-col :span="24" class="p-1">
                    <el-form-item prop="brand">
                      <label for="brand" class="FormLabel">
                        <span class="FormLabel__title">Brand</span>
                        <el-tooltip class="item" effect="dark" placement="top" content="Thương hiệu của sản phẩm. Không bắt buộc nhưng được khuyến nghị">
                          <i class="fas fa-question-circle"></i>
                        </el-tooltip>
                      </label>
                      <el-input
                        placeholder="Brand"
                        type="text"
                        name="brand"
                        ref="brand"
                        autocomplete="off"
                        spellcheck="false"
                        id="brand"
                        v-model="formData.brand"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="5">
                  <el-col :span="24" class="p-1">
                    <el-form-item prop="model_number">
                      <label for="model_number" class="FormLabel">
                        <span class="FormLabel__title">Module number</span>
                        <el-tooltip class="item" effect="dark" placement="top" content="Số nhận dạng của một sản phẩm do nhà sản xuất cung cấp. Không bắt buộc nhưng được khuyến nghị">
                          <i class="fas fa-question-circle"></i>
                        </el-tooltip>
                      </label>
                      <el-input
                        placeholder="Module number"
                        type="text"
                        name="model_number"
                        ref="model_number"
                        autocomplete="off"
                        spellcheck="false"
                        id="model_number"
                        v-model="formData.model_number"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="5">
                  <el-col :span="24" class="p-1">
                    <el-form-item prop="manufacturer_id">
                      <label for="manufacturer_id" class="FormLabel">
                        <span class="FormLabel__title">Manufacturer</span>
                      </label>
                      <el-select
                        v-model="formData.manufacturer_id"
                        filterable
                        placeholder="Select"
                        class="w-100"
                      >
                        <el-option
                          v-for="manufacturer in manufacturers"
                          :key="manufacturer.id"
                          :label="manufacturer.name"
                          :value="manufacturer.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template v-slot:form-footer>
      <el-button v-if="!productId" type="primary" size="mini" @click.prevent="handleActionForm(handleAdd)">
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
import { tinymceConfig, tinymceApiKey } from '@/config/tinymce';
import AppCurrencyInput from '@/components/AppCurrencyInput';
import CloudinaryUpload from '@/components/CloudinaryUpload';
import FormAction from '@/components/FormAction';
import UploadImage from '@/components/UploadImage';
import { productRules } from '@/validations';
import Editor from '@tinymce/tinymce-vue';
import { mapActions } from 'vuex';

const defaultFormData = {
  name: '',
  active: '',
  mpn: '',
  description: '',
  detail_information: '',
  tag_list: [],
  category_list: [],
  media_list: [],
  featureImage: {
    url: '',
    file: null,
    isDel: false
  },
  brand: '',
  model_number: '',
  manufacturer_id: '',
  requires_shipping: '',
  warranty_period: '',
  warranty_period_type: 'Tháng',
  warranty_form: '',
  warranty_place: '',
  percent_refund: '',
  return_time: '',
  return_time_type: 'Tháng',
  allow_inspection: ''
};

const defaultFormError = {
  name: '',
};

export default {
  components: {
    FormAction,
    UploadImage,
    CloudinaryUpload,
    'editor': Editor,
    'app-currency-input': AppCurrencyInput
  },
  data() {
    return {
      formName: '',
      formData: {...defaultFormData},
      formError: {...defaultFormError},
      formRules: productRules,
      productId: this.$route.params.id,
      tags: [],
      categorySubGroups: [],
      manufacturers: [],
      isFormLoading: false,
    };
  },
  watch: {
    $route(to, from) {
      this.productId = to.params.id;
      if (to.name !== 'list-product') {
        this.formSetup();
      }
    }
  },
  created() {
    this.formSetup();
  },
  computed: {
    tinymceSetup() {
      return {
        config: tinymceConfig,
        api_key: tinymceApiKey
      };
    },
    categorySubGroupsHasCategories() {
      let result = this.categorySubGroups.filter(item => {
        if (item.categories && item.categories.length)
          return item;
      });
      return result;
    }
  },
  methods: {
    ...mapActions({
      'setIsLoading': 'app/handleSetIsLoading',
      'fetchListManufacturer': 'manufacturer/fetchListManufacturer',
      'fetchListCategorySubGroup': 'categorySubGroup/fetchListCategorySubGroup',
      'setupFormProduct': 'product/setupFormProduct',
      'storeProduct': 'product/storeProduct',
      'fetchProductItemById': 'product/fetchProductItemById',
      'updateProduct': 'product/updateProduct'
    }),
    async formSetup() {
      try {
        this.resetFormData();
        this.getFormName();
        this.isFormLoading = true;
        if (this.productId) {
          let dataProduct = await this.fetchProductItemById(this.productId);
          this.appendDataToForm(dataProduct.product);
        }
        const dataSetup = await this.setupFormProduct();
        this.manufacturers = dataSetup.manufacturers;
        this.categorySubGroups = dataSetup.categorySubGroups
        this.isFormLoading = false;
      } catch (error) {
        console.error('[App Error] => ', error);
        if (error.status === 404) {
          this.$confirm('Sản phẩm này không tồn tại, hoặc đã bị xóa trước đó !', 'Thông báo lỗi', {
            confirmButtonText: 'Quay về',
            cancelButtonText: 'Thêm mới',
            type: 'error'
          }).then(() => {
            this.back();
          }).catch(() => {
            this.back('/catalog/product/add');
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
    back(router = '/catalog/product', query = {}) {
      this.resetFormData();
      this.$refs['formData'].resetFields();
      this.$router.push({ path: router, query });
    },
    handleCloseForm() {
      this.back();
    },
    saveFeatureImage(file) {
      this.formData.featureImage.file = file;
    },
    handleUploadImagesDesc(files) {
      this.formData.media_list = files;
    },
    resetFormData() {
      this.formData  = {...defaultFormData};
      this.formError = {...defaultFormError};
      this.formData.featureImage.url = '';
      this.formData.featureImage.file = null;
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
            this.resetFormData();
            this.back('/catalog/product', { form: 'success' });
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
      return this.storeProduct(this.setFormData());
    },
    handleUpdate() {
      return this.updateProduct({ formData: this.setFormData(), id: this.productId });
    },
    setFormData() {
      let formData = new FormData();
      formData.append('name', this.formData.name);
      formData.append('active', this.formData.active);
      formData.append('mpn', this.formData.mpn);
      formData.append('description', this.formData.description);
      formData.append('detail_information', this.formData.detail_information);
      formData.append('brand', this.formData.brand);
      formData.append('model_number', this.formData.model_number);
      formData.append('manufacturer_id', this.formData.manufacturer_id);
      formData.append('requires_shipping', this.formData.requires_shipping);

      if (this.formData.warranty_period) {
        formData.append('warranty_period', this.formData.warranty_period + ' ' + this.formData.warranty_period_type);
      }
      if (this.formData.return_time) {
        formData.append('return_time', this.formData.return_time + ' ' + this.formData.return_time_type);
      }

      formData.append('warranty_form', this.formData.warranty_form);
      formData.append('warranty_place', this.formData.warranty_place);
      formData.append('percent_refund', this.formData.percent_refund);
      formData.append('allow_inspection', this.formData.allow_inspection);

      if (this.formData.tag_list.length) {
        for (let i=0;i<this.formData.tag_list.length;i++) {
          formData.append('tag_list[]', this.formData.tag_list[i]);
        }
      }

      if (this.formData.category_list.length) {
        for (let i=0;i<this.formData.category_list.length;i++) {
          formData.append('category_list[]', this.formData.category_list[i]);
        }
      }

      if (this.formData.media_list.length) {
        for (let i=0;i<this.formData.media_list.length;i++) {
          formData.append(`media_list[${i}][type]`, [this.formData.media_list[i].resource_type]);
          formData.append(`media_list[${i}][url]`, [this.formData.media_list[i].secure_url]);
        }
      }

      if (this.formData.featureImage.file) {
        formData.append('images[feature]', this.formData.featureImage.file);
      }

      if (this.formData.featureImage.isDel) {
        formData.append('delete_image[feature]', '1');
      }

      return formData;
    },
    appendErrorToForm(errors) {
      for (const [key, value] of Object.entries(errors)) {
        this.formError[key] = value[0];
      }
    },
    appendDataToForm(data) {
      this.formData.name = data.name;
      this.formData.active = data.active ? '1' : '0';
      this.formData.mpn = data.mpn;
      this.formData.description = data.description;
      this.formData.detail_information = data.detail_information;

      if (data.categories) {
        this.formData.category_list = data.categories.map(_c => _c.id);
      }
      if (data.media_products) {
        this.formData.media_list = data.media_products.map(_mp => {
          return { resource_type: _mp.type, secure_url: _mp.url };
        });
      }

      this.formData.promotional_price = +data.promotional_price;
      this.formData.original_price = +data.original_price;

      this.formData.featureImage.url = data.image;

      this.formData.brand = data.brand;
      this.formData.model_number = data.model_number;

      if (data.manufacturer) {
        this.formData.manufacturer_id = data.manufacturer.id;
      }

      this.formData.requires_shipping = data.requires_shipping ? '1' : '0';

      if (data.warranty_period) {
        this.formData.warranty_period = data.warranty_period.split(' ')[0];
        this.formData.warranty_period_type = data.warranty_period.split(' ')[1];
      }

      this.formData.warranty_form = data.warranty_form;
      this.formData.warranty_place = data.warranty_place;
      this.formData.percent_refund = data.percent_refund;

      if (data.return_time) {
        this.formData.return_time = data.return_time.split(' ')[0];
        this.formData.return_time_type = data.return_time.split(' ')[1];
      }

      this.formData.allow_inspection = data.allow_inspection ? '1' : '0';

    },
    checkImageNotEmpty(img) {
      if (img && !(img.split('?text=')[1] === 'No_Image_Found')) {
        return true;
      } return false;
    },
    handleClErrorMaxFile() {
      this.$message.error('Chỉ có thể up tối đa 10 ảnh !');
    },
    handleUploadDescribeImages(images) {
      let imagesObj = images.map(item => {
        return {
          resource_type: item.resource_type,
          secure_url: item.secure_url
        };
      });
      this.formData.media_list = [...imagesObj];
    }
  }
}
</script>