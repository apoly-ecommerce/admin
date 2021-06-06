<template>
  <form-action
    :name="formName"
    :size="'90%'"
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
              <div class="FormTop__Heading">INFORMATIONS</div>
                <div class="FormTop__Content">
                  <el-row :gutter="5">
                    <el-col :span="18" class="p-1">
                      <el-form-item prop="name">
                        <label for="name" class="FormLabel">
                          <span class="FormLabel__title">Name *</span>
                          <el-tooltip class="item" effect="dark" placement="top" content="Khách hàng sẽ không nhìn thấy điều này. Tên này chỉ giúp người bán tìm thấy mặt hàng để liệt kê.">
                            <fa-icon icon="question-circle" />
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
                      </el-form-item>
                    </el-col>

                    <el-col :span="6" class="p-1">
                      <el-form-item prop="active">
                        <label for="active" class="FormLabel">
                          <span class="FormLabel__title">Status *</span>
                          <el-tooltip class="item" effect="dark" placement="top" content="Người bán sẽ chỉ tìm thấy các mặt hàng đang hoạt động.">
                            <fa-icon icon="question-circle" />
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
                            <fa-icon icon="question-circle" />
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
                      <el-form-item prop="description">
                        <label for="description" class="FormLabel">
                          <span class="FormLabel__title">Description</span>
                          <el-tooltip class="item" effect="dark" placement="top" content="is tooltip">
                            <fa-icon icon="question-circle" />
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
                          <span class="FormLabel__title">Feature images</span>
                          <el-tooltip class="item" effect="dark" placement="top" content="Khách hàng sẽ không nhìn thấy điều này. Điều này chỉ giúp người bán tìm thấy mặt hàng để liệt kê.">
                            <fa-icon icon="question-circle" />
                          </el-tooltip>
                        </label>
                        <div class="line-break"></div>
                        <upload-images
                          uploadMsg="Upload hình ảnh mô tả sản phẩm"
                          maxError="Chỉ cho phép tải lên 10 hình ảnh"
                          fileError="Tệp hình ảnh không chính xác"
                          class="upload-multi-drop-images"
                          :max="10"
                            @change="handleUploadImagesDesc"
                        />
                        <div class="note-small">
                          <i class="icon el-icon-info"></i>
                          <span class="txt">Bạn có thể tải lên tối đa 10 hình ảnh</span>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
            </div>
          </el-col>

          <el-col :span="8" class="p-1">
            <div class="FormOption__Item">
              <div class="FormTop__Heading">ORGANIZATION</div>
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
                  <el-col :span="12" class="p-1">
                    <el-form-item prop="min_price">
                      <label for="min_price" class="FormLabel">
                        <span class="FormLabel__title">Min price</span>
                        <el-tooltip class="item" effect="dark" placement="top" content="Đặt giá tối thiểu cho sản phẩm. Nhà cung cấp có thể thêm khoảng không quảng cáo trong giới hạn giá này.">
                          <fa-icon icon="question-circle" />
                        </el-tooltip>
                      </label>
                      <el-input
                        placeholder="Min price"
                        type="number"
                        name="min_price"
                        ref="min_price"
                        autocomplete="off"
                        spellcheck="false"
                        id="min_price"
                        v-model="formData.min_price"
                      >
                        <template slot="prepend">VNĐ</template>
                      </el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12" class="p-1">
                    <el-form-item prop="max_price">
                      <label for="max_price" class="FormLabel">
                        <span class="FormLabel__title">Max price</span>
                        <el-tooltip class="item" effect="dark" placement="top" content="Đặt giá tối đa cho sản phẩm. Nhà cung cấp có thể thêm khoảng không quảng cáo trong giới hạn giá này.">
                          <fa-icon icon="question-circle" />
                        </el-tooltip>
                      </label>
                      <el-input
                        placeholder="Max price"
                        type="number"
                        name="max_price"
                        ref="max_price"
                        autocomplete="off"
                        spellcheck="false"
                        id="max_price"
                        v-model="formData.max_price"
                      >
                        <template slot="prepend">VNĐ</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="5">
                  <el-col :span="24">
                    <el-form-item prop="feature_image">
                      <label for="image_desc" class="FormLabel">
                        <span class="FormLabel__title">Images</span>
                        <el-tooltip class="item" effect="dark" placement="top" content="Khách hàng sẽ chỉ nhìn thấy những hình ảnh này nếu danh sách của người bán không có hình ảnh nào để hiển thị.">
                          <fa-icon icon="question-circle" />
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
                      <span class="FormLabel__title">Branding</span>
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
                          <fa-icon icon="question-circle" />
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
                    <el-form-item prop="module_number">
                      <label for="module_number" class="FormLabel">
                        <span class="FormLabel__title">Module number</span>
                        <el-tooltip class="item" effect="dark" placement="top" content="Số nhận dạng của một sản phẩm do nhà sản xuất cung cấp. Không bắt buộc nhưng được khuyến nghị">
                          <fa-icon icon="question-circle" />
                        </el-tooltip>
                      </label>
                      <el-input
                        placeholder="Module number"
                        type="text"
                        name="module_number"
                        ref="module_number"
                        autocomplete="off"
                        spellcheck="false"
                        id="module_number"
                        v-model="formData.module_number"
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
        <fa-icon class="PopupForm__SaveIcon" icon="save" />
        <span class="PopupForm_SaveLabel">Save</span>
      </el-button>
      <el-button v-else type="primary" size="mini" @click.prevent="handleActionForm(handleUpdate)">
        <fa-icon class="PopupForm__SaveIcon" icon="save" />
        <span class="PopupForm_SaveLabel">Update</span>
      </el-button>
    </template>
  </form-action>
