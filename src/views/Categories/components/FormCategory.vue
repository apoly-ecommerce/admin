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
        <el-row :gutter="5">
          <el-col :span="12" class="p-1">
            <el-form-item prop="name">
              <label for="name" class="FormLabel">
                <span class="FormLabel__title">Category name *</span>
              </label>
              <el-input
                placeholder="Category name"
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

          <el-col :span="12" class="p-1">
            <el-form-item prop="category_sub_group_id">
              <label for="category_sub_group_id" class="FormLabel">
                <span class="FormLabel__title">Select sub-group *</span>
              </label>
              <el-select
                v-model="formData.category_sub_group_id"
                class="w-100"
                filterable
                allow-create
                default-first-option
                placeholder="Select category sub group">
                <el-option-group
                  v-for="group in categoryGroupsHasSubGroup"
                  :key="group.id"
                  :label="group.name"
                >
                  <el-option
                    v-for="sub_group in group.sub_groups"
                    :key="sub_group.id"
                    :value="sub_group.id"
                    :label="sub_group.name"
                  />
                </el-option-group>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="12" class="p-1">
            <el-form-item prop="slug">
              <label for="slug" class="FormLabel">
                <span class="FormLabel__title">Slug *</span>
              </label>
              <el-input
                placeholder="SEO friendly URL"
                type="text"
                name="slug"
                ref="slug"
                autocomplete="off"
                spellcheck="false"
                id="slug"
                @blur="coverValueToSlug"
                v-model="formData.slug"
              />
              <small v-if="formData.slug">{{ getBaseUrl }}</small>
              <div v-if="formError.slug" class="el-form-item__error">{{ formError.slug }}</div>
            </el-form-item>
          </el-col>

          <el-col :span="6" class="p-1">
            <el-form-item prop="active">
              <label for="active" class="FormLabel">
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

          <el-col :span="6" class="p-1">
            <el-form-item prop="order">
              <label for="order" class="FormLabel">
                <span class="FormLabel__title">Order</span>
                <el-tooltip class="item" effect="dark" placement="top" content="is Tooltip !">
                  <i class="fas fa-question-circle"></i>
                </el-tooltip>
              </label>
              <el-input-number class="w-100"
                v-model="formData.order"
                size="medium"
                :min="1"
                :max="99"
                ref="order"
                id="order"
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
            <el-form-item prop="imageCover">
              <label for="Image cover" class="FormLabel">
                <span class="FormLabel__title">Cover image</span>
                <el-tooltip class="item" effect="dark" content="is tooltip" placement="top">
                  <i class="fas fa-question-circle"></i>
                </el-tooltip>
              </label>
              <div v-if="checkImageNotEmpty(formData.coverImage.src)" class="ImageThumb_wrap">
                <div class="thumbNail d-block">
                  <img :src="formData.coverImage.src" alt="" />
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
                :placeholer="'Category cover image'"
                :caption="formData.coverImage.caption"
                @upload="saveCoverImage"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12" class="p-1">
            <el-form-item prop="FeatureImage">
              <label for="Featured image" class="FormLabel">
                <span class="FormLabel__title">Featured image</span>
                <el-tooltip class="item" effect="dark" content="is tooltip" placement="top">
                  <i class="fas fa-question-circle"></i>
                </el-tooltip>
              </label>
              <div v-if="checkImageNotEmpty(formData.featureImage.src)" class="ImageThumb_wrap">
                <div class="thumbNail d-block">
                  <img :src="formData.featureImage.src" alt="" />
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
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="24" class="p-1">
            <el-form-item prop="meta_title">
              <label for="meta_title" class="FormLabel">
                <span class="FormLabel__title">Meta title</span>
                <el-tooltip class="item" effect="dark" placement="top" content="Meta title">
                  <i class="fas fa-question-circle"></i>
                </el-tooltip>
              </label>
              <el-input
                placeholder="Meta title"
                type="text"
                name="meta_title"
                ref="meta_title"
                tabindex="6"
                autocomplete="off"
                spellcheck="false"
                id="meta_title"
                v-model="formData.meta_title"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="24" class="p-1">
            <el-form-item prop="meta_description">
              <label for="meta_description" class="FormLabel">
                <span class="FormLabel__title">Meta description</span>
                <el-tooltip class="item" effect="dark" placement="top" content="is tooltip">
                  <i class="fas fa-question-circle"></i>
                </el-tooltip>
              </label>
              <el-input
                type="textarea"
                ref="meta_description"
                placeholder="Meta description"
                v-model="formData.meta_description"
                maxlength="500"
                spellcheck="false"
                id="meta_description"
                tabindex="7"
                show-word-limit
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template v-slot:form-footer>
      <el-button v-if="!categoryId" type="primary" size="mini" @click.prevent="handleActionForm(handleAdd)">
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
import { categoryRules } from '@/validations';
import { mapActions } from 'vuex';
import { changeToSlug } from '@/helpers';
import { Message } from 'element-ui';

