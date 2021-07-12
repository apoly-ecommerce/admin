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
                <span class="FormLabel__title">Name*</span>
              </label>
              <el-input
                placeholder="Category name"
                type="text"
                name="name"
                ref="name"
                tabindex="1"
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
                tabindex="2"
                id="order"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="8" class="p-1">
            <el-form-item prop="slug">
              <label for="slug" class="FormLabel">
                <span class="FormLabel__title">Slug*</span>
              </label>
              <el-input
                placeholder="SEO friendly URL"
                type="text"
                name="slug"
                ref="slug"
                tabindex="3"
                autocomplete="off"
                spellcheck="false"
                id="slug"
                @blur="coverValueToSlug"
                v-model="formData.slug"
              />
              <small v-if="formData.slug">{{ getUriForCategoryGroup }}</small>
              <div v-if="formError.slug" class="el-form-item__error">{{ formError.slug }}</div>
            </el-form-item>
          </el-col>

          <el-col :span="8" class="p-1">
            <el-form-item prop="icon">
              <label for="icon" class="FormLabel">
                <span class="FormLabel__title">Icon</span>
              </label>
              <vfa-picker v-model="formData.icon">
                <template v-slot:activator="{ on }">
                  <div class="position-relative">
                    <input style="padding-right: 50px;" type="text" v-model="formData.icon" @click="on" placeholder="Icon" class="el-input__inner" />
                    <i class="fas vfa-icon-preview position-absolute" :class="'fa-'+formData.icon"></i>
                  </div>
                </template>
              </vfa-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8" class="p-1">
            <el-form-item prop="active">
              <label for="active" class="FormLabel">
                <span class="FormLabel__title">Status*</span>
              </label>
              <el-select
                v-model="formData.active"
                placeholder="Chọn trạng thái"
                id="active"
                class="w-100"
                tabindex="2"
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
                tabindex="3"
                show-word-limit
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="12" class="p-1">
            <el-form-item prop="backgroundImage">
              <label for="Background image" class="FormLabel">
                <span class="FormLabel__title">Background image</span>
                <el-tooltip class="item" effect="dark" content="is tooltip" placement="top">
                  <i class="fas fa-question-circle"></i>
                </el-tooltip>
              </label>
              <div v-if="checkImageNotEmpty(formData.backgroundImage.src)" class="ImageThumb_wrap">
                <div class="thumbNail d-block">
                  <img :src="formData.backgroundImage.src" alt="" />
                </div>
                <div class="confirm">
                  <el-tag type="danger">
                    <el-checkbox v-model="formData.backgroundImage.isDel">
                      <small>Delete image</small>
                    </el-checkbox>
                  </el-tag>
                </div>
              </div>
              <upload-image
                :name="'UploadBackgroundImage'"
                :placeholer="'Background image'"
                @upload="saveBackgroundImage"
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
                @upload="saveCoverImage"
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
      <el-button v-if="!categoryGroupId" type="primary" size="mini" @click.prevent="handleActionForm(handleAdd)">
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
import { categoryGroupRules } from '@/validations';
import { mapActions } from 'vuex';
import { changeToSlug } from '@/helpers';

const defaultFormData = {
  name: '',
  order: 1,
  slug: '',
  icon: 'cube',
  active: '',
  description: '',
  backgroundImage: {
    url: '',
    isDel: false,
    file: null
  },
  coverImage: {
    url: '',
    isDel: false,
    file: null
  },
  meta_title: '',
  meta_description: ''
};

