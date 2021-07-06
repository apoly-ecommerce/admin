<template>
  <el-form
    ref="profile"
    :model="profile"
    :rules="formRules"
    @submit.prevent
  >
    <el-row :gutter="5">
      <el-col :span="24" class="p-1">
        <el-form-item prop="name">
          <label for="name" class="FormLabel">
            <span class="FormLabel__title">FULL NAME *</span>
          </label>
          <el-input
            placeholder="Enter full name"
            type="text"
            ref="name"
            autocomplete="off"
            spellcheck="false"
            id="name"
            v-model="profile.name"
          />
        </el-form-item>
      </el-col>

      <el-col :span="24" class="p-1">
        <el-form-item prop="nice_name">
          <label for="nice_name" class="FormLabel">
            <span class="FormLabel__title">NICE NAME</span>
          </label>
          <el-input
            placeholder="Enter nice name"
            type="text"
            ref="nice_name"
            autocomplete="off"
            spellcheck="false"
            id="nice_name"
            v-model="profile.nice_name"
          />
        </el-form-item>
      </el-col>

      <el-col :span="24" class="p-1">
        <el-form-item prop="role">
          <label for="role" class="FormLabel">
            <span class="FormLabel__title">ROLE</span>
          </label>
          <el-input
            placeholder="Enter nice name"
            type="text"
            ref="role"
            disabled
            autocomplete="off"
            spellcheck="false"
            id="role"
            :value="profile.role_name"
          />
        </el-form-item>
      </el-col>

      <el-col :span="24" class="p-1">
        <el-form-item prop="email">
          <label for="email" class="FormLabel">
            <span class="FormLabel__title">EMAIL ADDRESS *</span>
          </label>
          <el-input
            placeholder="Enter a valid email address"
            type="text"
            ref="email"
            autocomplete="off"
            spellcheck="false"
            id="email"
            v-model="profile.email"
          />
        </el-form-item>
      </el-col>

      <el-col :span="24" class="p-1">
        <el-form-item prop="dob">
          <label for="dob" class="FormLabel">
            <span class="FormLabel__title">DATE OF BIRTH</span>
          </label>
          <el-date-picker
            v-model="profile.dob"
            type="date"
            class="w-100"
            format="dd-MM-yyyy"
            placeholder="Date of birth"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>

      <el-col :span="24" class="p-1">
        <el-form-item prop="sex">
          <label for="gender" class="FormLabel">
            <span class="FormLabel__title">GENDER</span>
          </label>
          <el-select class="w-100" v-model="profile.sex" placeholder="Gender">
            <el-option label="Male" value="male"/>
            <el-option label="Female" value="female"/>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="24" class="p-1">
        <el-form-item prop="24" class="p-1">
          <label for="description" class="FormLabel">
            <span class="FormLabel__title">BIOGRAPHY</span>
          </label>
          <el-input
            type="textarea"
            ref="description"
            placeholder="Start from here"
            v-model="profile.description"
            maxlength="500"
            spellcheck="false"
            id="description"
            show-word-limit
          />
        </el-form-item>
      </el-col>

      <el-col :span="24" class="p-1">
        <el-button type="primary" size="mini" @click.prevent="handleUpdateProfile">
          <i class="PopupForm__SaveIcon fas fa-save"></i>
          <span class="PopupForm_SaveLabel">UPDATE</span>
        </el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { profileRules } from '@/validations';
import { mapActions } from 'vuex';
import moment from 'moment';

export default {
  name: 'form-update-profile',
  props: {
    profile: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formRules: profileRules
    }
  },
  methods: {
    ...mapActions({
      'updateProfile': 'account/updateProfile'
    }),
    handleUpdateProfile() {
      this.updateProfile(this.setFormData())
      .then(res => {
        this.$message({
          message: res.success,
          type: 'success',
          duration: 5 * 1000
        });
        this.$emit('success');
      })
      .catch(err => {
        console.error('[App Error] => ', err);
        this.$message.error('Cập nhật profile không thành công !')
      })
    },
    setFormData() {
      if (this.profile.dob) {
        this.profile.dob = moment(this.profile.dob).format('YYYY-MM-DD');
      }
      return this.profile;
    }
  }
}
</script>