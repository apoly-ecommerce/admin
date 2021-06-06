<template>
  <form-action
    :name="formName"
    :size="'500px'"
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
          <el-col :span="24" class="p-1">
            <el-form-item prop="category_group_id">
              <label for="category_group_id" class="FormLabel">
                <span class="FormLabel__title">Category group *</span>
              </label>
              <el-select
                v-model="formData.category_group_id"
                filterable
                placeholder="Select"
                class="w-100"
              >
                <el-option
                  v-for="(categoryGroup, index) in categoryGroups"
                  :key="index"
                  :label="categoryGroup.name"
                  :value="categoryGroup.id">
                </el-option>
              </el-select>
              <div v-if="formError.category_group_id" class="el-form-item__error">{{ formError.category_group_id }}</div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="24" class="p-1">
            <el-form-item prop="name">
              <label for="name" class="FormLabel">
                <span class="FormLabel__title">Name *</span>
              </label>
              <el-input
                placeholder="Category sub-group name"
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
        </el-row>

         <el-row :gutter="5">
          <el-col :span="24" class="p-1">
            <el-form-item prop="slug">
              <label for="slug" class="FormLabel">
                <span class="FormLabel__title">Slug*</span>
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
        </el-row>

        <el-row :gutter="5">
          <el-col :span="12" class="p-1">
            <el-form-item prop="active">
              <label for="public" class="FormLabel">
                <span class="FormLabel__title">Status*</span>
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

          <el-col :span="12" class="p-1">
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
                autocomplete="off"
                spellcheck="false"
                id="name"
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
                show-word-limit
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="24" class="p-1">
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
                :placeholer="'Cover image'"
                :caption="'Kích thước ảnh bìa phải là 1280x300px'"
                @upload="saveCoverImage"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template v-slot:form-footer>
      <el-button v-if="!categorySubGroupId" type="primary" size="mini" @click.prevent="handleActionForm(handleAdd)">
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
import { categorySubGroupRules } from '@/validations';
// Store
import { mapActions } from 'vuex';
// Helpers
import { changeToSlug } from '@/helpers';

import { Message } from 'element-ui';

const defaultFormData = {
  category_group_id: null,
  name: null,
  active: null,
  order: 1,
  slug: null,
  meta_title: null,
  meta_description: null,
  coverImage: {
    url: null,
    file: null,
    isDel: false
  }
};

const defaultFormError = {
  category_group_id: '',
  name: '',
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
      formRules: categorySubGroupRules,
      categorySubGroupId: this.$route.params.id,
      categoryGroups: []
    };
  },
  watch: {
    $route(to, from) {
      this.getFormName();
      this.resetFormData();
      this.categorySubGroupId = to.params.id;
      this.formSetup();
      if (this.categorySubGroupId) {
        this.getCategorySubGroupById()
      }
    }
  },
  created() {
    this.getFormName();
    this.resetFormData();
    this.formSetup();
    if (this.categorySubGroupId) {
      this.getCategorySubGroupById()
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
      'fetchListCategoryGroup': 'categoryGroup/fetchListCategoryGroup',
      'addCategorySubGroup': 'categorySubGroup/addCategorySubGroup',
      'fetchListCategorySubGroupItemById': 'categorySubGroup/fetchListCategorySubGroupItemById',
      'updateCategorySubGroup': 'categorySubGroup/updateCategorySubGroup'
    }),
    async formSetup() {
      const categoryGroupsPromise = this.fetchListCategoryGroup();
      const [categoryGroupsResult] = await Promise.all([categoryGroupsPromise]);
      this.categoryGroups = categoryGroupsResult.categoryGroups;
    },
    coverValueToSlug(e) {
      let val = e.target.value;
      this.formData.slug = changeToSlug(val);
    },
    getFormName() {
      this.formName = this.$route.meta && this.$route.meta.title;
    },
    back(router = '/catalog/category-sub-group') {
      this.resetFormData();
      this.$router.push(router);
    },
    handleCloseForm() {
      this.back();
    },
    saveCoverImage(file) {
      this.formData.coverImage.file = file;
    },
    resetFormData() {
      this.formData = {...defaultFormData};
      this.formData.coverImage.url   = '';
      this.formData.coverImage.file  = null;
      this.formData.coverImage.isDel = false;
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
            this.back();
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
      return this.addCategorySubGroup(this.setFormData());
    },
    handleUpdate() {
      return this.updateCategorySubGroup({ formData: this.setFormData(), id: this.categorySubGroupId });
    },
    setFormData() {
      let formData = new FormData();
      formData.append('category_group_id', this.formData.category_group_id);
      formData.append('name', this.formData.name);
      formData.append('active', this.formData.active);
      formData.append('order', this.formData.order);
      formData.append('slug', this.formData.slug);
      formData.append('meta_title', this.formData.meta_title);
      formData.append('meta_description', this.formData.meta_description);
      if (this.formData.coverImage.isDel) {
        formData.append('delete_image[cover]', '1');
      }
      if (this.formData.coverImage.file) {
        formData.append('images[cover]', this.formData.coverImage.file);
      }
      return formData;
    },
    appendErrorToForm(errors) {
      for (const [key, value] of Object.entries(errors)) {
        this.formError[key] = value[0];
      }
    },
    getCategorySubGroupById() {
      this.setIsLoading(true);
      this.fetchListCategorySubGroupItemById(this.categorySubGroupId).then(res => {
        this.appendToFormData(res.categorySubGroup);
        this.setIsLoading(false);
      }).catch(error => {
        this.setIsLoading(false);
        console.error('App Error:', error);
      });
    },
    appendToFormData(data) {
      this.formData.category_group_id = data.group.id;
      this.formData.name = data.name;
      this.formData.slug = data.slug;
      this.formData.active = data.active.toString();
      this.formData.order = data.order;
      this.formData.meta_title = data.meta_title;
      this.formData.meta_description = data.meta_description;
      this.formData.coverImage.url = data.cover_image_url;
    },
    checkImageNotEmpty(img) {
      if (img && !(img.split('?text=')[1] === 'No_Image_Found')) {
        return true;
      } return false;
    }
  }
}
</script>