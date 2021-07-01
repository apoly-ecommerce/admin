<template>
  <form-action
    :name="formName"
    :size="'600px'"
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
          <el-col :span="17" class="p-1">
            <el-form-item prop="name">
              <label for="name" class="FormLabel">
                <span class="FormLabel__title">TOPIC NAME*</span>
              </label>
              <el-input
                placeholder="Name"
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

          <el-col :span="7" class="p-1">
            <el-form-item prop="for">
              <label for="slug" class="FormLabel">
                <span class="FormLabel__title">Status *</span>
              </label>
              <el-select
                v-model="formData.for"
                id="for"
                class="w-100"
              >
                <el-option
                  v-for="forTopic in forTopics"
                  :key="forTopic"
                  :value="forTopic"
                  :label="forTopic"
                />
              </el-select>
              <div v-if="formError.for" class="el-form-item__error">{{ formError.for }}</div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template v-slot:form-footer>
      <el-button v-if="!faqTopicId" type="primary" size="mini" @click.prevent="handleActionForm(handleAdd)">
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
import { faqTopicRules } from '@/validations';
import { mapActions } from 'vuex';
import { Message } from 'element-ui';

const defaultFormData = {
  name: '',
  for: 'Merchant'
};

const defaultFormError = {
  name: '',
  for: ''
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
      formRules: faqTopicRules,
      faqTopicId: this.$route.params.id,
      isFormLoading: false,
      forTopics: ['Merchant', 'Customer']
    }
  },
  watch: {
    $route(to, from) {
      this.faqTopicId = to.params.id;
      if (to.name !== 'list-faq') {
        this.formSetup();
      }
    },
  },
  created() {
    this.formSetup();
  },
  methods: {
    ...mapActions({
      'storeFaqTopic': 'faq/storeFaqTopic',
      'fetchFaqTopicItemById': 'faq/fetchFaqTopicItemById',
      'updateFaqTopic': 'faq/updateFaqTopic'
    }),
    async formSetup() {
      try {
        this.resetFormData();
        this.getFormName();
        this.isFormLoading = true;
        if (this.faqTopicId) {
          const dataFaqTopic = await this.fetchFaqTopicItemById(this.faqTopicId);
          this.formData = dataFaqTopic.faqTopic;
        }
        this.isFormLoading = false;
      } catch (err) {
        console.error('[App Error] => ', err);
        if (err.status === 404) {
          this.$confirm('Faq topic này không tồn tại, hoặc đã bị xóa trước đó !', 'Thông báo lỗi', {
            confirmButtonText: 'Quay về',
            cancelButtonText: 'Thêm mới',
            type: 'error'
          }).then(() => {
            this.back();
          }).catch(() => {
            this.back('/utility/faqTopic/add');
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
    back(router = '/utility/faq', query = {}) {
      this.resetFormData();
      this.$router.push({ path: router, query });
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
            this.back('/utility/faq', { form: 'success' });
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
      return this.storeFaqTopic(this.formData);
    },
    handleUpdate() {
      return this.updateFaqTopic({ formData: this.formData, id: this.faqTopicId });
    },
    appendErrorToForm(errors) {
      for (const [key, value] of Object.entries(errors)) {
        this.formError[key] = value[0];
      }
    },
  }
}
</script>