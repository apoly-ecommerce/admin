<template>
  <form-action
    :name="formName"
    :size="'750px'"
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
                filterable
                placeholder="Select"
                class="w-100"
              >
                <el-option
                  v-for="(categorySubGroup, index) in categorySubGroups"
                  :key="index"
                  :label="categorySubGroup.name"
                  :value="categorySubGroup.id">
                </el-option>
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

          <el-col :span="6" class="p-1">
            <el-form-item prop="order">
              <label for="public" class="FormLabel">
                <span class="FormLabel__title">Order</span>
                <el-tooltip class="item" effect="dark" placement="top" content="is Tooltip !">
                  <fa-icon icon="question-circle" />
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
                  <fa-icon icon="question-circle" />
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
                  <fa-icon icon="question-circle" />
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
                  <fa-icon icon="question-circle" />
                </el-tooltip>
              </label>
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
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="24" class="p-1">
            <el-form-item prop="meta_title">
              <label for="meta_title" class="FormLabel">
                <span class="FormLabel__title">Meta title</span>
                <el-tooltip class="item" effect="dark" placement="top" content="Meta title">
                  <fa-icon icon="question-circle" />
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
                  <fa-icon icon="question-circle" />
                </el-tooltip>
              </label>
              <el-input
                type="textarea"
                ref="meta_description"
                placeholder="Start from here"
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
// Components @ > *
import FormAction from '@/components/FormAction';
import UploadImage from '@/components/UploadImage';
// Validations
import { categoryRules } from '@/validations';
// Store
import { mapActions } from 'vuex';
// Helpers
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
      categorySubGroups: []
    };
  },
   watch: {
    $route(to, from) {
      this.getFormName();
      this.resetFormData();
      this.categoryId = to.params.id;
      this.formSetup();
      if (this.categoryId) {
        this.getCategoryById()
      }
    }
  },
  created() {
    this.getFormName();
    this.resetFormData();
    this.formSetup();
    if (this.categoryId) {
      this.getCategoryById()
    }
  },
  computed: {
    getBaseUrl() {
      return `http://example.com/categorysubgrp/${this.formData.slug}`;
    },
  },
  methods: {
    ...mapActions({
      'setIsLoading': 'app/handleSetIsLoading',
      'fetchListCategorySubGroup': 'categorySubGroup/fetchListCategorySubGroup',
      'addCategory': 'category/addCategory',
      'fetchCategoryItemById': 'category/fetchCategoryItemById',
      'updateCategory': 'category/updateCategory'
    }),
    async formSetup() {
      const categorySubGroupsPromise = this.fetchListCategorySubGroup();
      const [categorySubGroupsResult] = await Promise.all([categorySubGroupsPromise]);
      this.categorySubGroups = categorySubGroupsResult.categorySubGroups;
    },
    coverValueToSlug(e) {
      let val = e.target.value;
      this.formData.slug = changeToSlug(val);
    },
    getFormName() {
      this.formName = this.$route.meta && this.$route.meta.title;
    },
    back(router = '/catalog/category', query = {}) {
      this.resetFormData();
      this.$router.push({ path: router, query });
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
          this.setIsLoading(true);
          callback().then(res => {
            Message({
              message: res.success,
              type: 'success',
              duration: 5 * 1000
            });
            this.setIsLoading(false);
            this.back('/catalog/category', { form: 'success' });
          }).catch(error => {
            Message({
              message: error.data.message,
              type: 'error',
              duration: 5 * 1000
            });
            this.setIsLoading(false);
            this.appendErrorToForm(error.data.errors);
          });
        }
      });
    },
    handleAdd() {
      return this.addCategory(this.setFormData());
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
      // Start file ...
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
      // End file ...
      return formData;
    },
    appendErrorToForm(errors) {
      for (const [key, value] of Object.entries(errors)) {
        this.formError[key] = value[0];
      }
    },
     getCategoryById() {
      this.setIsLoading(true);
      this.fetchCategoryItemById(this.categoryId).then(res => {
        this.appendToFormData(res.category);
        this.setIsLoading(false);
      }).catch(error => {
        this.setIsLoading(false);
        console.error('App Error:', error);
      });
    },
    appendToFormData(data) {
      this.formData.name = data.name;
      this.formData.category_sub_group_id = data.category_sub_group_id;
      this.formData.slug = data.slug;
      this.formData.active = data.active.toString();
      this.formData.order = data.order;
      this.formData.description = data.description;
      this.formData.coverImage.url = data.cover_image_url;
      this.formData.featureImage.url = data.feature_image_url;
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