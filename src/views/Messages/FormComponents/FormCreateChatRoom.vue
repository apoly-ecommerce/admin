<template>
  <div class="FormCreateGroup">
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
              <el-form-item label="Tên nhóm" prop="name">
                <el-input
                  placeholder="Nhập tên nhóm..."
                  type="text"
                  ref="name"
                  autocomplete="off"
                  spellcheck="false"
                  id="name"
                  v-model="formData.name"
                />
              </el-form-item>
            </el-col>

            <el-col :span="24" class="p-1">
              <el-form-item label="Mời user vào nhóm" prop="user_list">
                <el-select
                  v-model="formData.user_list"
                  class="w-100"
                  multiple
                  filterable
                  allow-create
                  spellcheck="false"
                  default-first-option
                  placeholder="Tìm kiếm user">
                  <el-option
                    v-for="friend in friends"
                    :key="friend.id"
                    :label="`${friend.name} (${friend.role ? friend.role.name : 'Super Admin'})`"
                    :value="friend.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="24" class="p-1">
              <el-form-item label="Mô tả nhóm" prop="description">
                <el-input
                  type="textarea"
                  ref="description"
                  placeholder="Mô tả hoặt động của nhóm"
                  v-model="formData.description"
                  maxlength="500"
                  spellcheck="false"
                  id="description"
                  show-word-limit
                />
              </el-form-item>
            </el-col>

            <el-col :span="24" class="p-1">
              <el-form-item label="Ảnh đại diện" prop="avatarImage">
                <div v-if="checkImageNotEmpty(formData.avatarImage.src)" class="ImageThumb_wrap">
                  <div class="thumbNail d-block">
                    <img :src="formData.avatarImage.src" alt="" />
                  </div>
                  <div class="confirm">
                    <el-tag type="danger">
                      <el-checkbox v-model="formData.avatarImage.isDel">
                        <small>Xóa ảnh</small>
                      </el-checkbox>
                    </el-tag>
                  </div>
                </div>
                <upload-image
                  :name="'UploadAvatarImage'"
                  :placeholer="'Ảnh đại diện nhóm'"
                  @upload="saveAvatarImage"
                />
              </el-form-item>
              </el-col>
          </el-row>
        </el-form>
      </template>

      <template v-slot:form-footer>
        <el-button type="primary" size="mini" @click.prevent="handleCreate()">
          <i class="PopupForm__SaveIcon fas fa-save"></i>
          <span class="PopupForm_SaveLabel">Tạo nhóm</span>
        </el-button>
      </template>
    </form-action>
  </div>
</template>

<script>
import FormAction from '@/components/FormAction';
import UploadImage from '@/components/UploadImage';
import { userGroupRules } from '@/validations';
import { mapGetters, mapActions } from 'vuex';

const defaultFormData = {
  name: '',
  user_list: [],
  description: '',
  avatarImage: {
    src: '',
    file: null,
    isDel: false
  },
}

const defaultFormError = {};

export default {
  components: {
    FormAction,
    UploadImage
  },
  data() {
    return {
      formName: 'Tạo nhóm',
      formData: Object.assign({}, defaultFormData),
      formError: Object.assign({}, defaultFormError),
      formRules: userGroupRules,
      isFormLoading: false,
      friends: []
    }
  },
  watch: {
    $route(to, from) {
      if (to.name !== 'list-message') {
        this.formSetup();
      }
    }
  },
  created() {
    this.formSetup();
  },
  computed: {
    ...mapGetters({
      'userAuth': 'auth/getUserAuth'
    })
  },
  methods: {
    ...mapActions({
      'fetchConvListFriends': 'message/fetchConvListFriends',
      'storeChatRoom': 'message/storeChatRoom',
    }),
    async formSetup() {
      try {
        this.isFormLoading = true;
        this.resetFormData();
        const dataFriend = await this.fetchConvListFriends();
        this.friends = dataFriend.friends
        this.isFormLoading = false;
      } catch (err) {
        console.error('[App Error] => ', err);
      }
    },
    resetFormData() {
      this.formData  = Object.assign({}, defaultFormData);
      this.formError = Object.assign({}, defaultFormError);
    },
    back(router = '/support/message', query = {}) {
      this.resetFormData();
      this.$refs['formData'].resetFields();
      this.$router.push({ path: router, query });
    },
    handleCloseForm() {
      this.back();
    },
    handleCreate() {
      this.$refs['formData'].validate(valid => {
        if (valid) {
          this.storeChatRoom(this.setFormData())
          .then(res => {
            this.$message({
              message: res.success,
              type: 'success',
              duration: 5 * 1000
            });
            this.back('/support/message', { form: 'success' });
          })
          .catch(err => {
            console.error('[App Error] => ', err);
            if (error.status === 422) {
              this.$message({
                message: 'Dữ liệu không hợp lệ, vui lòng kiễm tra lại !',
                type: 'error',
                duration: 5 * 1000
              });
              this.appendErrorToForm(err.data.errors);
            }
          });
        }
      });
    },
    setFormData() {
      let formData = new FormData();
      formData.append('name', this.formData.name);
      if (this.formData.user_list.length) {
        for (let i=0;i<this.formData.user_list.length;i++) {
          formData.append('user_list[]', this.formData.user_list[i]);
        }
        formData.append('user_list[]', this.userAuth.id);
      }
      formData.append('description', this.formData.description);
      if (this.formData.avatarImage.file) {
        formData.append('image', this.formData.avatarImage.file);
      }
      if (this.formData.avatarImage.isDel) {
        formData.append('delete_avatar', '1');
      }
      return formData;
    },
    saveAvatarImage(file) {
      this.formData.avatarImage.file = file;
    },
    checkImageNotEmpty(img) {
      if (img && !(img.split('?text=')[1] === 'No_Image_Found')) {
        return true;
      } return false;
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
<style>
.el-form-item__label {
  float: none!important;
}
</style>