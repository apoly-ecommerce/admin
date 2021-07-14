<template>
  <form-action
    :name="formName"
    :size="'900px'"
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
          <el-col :span="18" class="p-1">
            <el-row :gutter="5">
              <el-col :span="24" class="p-1">
                <el-form-item prop="title">
                  <label for="title" class="FormLabel">
                    <span class="FormLabel__title">TITLE</span>
                    <el-tooltip class="item" effect="dark" content="Dòng này sẽ được đánh dấu trên biểu ngữ. Để trống nếu bạn không muốn hiển thị tiêu đề." placement="top">
                      <i class="fas fa-question-circle"></i>
                    </el-tooltip>
                  </label>
                  <el-input
                    placeholder="Title"
                    type="text"
                    ref="title"
                    autocomplete="off"
                    spellcheck="false"
                    id="title"
                    v-model="formData.title"
                  />
                  <div v-if="formError.title" class="el-form-item__error">{{ formError.title }}</div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="5">
              <el-col :span="24" class="p-1">
                <el-form-item prop="description">
                  <label for="description" class="FormLabel">
                    <span class="FormLabel__title">DESCRIPTION</span>
                    <el-tooltip class="item" effect="dark" content="(Ví dụ: Giảm giá 50%!) Để trống nếu bạn không muốn hiển thị điều này." placement="top">
                      <i class="fas fa-question-circle"></i>
                    </el-tooltip>
                  </label>
                  <el-input
                    type="textarea"
                    ref="description"
                    placeholder="40% Off!, Free Shipping"
                    v-model="formData.description"
                    maxlength="500"
                    spellcheck="false"
                    id="description"
                    show-word-limit
                  />
                  <div v-if="formError.description" class="el-form-item__error">{{ formError.description }}</div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="5">
              <el-col :span="12" class="p-1">
                <el-form-item prop="link">
                  <label for="link" class="FormLabel">
                    <span class="FormLabel__title">LINK *</span>
                    <el-tooltip class="item" effect="dark" content="Người dùng sẽ chuyển hướng đến liên kết này." placement="top">
                      <i class="fas fa-question-circle"></i>
                    </el-tooltip>
                  </label>
                  <el-input
                    placeholder="Redirect Link"
                    type="link"
                    name="link"
                    ref="link"
                    autocomplete="off"
                    spellcheck="false"
                    id="link"
                    v-model="formData.link"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="12" class="p-1">
                <el-form-item prop="link_label">
                  <label for="link_label" class="FormLabel">
                    <span class="FormLabel__title">LINK LABEL</span>
                    <el-tooltip class="item" effect="dark" content="Nhãn của nút liên kết" placement="top">
                      <i class="fas fa-question-circle"></i>
                    </el-tooltip>
                  </label>
                  <el-input
                    placeholder="Shop Now"
                    type="link_label"
                    name="link_label"
                    ref="link_label"
                    autocomplete="off"
                    spellcheck="false"
                    id="link_label"
                    v-model="formData.link_label"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="5">
              <el-col :span="8" class="p-1">
                <el-form-item prop="link">
                  <label for="link" class="FormLabel">
                    <span class="FormLabel__title">GROUP *</span>
                    <el-tooltip class="item" effect="dark" content="Vị trí của biểu ngữ trên mặt tiền cửa hàng. Biểu ngữ sẽ không hiển thị nếu nhóm không được chỉ định." placement="top">
                      <i class="fas fa-question-circle"></i>
                    </el-tooltip>
                  </label>
                  <el-select
                    v-model="formData.group_id"
                    ref="group_id"
                    placeholder="Select"
                    class="w-100"
                  >
                    <el-option
                      v-for="bannerGroup in bannerGroups"
                      :key="bannerGroup.id"
                      :label="bannerGroup.name"
                      :value="bannerGroup.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="8" class="p-1">
                <el-form-item prop="columns">
                  <label for="columns" class="FormLabel">
                    <span class="FormLabel__title">COLUMNS</span>
                    <el-tooltip class="item" effect="dark" content="Biểu ngữ này sẽ sử dụng bao nhiêu cột? Hệ thống sử dụng hệ thống lưới 12 cột để hiển thị banner." placement="top">
                      <i class="fas fa-question-circle"></i>
                    </el-tooltip>
                  </label>
                  <el-select
                    v-model="formData.columns"
                    ref="columns"
                    placeholder="Select"
                    class="w-100"
                  >
                    <el-option
                      v-for="column in columns"
                      :key="column"
                      :label="column"
                      :value="column">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="8" class="p-1">
                <el-form-item prop="link_label">
                  <label for="link_label" class="FormLabel">
                    <span class="FormLabel__title">ORDER</span>
                    <el-tooltip class="item" effect="dark" content="Số này sẽ được dùng để sắp xếp thứ tự xem trong nhóm các biểu ngữ. Số nhỏ nhất sẽ hiển thị đầu tiên." placement="top">
                      <i class="fas fa-question-circle"></i>
                    </el-tooltip>
                  </label>
                  <el-input-number class="w-100"
                    v-model="formData.order"
                    size="medium"
                    :min="1"
                    :max="99"
                    ref="order"
                    id="order"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="5">
              <el-col :span="24" class="p-1">
                <el-form-item prop="featureImage">
                  <label for="featureImage" class="FormLabel">
                    <span class="FormLabel__title">BANNER IMAGE *</span>
                    <el-tooltip class="item" effect="dark" content="Hình ảnh chính sẽ hiển thị trên nền. Thường sử dụng một hình ảnh sản phẩm." placement="top">
                      <i class="fas fa-question-circle"></i>
                    </el-tooltip>
                  </label>
                  <div v-if="checkImageNotEmpty(formData.featureImage.src)" class="ImageThumb_wrap">
                    <div class="thumbNail d-block">
                      <img :src="formData.featureImage.src" alt="" />
                    </div>
                    <div class="confirm">
                      <el-tag type="danger">
                        <el-checkbox v-model="formData.featureImage.isDel">
                          <small>Delete image</small>
                        </el-checkbox>
                      </el-tag>
                    </div>
                  </div>
                  <upload-image
                    :name="'UploadFeatureImage'"
                    :placeholer="'Banner image'"
                    @upload="saveFeatureImage"
                  />
                  <div v-if="formError.feature_image" class="el-form-item__error">{{ formError.feature_image }}</div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="5">
              <el-col :span="24" class="p-1">
                <el-form-item prop="bg_color">
                  <label for="bg_color" class="FormLabel">
                    <span class="FormLabel__title">BACKGROUND</span>
                    <el-tooltip class="item" effect="dark" content="Chọn màu hoặc tải hình ảnh lên làm nền." placement="top">
                      <i class="fas fa-question-circle"></i>
                    </el-tooltip>
                  </label>
                  <el-color-picker class="ColorPicker_fullSize w-100" v-model="formData.bg_color" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6" class="p-1">
            <div style="height: 467px; padding-left: 30px;" class="w-100">
              <img class="w-100 h-100" src="@/assets/images/banner_layout.jpg" alt="">
            </div>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template v-slot:form-footer>
      <el-button v-if="!bannerId" type="primary" size="mini" @click.prevent="handleActionForm(handleAdd)">
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
import UploadImage from '@/components/UploadImage';
import { bannerRules } from '@/validations';
import { mapActions } from 'vuex';