const defaultFormData = {
  name: '',
  category_sub_group_id: null,
  slug: '',
  active: '',
  order: 1,
  description: '',
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
    caption: 'Kích thước hình ảnh nổi bật phải là 285x190px'
  },
  meta_title: '',
  meta_description: ''
};

const defaultFormError = {
  name: '',
  category_sub_group_id: '',
  slug: '',
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
      formRules: categoryRules,
      categoryId: this.$route.params.id,
      categoryGroups: [],
      isFormLoading: false
    };
  },
  watch: {
    $route(to, from) {
      this.categoryId = to.params.id;
      if (to.name !== 'list-category') {
        this.formSetup();
      }
    }
  },
  created() {
    this.formSetup();
  },
  computed: {
    getBaseUrl() {
      return `http://example.com/categorysubgrp/${this.formData.slug}`;
    },
    categoryGroupsHasSubGroup() {
      let result = this.categoryGroups.filter(item => {
        if (item.sub_groups && item.sub_groups.length)
          return item;
      });
      return result;
    }
  },
  methods: {
    ...mapActions({
      'setupFormCategory': 'category/setupFormCategory',
      'storeCategory': 'category/storeCategory',
      'fetchCategoryItemById': 'category/fetchCategoryItemById',
      'updateCategory': 'category/updateCategory'
    }),
    async formSetup() {
      try {
        this.resetFormData();
        this.getFormName();
        this.isFormLoading = true;
        if (this.categoryId) {
          const dataCategory = await this.fetchCategoryItemById(this.categoryId);
          this.appendDataToForm(dataCategory.category);
        }
        let dataSetup = await this.setupFormCategory();
        this.categoryGroups = dataSetup.categoryGroups;
        this.isFormLoading = false;
      } catch (error) {
        console.error('[App Error] => ', error);
        if (error.status === 404) {
          this.$confirm('Danh mục này không tồn tại, hoặc đã bị xóa trước đó !', 'Thông báo lỗi', {
            confirmButtonText: 'Quay về',
            cancelButtonText: 'Thêm mới',
            type: 'error'
          }).then(() => {
            this.back();
          }).catch(() => {
            this.back('/catalog/category/add');
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
    back(router = '/catalog/category') {
      this.resetFormData();
      this.$refs['formData'].resetFields();
      this.$router.push({ path: router });
    },
    handleCloseForm() {
      this.back();
    },
    saveCoverImage(file) {
      this.formData.coverImage.file = file;
    },
    saveFeatureImage(file) {
      this.formData.featureImage.file = file;
    },
    resetFormData() {
      this.formData = {...defaultFormData};
      this.formData.coverImage.src   = '';
      this.formData.coverImage.file  = null;
      this.formData.coverImage.isDel = false;
      this.formData.featureImage.src   = '';
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
            this.back();
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
    handleAdd() {
      return this.storeCategory(this.setFormData());
    },
    handleUpdate() {
      return this.updateCategory({ formData: this.setFormData(), id: this.categoryId });
    },
    setFormData() {
      let formData = new FormData();
      formData.append('name', this.formData.name);
      formData.append('category_sub_group_id', this.formData.category_sub_group_id);
      formData.append('description', this.formData.description);
      formData.append('slug', this.formData.slug);
      formData.append('active', this.formData.active);
      formData.append('order', this.formData.order);
      formData.append('meta_title', this.formData.meta_title);
      formData.append('meta_description', this.formData.meta_description);
      if (this.formData.coverImage.isDel) {
        formData.append('delete_image[cover]', '1');
      }
      if (this.formData.featureImage.isDel) {
        formData.append('delete_image[feature]', '1');
      }
      if (this.formData.coverImage.file) {
        formData.append('images[cover]', this.formData.coverImage.file);
      }
      if (this.formData.featureImage.file) {
        formData.append('images[feature]', this.formData.featureImage.file);
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
      this.formData.category_sub_group_id = data.category_sub_group_id;
      this.formData.slug = data.slug;
      this.formData.active = data.active.toString();
      this.formData.order = data.order;
      this.formData.description = data.description;
      this.formData.coverImage.src = data.cover_image;
      this.formData.featureImage.src = data.feature_image;
      this.formData.meta_title = data.meta_title;
      this.formData.meta_description = data.meta_description;
    },
    checkImageNotEmpty(img) {
      if (img && !(img.split('?text=')[1] === 'No_Image_Found')) {
        return true;
      } return false;
    }
  }
}
</script>