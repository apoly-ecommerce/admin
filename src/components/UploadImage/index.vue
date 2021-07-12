<template>
  <div class="UploadImages_wrap">
    <div class="UploadImage__Input">
      <label :for="name" class="uploader_label">
        <input ref="imgFileName" type="text" :placeholder="placeholer" :value="fileName" disabled class="uploader_input_preview">
        <el-button v-if="!fileName" size="mini" type="primary" class="el-icon-upload2 btn-control"/>
        <el-button v-else size="mini" type="danger" @click="handleClearFile" class="el-icon-close btn-control"/>
        <input @change="beforeUploadImage" type="file" :id="name" class="uploader_input_file">
      </label>
      <small v-if="caption" class="caption">{{ caption }}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'upload-image',
  props: {
    name: { type: String, required: true },
    placeholer: { type: String, default: 'Upload Image' },
    extAllow: { type: Array, default: () => { return ['jpg', 'png', 'jpeg', 'gif'] } },
    sizeAllow: { type: Number, default: 500000 },
    caption: { type: String, default: null }
  },
  data() {
    return {
      fileName: ''
    };
  },
  watch: {
    $route() {
      this.fileName = '';
      this.$refs['imgFileName'].value = '';
      this.$emit('upload', null);
    }
  },
  methods: {
    beforeUploadImage(e) {
      const file = e.target.files[0];
      if (this.verifyFile(file)) {
        this.fileName = file.name;
        this.$emit('upload', file);
      };
    },
    verifyFile(file) {
      const ext  = file.name.split('.').pop();
      const size = file.size;
      if (this.extAllow.indexOf(ext) === -1) {
        this.$message.error(`File ảnh không hợp lệ chỉ chấp nhận ${this.extAllow.join(', ')}`);
        return;
      }
      if (size > this.sizeAllow) {
        this.$message.error(`Size ảnh quá lớn, tối đa ${this.sizeAllow/1024}KB`);
        return;
      }
      return true;
    },
    handleClearFile() {
      this.fileName = '';
      this.$refs['imgFileName'].value = '';
      this.$emit('upload', null);
    }
  }
}
</script>
<style scoped>
.UploadImage__Input {
  display: block;
  width: 100%;
}

.UploadImage__Input .uploader_label {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.UploadImage__Input .uploader_input_preview {
  width: 100%;
  margin-right: 5px;
  padding: 0px 10px;
  font-size: .8rem;
  border: 1px solid #DCDFE6;
  border-radius: 3px;
  height: 29px;
}
.btn-control {
  height: 29px;
}
.UploadImage__Input .uploader_button {
  width: 22%;
  border: 1px solid #2196f3;
  background-color: #2196f3;
  text-transform: uppercase;
  color: #fff;
  padding: 6px 0;
  border-radius: 3px;
}
.UploadImage__Input .uploader_input_file {
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  top: 0;
  left: 0;
  opacity: 0;
}
.UploadImages_wrap .caption {
  font-size: .7rem;
}
.el-icon-close {
  position: relative;
  z-index: 1;
}
</style>