const defaultFormData = {
  title: '',
  description: '',
  link: '',
  link_label: '',
  group_id: '',
  columns: '',
  order: '',
  bg_color: '#ffffff',
  featureImage: {
    src: '',
    file: null,
    isDel: false
  },
};

const defaultFormError = {
  feature_image: '',
  title: '',
  description: '',
};

export default {
  components: {
    FormAction,
    UploadImage
  },
  data() {
    return {
      formName: '',
      formData: {...defaultFormData},
      formError: {...defaultFormError},
      formRules: bannerRules,
      bannerId: this.$route.params.id,
      isFormLoading: false,
      bannerGroups: [],
      columns: [ 4, 6, 8, 12 ]
    }
  },
  watch: {
    $route(to, from) {
      this.bannerId = to.params.id;
      if (to.name !== 'list-banner') {
        this.formSetup();
      }
    },
  },
  created() {
    this.formSetup();
  },
  methods: {
    ...mapActions({
      'setupFormBanner': 'banner/setupFormBanner',
      'storeBanner': 'banner/storeBanner',
      'fetchBannerItemById': 'banner/fetchBannerItemById',
      'updateBanner': 'banner/updateBanner'
    }),
    async formSetup() {
      try {
        this.resetFormData();
        this.getFormName();
        this.isFormLoading = true;
        if (this.bannerId) {
          const dataBanner = await this.fetchBannerItemById(this.bannerId);
          this.appendDataToForm(dataBanner.banner);
        }
        const dataSetup = await this.setupFormBanner();
        this.bannerGroups = dataSetup.bannerGroups;
        this.isFormLoading = false;
      } catch (err) {
        console.error('[App Error] => ', err);
        if (err.status === 404) {
          this.$confirm('Banner này không tồn tại, hoặc đã bị xóa trước đó !', 'Thông báo lỗi', {
            confirmButtonText: 'Quay về',
            cancelButtonText: 'Thêm mới',
            type: 'error'
          }).then(() => {
            this.back();
          }).catch(() => {
            this.back('/appearance/banner/add');
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
    back(router = '/appearance/banner', query = {}) {
      this.resetFormData();
      this.$refs['formData'].resetFields();
      this.$router.push({ path: router, query });
    },
    saveFeatureImage(file) {
      this.formData.featureImage.file = file;
    },
    handleCloseForm() {
      this.back();
    },
    resetFormData() {
      this.formData  = {...defaultFormData};
      this.formError = {...defaultFormError};
      this.formData.featureImage.src   = '';
      this.formData.featureImage.file  = null;
      this.formData.featureImage.isDel = false;
    },
    handleActionForm(callback) {
      this.$refs['formData'].validate(valid => {
        if (valid) {
          if (!this.formData.featureImage.file && !this.formData.featureImage.src) {
            return this.appendErrorToForm({feature_image: ['Vui lòng chọn ảnh banner']});
          }
          callback().then(res => {
            this.$message({
              message: res.success,
              type: 'success',
              duration: 5 * 1000
            });
            this.back('/appearance/banner', { form: 'success' });
          }).catch(err => {
            console.error('[App Error] => ', error);
            if (error.status === 422) {
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
    handleAdd() {
      return this.storeBanner(this.setFormData());
    },
    handleUpdate() {
      return this.updateBanner({ formData: this.setFormData(), id: this.bannerId });
    },
    setFormData() {
      let formData = new FormData();
      formData.append('title', this.formData.title);
      formData.append('description', this.formData.description);
      formData.append('link', this.formData.link);
      formData.append('link_label', this.formData.link_label);
      formData.append('group_id', this.formData.group_id);
      formData.append('columns', this.formData.columns);
      formData.append('order', this.formData.order);
      formData.append('bg_color', this.formData.bg_color);
      if (this.formData.featureImage.file) {
        formData.append('images[feature]', this.formData.featureImage.file);
      }
      if (this.formData.featureImage.isDel) {
        formData.append('delete_image[feature]', '1');
      }
      return formData;
    },
    appendErrorToForm(errors) {
      for (const [key, value] of Object.entries(errors)) {
        this.formError[key] = value[0];
      }
    },
    appendDataToForm(data) {
      this.formData.title = data.title || '';
      this.formData.description = data.description || '';
      this.formData.link = data.link || '';
      this.formData.link_label = data.link_label || '';
      this.formData.group_id = data.group_id || '';
      this.formData.columns = data.columns || '';
      this.formData.order = data.order || '';
      this.formData.bg_color = data.bg_color || '';
      this.formData.featureImage.src = data.feature_image || '';
    },
    checkImageNotEmpty(img) {
      if (img && !(img.split('?text=')[1] === 'No_Image_Found')) {
        return true;
      } return false;
    }
  }
}
</script>