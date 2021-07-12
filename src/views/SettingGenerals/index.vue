<template>
  <section v-if="isLoaded" class="PageSettingGeneral">
    <section class="MultipleTabs_Content">
      <el-tabs type="border-card">
        <el-tab-pane>
          <div class="tab-pane-label" slot="label"><i class="fas fa-cubes"></i> General settings</div>
          <div class="content">
            <el-form
              ref="formData"
              :model="formData"
              :rules="formRules"
              @submit.prevent
            >
              <el-row :gutter="5">
                <el-col :span="17" class="p-1">
                  <el-row :gutter="5">
                    <el-col :span="6" class="p-1" style="text-align: right;">
                      <label for="name" class="FormLabel">
                        <span class="FormLabel__title">*SHOP NAME:</span>
                      </label>
                    </el-col>
                    <el-col :span="18" class="p-1">
                      <el-form-item prop="name">
                        <el-input
                          placeholder="Shop name"
                          type="text"
                          ref="name"
                          autocomplete="off"
                          spellcheck="false"
                          id="name"
                          v-model="formData.name"
                        >
                          <el-tooltip slot="append" class="item" effect="dark" content="Thương hiệu hoặc tên hiển thị của cửa hàng" placement="top">
                            <i class="fas fa-question-circle"></i>
                          </el-tooltip>
                        </el-input>
                        <div v-if="formError.name" class="el-form-item__error">{{ formError.name }}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="5">
                    <el-col :span="6" class="p-1" style="text-align: right;">
                      <label for="name" class="FormLabel">
                        <span class="FormLabel__title">SHOP URL:</span>
                      </label>
                    </el-col>
                    <el-col :span="18" class="p-1">
                      <el-form-item prop="legal_name">
                        <small>http://127.0.0.1:2003/shop/nh-hng</small>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="5">
                    <el-col :span="6" class="p-1" style="text-align: right;">
                      <label for="legal_name" class="FormLabel">
                        <span class="FormLabel__title">*LEGAL NAME:</span>
                      </label>
                    </el-col>
                    <el-col :span="18" class="p-1">
                      <el-form-item prop="legal_name">
                        <el-input
                          placeholder="Legal name"
                          type="text"
                          ref="legal_name"
                          autocomplete="off"
                          spellcheck="false"
                          id="legal_name"
                          v-model="formData.legal_name"
                        >
                          <el-tooltip slot="append" class="item" effect="dark" content="Tên pháp lý của doanh nghiệp" placement="top">
                            <i class="fas fa-question-circle"></i>
                          </el-tooltip>
                        </el-input>
                        <div v-if="formError.legal_name" class="el-form-item__error">{{ formError.legal_name }}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="5">
                    <el-col :span="6" class="p-1" style="text-align: right;">
                      <label for="email" class="FormLabel">
                        <span class="FormLabel__title">*EMAIL ADDRESS:</span>
                      </label>
                    </el-col>
                    <el-col :span="18" class="p-1">
                      <el-form-item prop="email">
                        <el-input
                          placeholder="Enter a valid email address"
                          type="text"
                          ref="email"
                          autocomplete="off"
                          spellcheck="false"
                          id="email"
                          v-model="formData.email"
                        >
                          <el-tooltip slot="append" class="item" effect="dark" content="Tất cả các thông báo sẽ được gửi đến địa chỉ email này (hàng tồn kho, đơn đặt hàng, vé, tranh chấp, v.v.) chấp nhận email hỗ trợ khách hàng (nếu được đặt)" placement="top">
                            <i class="fas fa-question-circle"></i>
                          </el-tooltip>
                        </el-input>
                        <div v-if="formError.email" class="el-form-item__error">{{ formError.email }}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="5">
                    <el-col :span="6" class="p-1" style="text-align: right;">
                      <label for="external_url" class="FormLabel">
                        <span class="FormLabel__title">EXTERNAL URL:</span>
                      </label>
                    </el-col>
                    <el-col :span="18" class="p-1">
                      <el-form-item prop="external_url">
                        <el-input
                          placeholder="External url"
                          type="text"
                          ref="external_url"
                          autocomplete="off"
                          spellcheck="false"
                          id="external_url"
                          v-model="formData.external_url"
                        >
                          <el-tooltip slot="append" class="item" effect="dark" content="Nếu bạn sở hữu một trang web, bạn có thể đặt liên kết bên ngoài ở đây." placement="top">
                            <i class="fas fa-question-circle"></i>
                          </el-tooltip>
                        </el-input>
                        <div v-if="formError.external_url" class="el-form-item__error">{{ formError.external_url }}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="5">
                    <el-col :span="24" class="p-1">
                      <el-col :span="6" class="p-1" style="text-align: right;">
                        <label for="logoImage" class="FormLabel">
                          <span class="FormLabel__title">DESCRIPTION:</span>
                        </label>
                      </el-col>
                      <el-col :span="18" class="p-1">
                        <el-form-item prop="description">
                          <el-input
                            type="textarea"
                            ref="description"
                            placeholder="Start from here"
                            v-model="formData.description"
                            spellcheck="false"
                            id="description"
                          />
                        </el-form-item>
                      </el-col>
                    </el-col>
                  </el-row>

                  <el-row :gutter="5">
                    <el-col :span="6" class="p-1" style="text-align: right;">
                      <label for="logoImage" class="FormLabel">
                        <span class="FormLabel__title">BRAND LOGO</span>
                      </label>
                    </el-col>
                    <el-col :span="18" class="p-1">
                      <el-form-item prop="logoImage">
                        <upload-image
                          :name="'UploadLogoImage'"
                          :placeholer="'Banner image'"
                          :caption="formData.logoImage.caption"
                          @upload="saveLogoImage"
                        />
                        <div v-if="formError.logo" class="el-form-item__error">{{ formError.logo }}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="5">
                    <el-col :span="6" class="p-1" style="text-align: right;">
                      <label for="coverImage" class="FormLabel">
                        <span class="FormLabel__title">COVER IMAGE</span>
                      </label>
                    </el-col>
                    <el-col :span="18" class="p-1">
                      <el-form-item prop="coverImage">
                        <upload-image
                          :name="'UploadCoverImage'"
                          :placeholer="'Banner image'"
                          :caption="formData.coverImage.caption"
                          @upload="saveCoverImage"
                        />
                        <div v-if="formError.icon" class="el-form-item__error">{{ formError.icon }}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="7" class="p-1">
                  <el-row :gutter="5">
                    <el-col :span="24" class="p-1">
                      <el-form-item prop="maintenance_mode" class="text-center">
                        <label for="maintenance_mode" class="FormLabel">
                          <span class="FormLabel__title">MAINTENANCE MODE</span>
                          <el-tooltip class="item" effect="dark" content="Nếu chế độ bảo trì được bật, thị trường sẽ ngoại tuyến và cờ chế độ bảo trì sẽ được hiển thị cho khách truy cập. Người bán vẫn có thể truy cập bảng quản trị của họ." placement="top">
                            <i class="fas fa-question-circle"></i>
                          </el-tooltip>
                        </label>
                        <div class="switch-wrap d-flex align-items-center justify-content-center">
                          <span class="switch-stt">OFF</span>
                          <el-switch
                            v-model="formData.maintenance_mode"
                            class="p-2"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-value="1"
                            inactive-value="0"
                            @change="handleToggleMaintenanceMode"
                          />
                          <span class="switch-stt">ON</span>
                        </div>
                      </el-form-item>
                    </el-col>

                    <el-col :span="24" class="p-1">
                      <div class="text-center">
                        <comp-address-control
                          :align="'center'"
                          :address="formData.primaryAddress"
                          @create="handleCreateAddress"
                          @update="handleUpdateAddress"
                        />
                      </div>
                    </el-col>

                    <el-col v-if="formData.logoImage.src" :span="24" class="p-1">
                      <div class="text-center">
                        <label for="logoImage" class="FormLabel p-2">
                          <span class="FormLabel__title">ICON</span>
                        </label>
                        <div class="ImageThumb_wrap flex-column">
                          <div class="thumbNail d-block m-auto" style="width: 60px; height: 60px;">
                            <img class="w-100 h-100" :src="formData.logoImage.src" alt="icon" />
                          </div>
                          <div v-if="checkImageNotEmpty(formData.logoImage.src)" class="ImageThumb_wrap m-2">
                            <div class="confirm">
                              <el-tag type="danger">
                                <el-checkbox v-model="formData.logoImage.isDel">
                                  <small>Delete image</small>
                                </el-checkbox>
                              </el-tag>
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-col>

                    <el-col v-if="formData.coverImage.src" :span="24" class="p-1">
                      <div class="text-center">
                        <label for="coverImage" class="FormLabel p-2">
                          <span class="FormLabel__title">COVER</span>
                        </label>
                        <div class="ImageThumb_wrap flex-column">
                          <div class="thumbNail d-block m-auto" style="width: 150px; height: 70px;">
                            <img class="w-100 h-100" :src="formData.coverImage.src" alt="" />
                          </div>
                          <div v-if="checkImageNotEmpty(formData.coverImage.src)" class="ImageThumb_wrap m-2">
                            <div class="confirm">
                              <el-tag type="danger">
                                <el-checkbox v-model="formData.coverImage.isDel">
                                  <small>Delete image</small>
                                </el-checkbox>
                              </el-tag>
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="5">
                <el-col :span="5" class="p-1"/>
                <el-col :span="19" class="p-1">
                  <el-button type="primary" size="mini" @click.prevent="handleUpdate()">
                    <i class="PopupForm__SaveIcon fas fa-save"></i>
                    <span class="PopupForm_SaveLabel">Update</span>
                  </el-button>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </section>
  </section>