</template>

<script>
import FormAction from '@/components/FormAction';
import UploadImage from '@/components/UploadImage';
import { productRules } from '@/validations';
import { mapActions } from 'vuex';
import Editor from '@tinymce/tinymce-vue';
import UploadImages from 'vue-upload-drop-images';
import { tinymceConfig, tinymceApiKey } from '@/config/tinymce';
import { changeToSlug } from '@/helpers';
import { Message } from 'element-ui';

const defaultFormData = {
  name: 'sản phẩm 1',
  active: '1',
  mpn: 'npm sản phẩm 1',
  description: '<p>mô tả sản phẩm 1</p>',
  tag_list: [],
  category_list: [],
  images_desc: [],
  min_price: '12',
  max_price: '14',
  featureImage: {
    url: '',
    file: null,
    isDel: false
  },
  brand: 'thương hiệu 1',
  module_number: 'module 1',
  manufacturer_id: null,
};

const defaultFormError = {};

export default {
  components: {
    FormAction,
    UploadImage,
    'editor': Editor,
    'upload-images': UploadImages
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
    };
  },
  setup(context) {
    console.log('setup');
  },
  watch: {
    $route(to, from) {
      this.getFormName();
      this.resetFormData();
      this.productId = to.params.id;
      this.formSetup();
      if (this.productId) {
        this.getProductById()
      }
    }
  },
  created() {
    this.getFormName();
    this.resetFormData();
    this.formSetup();
    if (this.productId) {
      this.getProductById()
    }
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
        if (item.categories && item.categories.length) {
          return item;
        }
      });
      return result;
    }
  },
  methods: {
    ...mapActions({
      'setIsLoading': 'app/handleSetIsLoading',
      'fetchListManufacturer': 'manufacturer/fetchListManufacturer',
      'fetchListCategorySubGroup': 'categorySubGroup/fetchListCategorySubGroup',
      'addProduct': 'product/addProduct'
    }),
    async formSetup() {
      this.setIsLoading(true);
      // ==================
      const [manufacturersRes, categorieySubGroupRes] = await Promise.all([this.fetchListManufacturer(), this.fetchListCategorySubGroup()]);
      this.manufacturers = manufacturersRes.manufacturers;
      this.categorySubGroups = categorieySubGroupRes.categorySubGroups
      // ==================
      this.setIsLoading(false);
    },
    coverValueToSlug(e) {},
    getFormName() {
      this.formName = this.$route.meta && this.$route.meta.title;
    },
    back(router = '/catalog/product', query = {}) {
      this.resetFormData();
      this.$router.push({ path: router, query });
    },
    handleCloseForm() {this.back();},
    saveFeatureImage(file) {
      this.formData.featureImage.file = file;
    },
    handleUploadImagesDesc(files) {
      this.formData.images_desc = files;
      console.log(this.formData.images_desc);
    },
    resetFormData() {},
    handleActionForm(callback) {
      this.$refs['formData'].validate(valid => {
        if (valid) {
          this.setIsLoading(true);
          callback().then(res => {
            console.log(res);
            Message({
              message: res.success,
              type: 'success',
              duration: 5 * 1000
            });
            this.setIsLoading(false);
            this.back('/catalog/product', { form: 'success' });
          }).catch(error => {
            console.log('App error: ', error);
          });
        } else {
          this.$message.error('Dữ liệu không hợp lệ, vui lòng kiễm tra lại !');
        }
      });
    },
    handleAdd() {
      return this.addProduct(this.setFormData());
    },
    handleUpdate() {},
    setFormData() {
      let formData = new FormData();
      formData.append('name', this.formData.name);
      formData.append('active', this.formData.active);
      formData.append('mpn', this.formData.mpn);
      formData.append('description', this.formData.description);
      formData.append('min_price', this.formData.min_price);
      formData.append('max_price', this.formData.max_price);
      formData.append('brand', this.formData.brand);
      formData.append('module_number', this.formData.module_number);
      formData.append('manufacturer_id', this.formData.manufacturer_id);

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

      if (this.formData.images_desc.length) {
        for (let i=0;i<this.formData.images_desc.length;i++) {
          formData.append('images[]', this.formData.images_desc[i]);
        }
      }

      if (this.formData.featureImage.file) {
        formData.append('images[feature]', this.formData.featureImage.file);
      }

      console.log('formData: ', formData);
      console.log('__formData__:', this.formData);
      return formData;
    },
    appendErrorToForm(errors) {},
    getProductById() {},
    appendToFormData(data) {},
    checkImageNotEmpty(img) {},
  }
}
</script>