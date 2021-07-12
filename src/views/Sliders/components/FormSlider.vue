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
            <el-form-item prop="description">
              <label for="description" class="FormLabel">
                <span class="FormLabel__title">TITLE</span>
                <el-tooltip class="item" effect="dark" content="Dòng này sẽ được đánh dấu trên thanh trượt. Để trống nếu bạn không muốn hiển thị tiêu đề." placement="top">
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
              <small class="highlight-note">
                <i class="fas fa-question-circle"></i>
                Bạn có thể sử dụng thẻ "span" để đánh dấu các từ quan trọng.
              </small>
              <div v-if="formError.title" class="el-form-item__error">{{ formError.title }}</div>
            </el-form-item>
          </el-col>

          <el-col :span="7" class="p-1">
            <el-form-item prop="title_color">
              <label for="title_color" class="FormLabel">
                <span class="FormLabel__title">TEXT COLOR</span>
              </label>
              <el-color-picker class="ColorPicker_fullSize w-100" v-model="formData.title_color" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="17" class="p-1">
            <el-form-item prop="sub_title">
              <label for="sub_title" class="FormLabel">
                <span class="FormLabel__title">SUB TITLE</span>
                <el-tooltip class="item" effect="dark" content="Dòng thứ hai của tiêu đề. Để trống nếu bạn không muốn hiển thị điều này." placement="top">
                  <i class="fas fa-question-circle"></i>
                </el-tooltip>
              </label>
              <el-input
                placeholder="Sub title"
                type="text"
                ref="sub_title"
                autocomplete="off"
                spellcheck="false"
                id="sub_title"
                v-model="formData.sub_title"
              />
              <small class="highlight-note">
                <i class="fas fa-question-circle"></i>
                Bạn có thể sử dụng thẻ "span" để đánh dấu các từ quan trọng.
              </small>
              <div v-if="formError.sub_title" class="el-form-item__error">{{ formError.sub_title }}</div>
            </el-form-item>
          </el-col>

          <el-col :span="7" class="p-1">
            <el-form-item prop="sub_title_color">
              <label for="sub_title_color" class="FormLabel">
                <span class="FormLabel__title">TEXT COLOR</span>
              </label>
              <el-color-picker class="ColorPicker_fullSize w-100" v-model="formData.sub_title_color" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="17" class="p-1">
            <el-form-item prop="description">
              <label for="description" class="FormLabel">
                <span class="FormLabel__title">DESCRIPTION</span>
                <el-tooltip class="item" effect="dark" content="Vài lời về thanh trượt. Để trống nếu bạn không muốn hiển thị mô tả." placement="top">
                  <i class="fas fa-question-circle"></i>
                </el-tooltip>
              </label>
              <el-input
                placeholder="Description"
                type="text"
                ref="description"
                autocomplete="off"
                spellcheck="false"
                id="description"
                v-model="formData.description"
              />
              <small class="highlight-note">
                <i class="fas fa-question-circle"></i>
                Bạn có thể sử dụng thẻ "span" để đánh dấu các từ quan trọng.
              </small>
            </el-form-item>
          </el-col>

          <el-col :span="7" class="p-1">
            <el-form-item prop="description_color">
              <label for="description_color" class="FormLabel">
                <span class="FormLabel__title">DESCRIPTION COLOR</span>
              </label>
              <el-color-picker class="ColorPicker_fullSize w-100" v-model="formData.description_color" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="17" class="p-1">
            <el-form-item prop="link">
              <label for="link" class="FormLabel">
                <span class="FormLabel__title">LINK</span>
                <el-tooltip class="item" effect="dark" content="Slider sẽ được chuyển đến đường link này" placement="top">
                  <i class="fas fa-question-circle"></i>
                </el-tooltip>
              </label>
              <el-input
                placeholder="Redirect Link"
                type="text"
                ref="link"
                autocomplete="off"
                spellcheck="false"
                id="link"
                v-model="formData.link"
              />
            </el-form-item>
          </el-col>

          <el-col :span="7" class="p-1">
            <el-form-item prop="alt_color">
              <label for="alt_color" class="FormLabel">
                <span class="FormLabel__title">ALTERNATIVE COLOR</span>
                <el-tooltip class="item" effect="dark" content="Màu sẽ được sử dụng cho văn bản bên trong các thẻ span." placement="top">
                  <i class="fas fa-question-circle"></i>
                </el-tooltip>
              </label>
              <el-color-picker class="ColorPicker_fullSize w-100" v-model="formData.alt_color" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="12" class="p-1">
            <el-form-item prop="order">
              <label for="order" class="FormLabel">
                <span class="FormLabel__title">ORDER</span>
                <el-tooltip class="item" effect="dark" content="Thanh trượt sẽ được sắp xếp theo thứ tự này." placement="top">
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

          <el-col :span="12" class="p-1">
            <el-form-item prop="text_position">
              <label for="text_position" class="FormLabel">
                <span class="FormLabel__title">TEXT POSITION</span>
                <el-tooltip class="item" effect="dark" content="Đặt vị trí nội dung của bạn trên thanh trượt. vị trí mặc định đúng" placement="top">
                  <i class="fas fa-question-circle"></i>
                </el-tooltip>
              </label>
              <el-select
                v-model="formData.text_position"
                id="text_position"
                class="w-100"
              >
                <el-option value="right" label="Right"/>
                <el-option value="left" label="Left"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="12" class="p-1">
            <el-form-item prop="featureImage">
              <label for="featureImage" class="FormLabel">
                <span class="FormLabel__title">SLIDER IMAGE*</span>
                <el-tooltip class="item" effect="dark" content="Hình ảnh chính sẽ hiển thị dưới dạng thanh trượt. Yêu cầu của nó để tạo thanh trượt." placement="top">
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
                :placeholer="'Slider image'"
                @upload="saveFeatureImage"
              />
              <div v-if="formError.feature_image" class="el-form-item__error">{{ formError.feature_image }}</div>
            </el-form-item>
          </el-col>

          <el-col :span="12" class="p-1">
            <el-form-item prop="mobileImage">
              <label for="mobileImage" class="FormLabel">
                <span class="FormLabel__title">MOBIL*</span>
                <el-tooltip class="item" effect="dark" content="Hình ảnh thanh trượt cho ứng dụng dành cho thiết bị di động. Hệ thống sẽ ẩn thanh trượt này trên thiết bị di động nếu không được cung cấp. Giữ kích thước theo tỷ lệ 2: 1, nghĩa là chiều rộng của hình ảnh phải gấp đôi chiều cao." placement="top">
                  <i class="fas fa-question-circle"></i>
                </el-tooltip>
              </label>
              <div v-if="checkImageNotEmpty(formData.mobileImage.src)" class="ImageThumb_wrap">
                <div class="thumbNail d-block">
                  <img :src="formData.mobileImage.src" alt="" />
                </div>
                <div class="confirm">
                  <el-tag type="danger">
                    <el-checkbox v-model="formData.mobileImage.isDel">
                      <small>Delete image</small>
                    </el-checkbox>
                  </el-tag>
                </div>
              </div>
              <upload-image
                :name="'UploadMobileImage'"
                :placeholer="'Mobile image'"
                @upload="saveMobileImage"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template v-slot:form-footer>
      <el-button v-if="!sliderId" type="primary" size="mini" @click.prevent="handleActionForm(handleAdd)">
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
import { sliderRules } from '@/validations';
import { mapActions } from 'vuex';