</template>

<script>
import CompAddressControl from '@/components/CompAddressControl';
import UploadImage from '@/components/UploadImage';
import { mapGetters, mapActions } from 'vuex';
import { settingGeneralRules } from '@/validations';
import { Message } from 'element-ui';

const defaultFormData = {
  name: '',
  legal_name: '',
  email: '',
  external_url: '',
  description: '',
  logoImage: {
    src: '',
    file: null,
    isDel: false,
    caption: 'Kích thước hình ảnh biểu trưng phải tối thiểu là 300x300px'
  },
  coverImage: {
    src: '',
    file: null,
    isDel: false,
    caption: 'Kích thước ảnh bìa phải là 1280x300px'
  },
  maintenance_mode: false,
  primaryAddress: null
};

const defaultFormError = {
  name: '',
  legal_name: '',
  email: '',
  icon: '',
  logo: ''
};

export default {
  components: {
    UploadImage,
    'comp-address-control': CompAddressControl
  },
  data() {
    return {
      formData: {...defaultFormData},
      formError: {...defaultFormError},
      formRules: settingGeneralRules,
      isLoaded: true
    }
  },
  watch: {
    $route(to, from) {
      this.reRenderDataFromUrl();
    }
  },
  created() {
    this.formSetup();
  },
  computed: {
    ...mapGetters({
      'shopGeneralSetting': 'config/getShopGeneralSetting'
    })
  },
  methods: {
    ...mapActions({
      'setIsLoading': 'app/handleSetIsLoading',
      'viewGeneralSetting': 'config/viewGeneralSetting',
      'updateBasicConfig': 'config/updateBasicConfig',
      'toggleMaintenanceMode': 'config/toggleMaintenanceMode'
    }),
    async formSetup() {
      try {
        this.resetFormData();
        this.isLoaded = false;
        this.setIsLoading(true);
        await this.viewGeneralSetting();
        this.appendDataToForm(this.shopGeneralSetting);
        this.setIsLoading(false);
        this.isLoaded = true;
      } catch (error) {
        this.$message.error('Có lỗi trong quá trình tải dữ liệu !');
      }
    },
    saveLogoImage(file) {
      this.formData.logoImage.file = file;
    },
    saveCoverImage(file) {
      this.formData.coverImage.file = file;
    },
    handleCreateAddress() {
      this.$router.push({
        path: `/address/addresses/shop/${this.shopGeneralSetting.id}/add`,
        query: {
          back_to: '/setting/general'
        }
      });
    },
    handleUpdateAddress() {
      const primaryAddress = this.formData.primaryAddress;
      this.$router.push({
        path: `/address/addresses/shop/${primaryAddress.addressable_id}/edit/${primaryAddress.id}`,
        query: {
          back_to: '/setting/general'
        }
      });
    },
    handleUpdate() {
      this.$refs['formData'].validate(valid => {
        if (valid) {
          this.updateBasicConfig({ formData: this.setFormData(), shop: this.shopGeneralSetting.id })
          .then(res => {
            Message({
              message: res.success,
              type: 'success',
              duration: 5 * 1000
            });
            this.formSetup();
          })
          .catch(error => {
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
    resetFormData() {},
    setFormData() {
      let formData = new FormData();
      formData.append('name', this.formData.name);
      formData.append('legal_name', this.formData.legal_name);
      formData.append('email', this.formData.email);
      formData.append('external_url', this.formData.external_url);
      formData.append('description', this.formData.description);
      if (this.formData.logoImage.file) {
        formData.append('images[logo]', this.formData.logoImage.file);
      }
      if (this.formData.coverImage.file) {
        formData.append('images[cover]', this.formData.coverImage.file);
      }
      if (this.formData.logoImage.isDel) {
        formData.append('delete_image[logo]', '1');
      }
      if (this.formData.coverImage.isDel) {
        formData.append('delete_image[cover]', '1');
      }
      return formData;
    },
    checkImageNotEmpty(img) {
      if (img && !(img.split('?text=')[1] === 'No_Image_Found')) {
        return true;
      } return false;
    },
    handleToggleMaintenanceMode(val) {
      let confirmTxt = '';
      if (+val === 1) {
        confirmTxt = 'Xác nhận chuyển hệ thông sang chế độ bảo trì ?';
      } else {
        confirmTxt = 'Xác nhận chuyển hệ thông sang chế độ hoạt động ?';
      }
      this.$confirm(confirmTxt, 'Xác nhận', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        this.setIsLoading(true);
        this.toggleMaintenanceMode(this.shopGeneralSetting.id).then(res => {
          this.setIsLoading(false);
          this.$message({
            type: 'success',
            message: res.success
          });
        }).catch(error => {
          this.setIsLoading(false);
          this.$message.error('Chuyển chế độ bảo trì không thành công !');
          console.error('[App Error] => ', error);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Đã hủy yêu cầu !'
        });
        this.formData.maintenance_mode = this.formData.maintenance_mode === '1' ? '0' : '1';
      });
    },
    appendDataToForm(data) {
      this.formData.name = data.name || '';
      this.formData.legal_name = data.legal_name || '';
      this.formData.email = data.email || '';
      this.formData.external_url = data.external_url || '';
      this.formData.description = data.description || '';
      this.formData.maintenance_mode = data.maintenance_mode ? '1' : '0';
      this.formData.logoImage.src = data.logo_image || '';
      this.formData.coverImage.src = data.cover_image || '';
      this.formData.primaryAddress = data.primaryAddress;
    },
    appendErrorToForm(errors) {},
    reRenderDataFromUrl() {
      if (this.$route.query.form === 'success') {
        this.formSetup();
      };
    },
  }
}
</script>

<style src="@/styles/app/setting-config.css"></style>