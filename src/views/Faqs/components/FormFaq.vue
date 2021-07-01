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
          <el-col :span="17" class="p-1">
            <el-form-item prop="question">
              <label for="question" class="FormLabel">
                <span class="FormLabel__title">QUESTION*</span>
              </label>
              <el-input
                placeholder="Set the Question"
                type="text"
                ref="question"
                autocomplete="off"
                spellcheck="false"
                id="question"
                v-model="formData.question"
              />
              <div v-if="formError.question" class="el-form-item__error">{{ formError.question }}</div>
            </el-form-item>
          </el-col>

          <el-col :span="7" class="p-1">
            <el-form-item prop="faq_topic_id">
              <label for="faq_topic_id" class="FormLabel">
                <span class="FormLabel__title">TOPIC*</span>
              </label>
              <el-select
                v-model="formData.faq_topic_id"
                placeholder="Select a topic"
                id="faq_topic_id"
                class="w-100"
              >
                <el-option
                  v-for="faqTopic in faqTopics"
                  :key="faqTopic.id"
                  :value="faqTopic.id"
                  :label="faqTopic.name"
                />
              </el-select>
              <div v-if="formError.faq_topic_id" class="el-form-item__error">{{ formError.faq_topic_id }}</div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="24" class="p-1">
            <el-form-item prop="answer">
              <label for="answer" class="FormLabel">
                <span class="FormLabel__title">ANSWER*</span>
              </label>
              <editor
                :api-key="tinymceSetup.api_key"
                :init="tinymceSetup.config"
                v-model="formData.answer"
              />
              <div v-if="formError.answer" class="el-form-item__error">{{ formError.answer }}</div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="24" class="p-1">
            <label class="FormLabel">
              <i class="fas fa-code"></i>
              <span class="FormLabel__title">Short codes</span>
            </label>
            <pre class="short_codes">:marketplace :marketplace_url</pre>
            <small>Bạn có thể sử dụng trình giữ chỗ này trong câu hỏi và câu trả lời của mình, giá trị này sẽ được thay thế bằng giá trị thực tế</small>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template v-slot:form-footer>
      <el-button v-if="!faqId" type="primary" size="mini" @click.prevent="handleActionForm(handleAdd)">
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
import { faqRules } from '@/validations';
import { mapActions } from 'vuex';
import { Message } from 'element-ui';
import Editor from '@tinymce/tinymce-vue';
import { tinymceConfig, tinymceApiKey } from '@/config/tinymce';

const defaultFormData = {
  question: '',
  faq_topic_id: '',
  answer: '',
};

const defaultFormError = {
  question: '',
  faq_topic_id: '',
  answer: '',
};

export default {
  components: {
    FormAction,
    'editor': Editor,
  },
  data() {
    return {
      formName: '',
      formData: {...defaultFormData},
      formError: {...defaultFormError},
      formRules: faqRules,
      faqId: this.$route.params.id,
      isFormLoading: false,
      faqTopics: []
    }
  },
  watch: {
    $route(to, from) {
      this.faqId = to.params.id;
      if (to.name !== 'list-faq') {
        this.formSetup();
      }
    },
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
    }
  },
  methods: {
    ...mapActions({
      'fetListFaqTopic': 'faq/fetListFaqTopic',
      'storeFaq': 'faq/storeFaq',
      'fetchFaqItemById': 'faq/fetchFaqItemById',
      'updateFaq': 'faq/updateFaq'
    }),
    async formSetup() {
      try {
        this.resetFormData();
        this.getFormName();
        this.isFormLoading = true;
        if (this.faqId) {
          const dataFaq = await this.fetchFaqItemById(this.faqId);
          this.formData = dataFaq.faq;
        }
        const dataFaqTopic = await this.fetListFaqTopic();
        this.faqTopics = dataFaqTopic.faqTopics;
        this.isFormLoading = false;
      } catch (err) {
        console.error('[App Error] => ', err);
        if (err.status === 404) {
          this.$confirm('Faq này không tồn tại, hoặc đã bị xóa trước đó !', 'Thông báo lỗi', {
            confirmButtonText: 'Quay về',
            cancelButtonText: 'Thêm mới',
            type: 'error'
          }).then(() => {
            this.back();
          }).catch(() => {
            this.back('/utility/faq/add');
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
      this.$refs['formData'].resetFields();
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
      return this.storeFaq(this.formData);
    },
    handleUpdate() {
      return this.updateFaq({ formData: this.formData, id: this.faqId });
    },
    appendErrorToForm(errors) {
      for (const [key, value] of Object.entries(errors)) {
        this.formError[key] = value[0];
      }
    },
  }
}
</script>