const defaultFormData = {
  title: '',
  title_color: '#333333',
  sub_title: '',
  sub_title_color: '#b5b5b5',
  description: '',
  description_color: '#b5b5b5',
  link: '',
  alt_color: '#000000',
  order: '',
  text_position: 'right',
  featureImage: {
    src: '',
    file: null,
    isDel: false
  },
  mobileImage: {
    src: '',
    file: null,
    isDel: false
  }
};

const defaultFormError = {
  title: '',
  sub_title: '',
  feature_image: ''
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
      formRules: sliderRules,
      sliderId: this.$route.params.id,
      isFormLoading: false,
    }
  },
  watch: {
    $route(to, from) {
      this.sliderId = to.params.id;
      if (to.name !== 'list-slider') {
        this.formSetup();
      }
    },
  },
  created() {
    this.formSetup();
  },
  methods: {
    ...mapActions({
      'storeSlider': 'slider/storeSlider',
      'fetchSliderItemById': 'slider/fetchSliderItemById',
      'updateSlider': 'slider/updateSlider'
    }),
    async formSetup() {
      try {
        this.resetFormData();
        this.getFormName();
        this.isFormLoading = true;
        if (this.sliderId) {
          const dataSlider = await this.fetchSliderItemById(this.sliderId);
          this.appendDataToForm(dataSlider.slider);
        }
        this.isFormLoading = false;
      } catch (err) {
        console.error('[App Error] => ', err);
        if (err.status === 404) {
          this.$confirm('Slider này không tồn tại, hoặc đã bị xóa trước đó !', 'Thông báo lỗi', {
            confirmButtonText: 'Quay về',
            cancelButtonText: 'Thêm mới',
            type: 'error'
          }).then(() => {
            this.back();
          }).catch(() => {
            this.back('/appearance/slider/add');
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
    back(router = '/appearance/slider', query = {}) {
      this.resetFormData();
      this.$refs['formData'].resetFields();
      this.$router.push({ path: router, query });
    },
    saveFeatureImage(file) {
      this.formData.featureImage.file = file;
    },
    saveMobileImage(file) {
      this.formData.mobileImage.file = file;
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
      this.formData.mobileImage.src   = '';
      this.formData.mobileImage.file  = null;
      this.formData.mobileImage.isDel = false;
    },
    handleActionForm(callback) {
      this.$refs['formData'].validate(valid => {
        if (valid) {
          if (!this.formData.featureImage.file && !this.formData.featureImage.src) {
            this.appendErrorToForm({feature_image: ['Vui lòng chọn ảnh slider']});
            return;
          }
          callback().then(res => {
            this.$message({
              message: res.success,
              type: 'success',
              duration: 5 * 1000
            });
            this.back('/appearance/slider', { form: 'success' });
          }).catch(error => {
            console.error('[App Error] => ', error);
            if (error.status === 422) {
              this.$message({
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
      return this.storeSlider(this.setFormData());
    },
    handleUpdate() {
      return this.updateSlider({ formData: this.setFormData(), id: this.sliderId });
    },
    setFormData() {
      let formData = new FormData();
      formData.append('title', this.formData.title);
      formData.append('title_color', this.formData.title_color);
      formData.append('sub_title', this.formData.sub_title);
      formData.append('sub_title_color', this.formData.sub_title_color);
      formData.append('description', this.formData.description);
      formData.append('description_color', this.formData.description_color);
      formData.append('link', this.formData.link);
      formData.append('alt_color', this.formData.alt_color);
      formData.append('order', this.formData.order);
      formData.append('text_position', this.formData.text_position);
      if (this.formData.featureImage.file) {
        formData.append('images[feature]', this.formData.featureImage.file);
      }
      if (this.formData.mobileImage.file) {
        formData.append('images[mobile]', this.formData.mobileImage.file);
      }
      if (this.formData.featureImage.isDel) {
        formData.append('delete_image[feature]', '1');
      }
      if (this.formData.mobileImage.isDel) {
        formData.append('delete_image[mobile]', '1');
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
      this.formData.title_color = data.title_color || '';
      this.formData.sub_title = data.sub_title || '';
      this.formData.sub_title_color = data.sub_title_color || '';
      this.formData.description = data.description || '';
      this.formData.description_color = data.description_color || '';
      this.formData.link = data.link || '';
      this.formData.alt_color = data.alt_color || '';
      this.formData.order = data.order || '';
      this.formData.text_position = data.text_position || '';
      this.formData.featureImage.src = data.feature_image || '';
      this.formData.mobileImage.src = data.mobile_image || '';
    },
    checkImageNotEmpty(img) {
      if (img && !(img.split('?text=')[1] === 'No_Image_Found')) {
        return true;
      } return false;
    }
  }
}
</script>