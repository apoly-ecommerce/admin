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
                  <comp-address-control
                    :addressableType="'user'"
                    :addressableId="profileId"
                    :redirect="'/account/profile'"
                    :address="primaryAddress"
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
import CompAddressControl from '@/components/CompAddressControl';
import { mapActions } from 'vuex';

const defaultFormData = {
  name: '',
  nice_name: '',
  email: '',
  dob: '',
  sex: '',
  description: '',
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
    'comp-address-control': CompAddressControl
  },
  data() {
    return {
      profileId: null,
      tableName: 'Profile',
      formData: {...defaultFormData},
      imgFormData: {...imageFormData},
      primaryAddress: null,
      formRules: {}
    }
  },
  watch: {
    $route() {
      this.reRenderDataFromUrl();
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
      try {
        this.setIsLoading(true);
        const dataProfile = await this.profile();
        this.appendDataToForm(dataProfile.profile);
        this.setIsLoading(false);
        return true;
      } catch (err) {
        console.error('[App Error] => ', error);
        this.$message.error('Có lỗi trong quá trình tải dữ liệu !');
      }
    },
    handleUpdatePassword() {
      this.$router.push({
        name: 'profile-update-password',
      });
    },
    async appendDataToForm(data) {
      this.profileId = +data.id;
      this.imgFormData.avatar.src = data.image;
      this.formData.name = data.name;
      this.formData.nice_name = data.nice_name;
      this.formData.email = data.email;
      this.formData.dob = data.dob;
      this.formData.sex = data.sex;
      this.formData.role_name = data.role_name;
      this.formData.description = data.description;
      this.primaryAddress = data.primary_address;
    },
    async reRenderDataFromUrl() {
      if (this.$route.query.form === 'success') {
        this.formSetup().then(() => {
          let query = Object.assign({}, this.$route.query);
          delete query.form;
          this.$router.replace({ query });
        });
      };
    },
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