const defaultFormError = {
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
      formRules: categoryGroupRules,
      categoryGroupId: this.$route.params.id,
      isFormLoading: false
    };
  },
  watch: {
    $route(to, from) {
      this.categoryGroupId = to.params.id;
      if (to.name !== 'list-category-group') {
        this.formSetup();
      }
    }
  },
   created() {
    this.formSetup();
  },
  computed: {
    getUriForCategoryGroup() {
      return `http://example.com/categorygrp/${this.formData.slug}`;
    }
  },
  methods: {
    ...mapActions({
      'setIsLoading': 'app/handleSetIsLoading',
      'storeCategoryGroup': 'categoryGroup/storeCategoryGroup',
      'fetchCategoryGroupItemById': 'categoryGroup/fetchCategoryGroupItemById',
      'updateCategoryGroup': 'categoryGroup/updateCategoryGroup'
    }),
    async formSetup() {
      try {
        this.resetFormData();
        this.getFormName();
        this.isFormLoading = true;
        if (this.categoryGroupId) {
          let dataCategoryGroup = await this.fetchCategoryGroupItemById(this.categoryGroupId);
          this.appendDataToForm(dataCategoryGroup.categoryGroup);
        }
        this.isFormLoading = false;
      } catch (error) {
        if (error.status === 404) {
          console.error('[App Error] => ', error);
          this.$confirm('Nhóm danh mục này không tồn tại, hoặc đã bị xóa trước đó !', 'Thông báo lỗi', {
            confirmButtonText: 'Quay về',
            cancelButtonText: 'Thêm mới',
            type: 'error'
          }).then(() => {
            this.back();
          }).catch(() => {
            this.back('/catalog/category-group/add');
          });
        } else {
          this.$message.error('Có lỗi trong quá trình tải dữ liệu !');
          this.back();
        }
      }
    },
    coverValueToSlug(e) {
      this.formData.slug = changeToSlug(e.target.value);
    },
    getFormName() {
      this.formName = this.$route.meta && this.$route.meta.title;
    },
    back(router = '/catalog/category-group', query = {}) {
      this.resetFormData();
      this.$refs['formData'].resetFields();
      this.$router.push({ path: router, query }).catch((err) => {
        console.log(err);
      });
    },
    handleCloseForm() {
      this.back();
    },
    saveBackgroundImage(file) {
      this.formData.backgroundImage.file = file;
    },
    saveCoverImage(file) {
      this.formData.coverImage.file = file;
    },
    resetFormData() {
      this.formData  = {...defaultFormData};
      this.formError = {...defaultFormError};
      this.formData.backgroundImage.src   = '';
      this.formData.backgroundImage.file  = '';
      this.formData.backgroundImage.isDel = false;
      this.formData.coverImage.src   = '';
      this.formData.coverImage.file  = '';
      this.formData.coverImage.isDel = false;
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
            this.back('/catalog/category-group', { form: 'success' });
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
      return this.storeCategoryGroup(this.setFormData());
    },
    handleUpdate() {
      return this.updateCategoryGroup({ data: this.setFormData(), id: this.categoryGroupId });
    },
    setFormData() {
      let formData = new FormData();
      formData.append('name', this.formData.name);
      formData.append('order', this.formData.order);
      formData.append('slug', this.formData.slug);
      formData.append('icon', this.formData.icon);
      formData.append('active', this.formData.active);
      formData.append('description', this.formData.description);
      formData.append('meta_title', this.formData.meta_title);
      formData.append('meta_description', this.formData.meta_description);
      if (this.formData.backgroundImage.isDel) {
        formData.append('delete_image[background]', '1');
      }
      if (this.formData.coverImage.isDel) {
        formData.append('delete_image[cover]', '1');
      }
      if (this.formData.backgroundImage.file) {
        formData.append('images[background]', this.formData.backgroundImage.file);
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
      this.formData.name = data.name || '';
      this.formData.order = data.order || '';
      this.formData.slug = data.slug || '';
      this.formData.icon = data.icon || '';
      this.formData.active = data.active ? '1' : '0';
      this.formData.description = data.description || '';
      this.formData.backgroundImage.src = data.background_image || '';
      this.formData.coverImage.src = data.cover_image || '';
      this.formData.meta_title = data.meta_title || '';
      this.formData.meta_description = data.meta_description || '';
    },
    checkImageNotEmpty(img) {
      if (img && !(img.split('?text=')[1] === 'No_Image_Found')) {
        return true;
      } return false;
    }
  }
}
</script>