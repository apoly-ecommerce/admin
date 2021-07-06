<template>
  <section class="PageProfile">
    <page-table-content :tableName="tableName">
      <template v-slot:main-content>
        <el-row :gutter="5">
          <el-col :span="6" class="p-1 tab-1">
            <form-update-avatar
              :avatar="imgFormData.avatar"
              @success="formSetup"
            />
          </el-col>
          <el-col :span="10" class="p-1 tab-2">
            <form-update-profile
              :profile="formData"
              @success="formSetup"
            />
          </el-col>
          <el-col :span="8" class="p-1 tab-3">
            <el-row :gutter="5">
              <el-col :span="24" class="p-1">
                <div style="margin-bottom: 10px">
                  <comp-address
                    :addressableType="'user'"
                    :addressableId="profileId"
                    :redirect="'/account/profile'"
                    :address="sFormData.primary_address"
                  />
                </div>
              </el-col>
              <el-col :span="24" class="p-1">
                <el-button class="d-block" type="primary" size="mini" @click="handleUpdatePassword">
                  <i class="fas fa-lock"></i>
                  <small>CHANGE PASSWORD</small>
                </el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </template>
    </page-table-content>
  </section>
</template>

<script>
import PageTableContent from '@/components/PageTableContent';
import FormUpdateAvatar from './components/FormUpdateAvatar';
import FormUpdateProfile from './components/FormUpdateProfile';
import CompAddress from '@/components/CompAddress';
import { mapActions } from 'vuex';

const defaultFormData = {
  name: '',
  nice_name: '',
  email: '',
  dob: '',
  sex: '',
  description: '',
};

const secondFormData = {
  primaryAddress: null
};

const imageFormData = {
  avatar: {
    src: '',
    file: null,
    isDel: false
  }
};

export default {
  components: {
    PageTableContent,
    FormUpdateAvatar,
    FormUpdateProfile,
    'comp-address': CompAddress
  },
  data() {
    return {
      profileId: null,
      tableName: 'Profile',
      formData: {...defaultFormData},
      sFormData: {...secondFormData},
      imgFormData: {...imageFormData},
      formRules: {}
    }
  },
  created() {
    this.formSetup();
  },
  methods: {
    ...mapActions({
      'setIsLoading': 'app/handleSetIsLoading',
      'profile': 'account/profile'
    }),
    async formSetup() {
      this.setIsLoading(true);
      const dataProfile = await this.profile();
      this.appendDataToForm(dataProfile.profile);
      this.setIsLoading(false);
    },
    handleUpdatePassword() {},
    appendDataToForm(data) {
      this.profileId = +data.id;
      this.imgFormData.avatar.src = data.image;
      this.formData.name = data.name;
      this.formData.nice_name = data.nice_name;
      this.formData.email = data.email;
      this.formData.dob = data.dob;
      this.formData.sex = data.sex;
      this.formData.role_name = data.role_name;
      this.formData.description = data.description;
      this.sFormData.primary_address = data.primary_address;
    }
  }
}
</script>
<style>
.PageProfile {
  color: #333;
}
.PageProfile .tab-1 {
  padding-right: 25px!important;
}
.PageProfile .tab-3 {
  padding-left: 25px!important;
}
.PageProfile .el-form-item {
  margin-bottom: 10px;
}
.PageProfile .el-form-item__content {
  line-height: 1.2;
}
.PageProfile .FormLabel {
  text-transform: uppercase;
  font-size: .8rem;
  margin-bottom: 5px;
}
.PageProfile .el-input__inner {
  height: 36px;
  border-radius: 3px;
  border: 1px solid #DCDFE6;
}
.PageProfile .el-input__inner:disabled {
  color: #515151;
}
.PageProfile .heading {
  margin-bottom: 5px;
}
.PageProfile .thumbAvatar {
  display: block;
  border: 1px solid #DCDFE6;
  border-radius: 3px;
  padding: 5px;
  width: 100%;
  height: 400px;
  margin-bottom: 5px;
}
.PageProfile .uploader_button {
  font-size: .9rem;
}
</style>