<template>
  <div>
    <div class="heading">Avatar</div>
    <div class="thumbAvatar">
      <img class="w-100 h-100" :src="avatar.src" alt="Avatar">
    </div>
    <template v-if="!checkImageNotEmpty(avatar.src)">
      <upload-image
        :name="'UploadAvatarImage'"
        :placeholer="'User Avatar'"
        @upload="saveAvatarFile"
      />
      <el-button v-if="avatar.file" type="primary" size="mini" class="w-100" style="margin-top: 10px;" @click.prevent="handleUpdate">
        <i class="PopupForm__SaveIcon fas fa-save"></i>
        <span class="PopupForm_SaveLabel">UPDATE AVATAR</span>
      </el-button>
    </template>
    <el-button v-else type="danger" size="mini" class="w-100" style="margin-top: 10px;" @click.prevent="handleDelete">
      <i class="PopupForm__SaveIcon fas fa-save"></i>
      <span class="PopupForm_SaveLabel">DELETE AVATAR</span>
    </el-button>
  </div>
</template>

<script>
import UploadImage from '@/components/UploadImage';
import { mapActions } from 'vuex';

export default {
  name: 'form-update-avatar',
  components: {
    UploadImage
  },
  props: {
    avatar: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    ...mapActions({
      'updateAvatar': 'account/updateAvatar',
      'deleteAvatar': 'account/deleteAvatar'
    }),
    saveAvatarFile(file) {
      this.avatar.file = file;
    },
    handleUpdate() {
      this.updateAvatar(this.setFormData())
      .then(res => {
        this.$message({
          message: res.success,
          type: 'success',
          duration: 5 * 1000
        });
        this.$emit('success');
        this.resetFormData();
      })
      .catch(err => {
        console.error('[App Error] => ', err);
        this.$message.error('Cập nhật avatar không thành công !');
      });
    },
    handleDelete() {
      this.$confirm('Xác nhận xóa avatar ?', 'Xác nhận', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        this.deleteAvatar().then(res => {
          this.$message({
            message: res.success,
            type: 'success',
            duration: 5 * 1000
          });
          this.$emit('success');
          this.resetFormData();
        }).catch(err => {
          console.error('[App Error] => ', err);
          this.$message.error('Xóa avatar không thành công !');
        });
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: 'Đã hủy xóa avatar !'
        });
      });
    },
    resetFormData() {
      this.$props.avatar.file = null;
    },
    setFormData() {
      let formData = new FormData();
      formData.append('image', this.avatar.file);
      return formData;
    },
    checkImageNotEmpty(img) {
      if (img && !(img.split('?text=')[1] === 'No_Image_Found')) {
        return true;
      } return false;
    }
  }
}
</script>