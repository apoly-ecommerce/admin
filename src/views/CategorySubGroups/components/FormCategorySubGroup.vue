<template>
  <form-action
    :name="formName"
    :size="'500px'"
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
import { categorySubGroupRules } from '@/validations';
import { mapActions } from 'vuex';
import { changeToSlug } from '@/helpers';
import { Message } from 'element-ui';

const defaultFormData = {
  category_group_id: '',
  name: '',
  active: '',
  order: 1,
  slug: '',
  meta_title: '',
  meta_description: '',
  coverImage: {
    url: '',
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
      categoryGroups: [],
      isFormLoading: false
    };
  },
  watch: {
    $route(to, from) {
      this.categorySubGroupId = to.params.id;
      if (to.name !== 'list-category-sub-group') {
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
  },
  methods: {
    ...mapActions({
      'setupCategorySubGroup': 'categorySubGroup/setupCategorySubGroup',
      'storeCategorySubGroup': 'categorySubGroup/storeCategorySubGroup',
      'fetchCategorySubGroupItemById': 'categorySubGroup/fetchCategorySubGroupItemById',
      'updateCategorySubGroup': 'categorySubGroup/updateCategorySubGroup'
    }),
    async formSetup() {
      try {
        this.resetFormData();
        this.getFormName();
        this.isFormLoading = true;
        if (this.categorySubGroupId) {
          let dataCategorySubGroup = await this.fetchCategorySubGroupItemById(this.categorySubGroupId);
          this.appendDataToForm(dataCategorySubGroup.categorySubGroup);
        }
        let dataSetup = await this.setupCategorySubGroup();
        this.categoryGroups = dataSetup.categoryGroups;
        this.isFormLoading = false;
      } catch (error) {
        if (error.status === 404) {
          console.error('[App Error] => ', error);
          this.$confirm('Nhóm danh mục phụ này không tồn tại, hoặc đã bị xóa trước đó !', 'Thông báo lỗi', {
            confirmButtonText: 'Quay về',
            cancelButtonText: 'Thêm mới',
            type: 'error'
          }).then(() => {
            this.back();
          }).catch(() => {
            this.back('/catalog/category-sub-group/add');
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
    back(router = '/catalog/category-sub-group', query = {}) {
      this.resetFormData();
      this.$refs['formData'].resetFields();
      this.$router.push({ path: router, query });
    },
    handleCloseForm() {
      this.back();
    },
    saveCoverImage(file) {
      this.formData.coverImage.file = file;
    },
    resetFormData() {
      this.formData  = {...defaultFormData};
      this.formError = {...defaultFormError};
      this.formData.coverImage.src   = '';
      this.formData.coverImage.file  = null;
      this.formData.coverImage.isDel = false;
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
            this.back('/catalog/category-sub-group', { form: 'success' });
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
      return this.storeCategorySubGroup(this.setFormData());
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
    appendDataToForm(data) {
      this.formData.category_group_id = data.group.id;
      this.formData.name = data.name || '';
      this.formData.slug = data.slug || '';
      this.formData.active = data.active ? '1' : '0';
      this.formData.order = data.order || '';
      this.formData.meta_title = data.meta_title || '';
      this.formData.meta_description = data.meta_description || '';
      this.formData.coverImage.src = data.cover_image || '';
    },
    checkImageNotEmpty(img) {
      if (img && !(img.split('?text=')[1] === 'No_Image_Found')) {
        return true;
      } return false;
    }
  }
}
</script>