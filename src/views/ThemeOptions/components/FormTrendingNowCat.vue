<template>
  <form-action
    :name="formName"
    :size="'700px'"
    :isFormLoading="isFormLoading"
    @close="handleCloseForm"
  >
    <template v-slot:form-body>
      <el-form
        ref="formData"
        :model="formData"
        @submit.prevent
      >
        <el-row :gutter="5">
          <el-col :span="24" class="p-1">
            <el-form-item prop="trending_categories">
              <label for="trending_categories" class="FormLabel">
                <span class="FormLabel__title">Trending Categories</span>
              </label>
              <el-select
                v-model="formData.trending_categories"
                class="w-100"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="Select some categories">
                <el-option
                  v-for="category in categories"
                  :key="category.id"
                  :label="category.name"
                  :value="category.id">
                </el-option>
              </el-select>
              <div v-if="formError.trending_categories" class="el-form-item__error">{{ formError.trending_categories }}</div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template v-slot:form-footer>
      <el-button type="primary" size="mini" @click.prevent="handleActionForm(handleUpdate)">
        <i class="PopupForm__SaveIcon fas fa-save"></i>
        <span class="PopupForm_SaveLabel">Update</span>
      </el-button>
    </template>
  </form-action>
</template>

<script>
import FormAction from '@/components/FormAction';
import { mapActions } from 'vuex';
import { Message } from 'element-ui';

const defaultFormData = {
  trending_categories: []
}

const defaultFormError = {
  trending_categories: ''
};

export default {
  components: {
    FormAction,
  },
  data() {
    return {
      formName: '',
      formData: {...defaultFormData},
      formError: {...defaultFormError},
      isFormLoading: false,
      categories: [],
    };
  },
  watch: {
    $route(to, from) {
      if (to.name !== 'list-theme-options') {
        this.formSetup();
      }
    }
  },
  created() {
    this.formSetup();
  },
  methods: {
    ...mapActions({
      'editTrendingNowCategories': 'theme/editTrendingNowCategories',
      'updateTrendingNowCategories': 'theme/updateTrendingNowCategories'
    }),
    async formSetup() {
      try {
        this.resetFormData();
        this.getFormName();
        this.isFormLoading = true;
        const dataTrendingCategories = await this.editTrendingNowCategories();
        this.categories = dataTrendingCategories.categories;
        this.formData.trending_categories = dataTrendingCategories.trending_categories
        this.isFormLoading = false;
      } catch (error) {
        this.$message.error('Có lỗi trong quá trình tải dữ liệu !');
        this.back();
      }
    },
    getFormName() {
      this.formName = this.$route.meta && this.$route.meta.title;
    },
    back(router = '/appearance/theme/option') {
      this.resetFormData();
      this.$router.push({ path: router });
    },
    handleCloseForm() {
      this.back();
    },
    resetFormData() {
      this.formData  = {...defaultFormData};
      this.formError = {...defaultFormError};
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
    handleUpdate() {
      return this.updateTrendingNowCategories(this.formData);
    },
    appendErrorToForm(errors) {
      for (const [key, value] of Object.entries(errors)) {
        this.formError[key] = value[0];
      }
    },
  }
}
</script>