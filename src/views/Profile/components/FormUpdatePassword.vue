<template>
  <form-action
    :name="formName"
    :size="'550px'"
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
            <el-form-item prop="current_password">
              <label for="current_password" class="FormLabel">
                <span class="FormLabel__title">CURRENT PASSWORD*</span>
              </label>
              <el-input
                placeholder="Current password"
                type="password"
                name="current_password"
                ref="current_password"
                autocomplete="off"
                spellcheck="false"
                id="current_password"
                v-model="formData.current_password"
              />
              <div v-if="formError.current_password" class="el-form-item__error">{{ formError.current_password }}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="12" class="p-1">
            <el-form-item prop="password">
              <label for="password" class="FormLabel">
                <span class="FormLabel__title">NEW PASSWORD*</span>
              </label>
              <el-input
                placeholder="Password"
                type="password"
                name="password"
                ref="password"
                autocomplete="off"
                spellcheck="false"
                id="password"
                v-model="formData.password"
              />
              <div v-if="formError.password" class="el-form-item__error">{{ formError.password }}</div>
            </el-form-item>
          </el-col>

          <el-col :span="12" class="p-1">
            <el-form-item prop="password_confirmation">
              <label for="password_confirmation" class="FormLabel">
                <span class="FormLabel__title">CONFIRM PASSWORD *</span>
              </label>
              <el-input
                placeholder="Confirm Password"
                type="password"
                name="password_confirmation"
                ref="password_confirmation"
                autocomplete="off"
                spellcheck="false"
                id="password_confirmation"
                v-model="formData.password_confirmation"
              />
              <div v-if="formError.password_confirmation" class="el-form-item__error">{{ formError.password_confirmation }}</div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template v-slot:form-footer>
      <el-button type="primary" size="mini" @click.prevent="update()">
        <i class="PopupForm__SaveIcon fas fa-save"></i>
        <span class="PopupForm_SaveLabel">UPDATE</span>
      </el-button>
    </template>
  </form-action>
</template>

<script>
import FormAction from '@/components/FormAction';
import { updatePasswordRules } from '@/validations';
import { mapActions } from 'vuex';

const defaultFormData = {
  current_password: '',
  password: '',
  password_confirmation: ''
}

const defaultFormError = {
  current_password: '',
  password: '',
  password_confirmation: ''
}

export default {
  components: {
    FormAction,
  },
  data() {
    return {
      formName: 'UPDATE PASSWORD',
      formData: {...defaultFormData},
      formError: {...defaultFormError},
      formRules: updatePasswordRules,
      isFormLoading: false
    };
  },
  methods: {
    ...mapActions({
      'updatePassword': 'account/updatePassword'
    }),
    back() {
      this.resetFormData();
      this.$refs['formData'].resetFields();
      this.$router.push({ path: '/account/profile' });
    },
    handleCloseForm() {
      this.back();
    },
    resetFormData() {
      this.formData  = {...defaultFormData};
      this.formError = {...defaultFormError};
    },
    update() {
      this.$refs['formData'].validate(valid => {
        if (valid) {
          if (this.formData.password !== this.formData.password_confirmation) {
            return this.appendErrorToForm({password_confirmation: ['Nhập lại mật khẩu không chính xác']});
          }
          this.updatePassword(this.formData).then(res => {
            this.$message({
              message: res.success,
              type: 'success',
              duration: 5 * 1000
            });
            this.back();
          }).catch(err => {
            console.error('[App Error] => ', err);
            if (err.status === 422) {
              this.$message({
                message: 'Dữ liệu không hợp lệ, vui lòng kiễm tra lại !',
                type: 'error',
                duration: 5 * 1000
              });
            }
            this.appendErrorToForm(err.data.errors);
          });
        }
      });
    },
    appendErrorToForm(errors) {
      if (errors) {
        for (const [key, value] of Object.entries(errors)) {
          this.formError[key] = value[0];
        }
      }
    },
  }
}
</script>