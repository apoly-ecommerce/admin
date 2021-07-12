<template>
  <form-action
    :name="formName"
    :size="'90%'"
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
          <el-col :span="16" class="p-1">
            <div class="FormOption__Item">
              <div class="FormTop__Heading">INVENTORY</div>
              <div class="FormTop__Content">
                <el-row :gutter="5">
                  <el-col :span="24" class="p-1">
                    <div class="widget-content">
                      <div class="d-flex">
                        <div class="widget-left">
                          <div class="widget-thumbnail" style="width: 140px; height: 110px">
                            <img class="w-100 h-100" style="object-fit: contain;" :src="productInfo.image" alt="Avatar prduct">
                          </div>
                        </div>
                        <div class="widget-right">
                          <h2 class="widget-title">{{ productInfo.name }}</h2>
                          <p class="widget-sub-title" v-if="productInfo.model_number">Model number: {{ productInfo.model_number }}</p>
                          <p class="widget-sub-title" v-if="productInfo.brand">Brand: {{ productInfo.brand }}</p>
                          <p class="widget-sub-title" v-if="productInfo.manufacturer">Manufacturer: {{ productInfo.manufacturer.name }}</p>
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>

                <el-row :gutter="5">
                  <el-col :span="24" class="p-1">
                    <el-form-item prop="title">
                      <label for="title" class="FormLabel">
                        <span class="FormLabel__title">Title *</span>
                      </label>
                      <el-input
                        placeholder="Title"
                        type="text"
                        ref="title"
                        autocomplete="off"
                        spellcheck="false"
                        id="title"
                        @blur="coverValueToSlug"
                        v-model="formData.title"
                      />
                      <div v-if="formError.title" class="el-form-item__error">{{ formError.title }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="5">
                  <el-col :span="14" class="p-1">
                    <el-form-item prop="sku">
                      <label for="sku" class="FormLabel">
                        <span class="FormLabel__title">Sku *</span>
                        <el-tooltip class="item" effect="dark" placement="top" content="SKU (Đơn vị lưu giữ hàng hóa) là mã định danh cụ thể của người bán. Nó sẽ giúp quản lý khoảng không quảng cáo của bạn">
                          <i class="fas fa-question-circle"></i>
                        </el-tooltip>
                      </label>
                      <el-input
                        placeholder="Seller SKU"
                        type="text"
                        ref="sku"
                        autocomplete="off"
                        spellcheck="false"
                        id="sku"
                        v-model="formData.sku"
                      />
                      <div v-if="formError.sku" class="el-form-item__error">{{ formError.sku }}</div>
                    </el-form-item>
                  </el-col>

                  <el-col :span="6" class="p-1">
                    <el-form-item prop="condition">
                      <label for="condition" class="FormLabel">
                        <span class="FormLabel__title">CONDITION *</span>
                        <el-tooltip class="item" effect="dark" placement="top" content="Tình trạng hiện tại của sản phẩm là gì?">
                          <i class="fas fa-question-circle"></i>
                        </el-tooltip>
                      </label>
                      <el-select
                        v-model="formData.condition"
                        placeholder="Select"
                        id="condition"
                        class="w-100"
                      >
                        <el-option
                          v-for="condition in formSelect.conditions"
                          :key="condition.value"
                          :value="condition.value"
                          :label="condition.label"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="4" class="p-1">
                    <el-form-item prop="active">
                      <label for="active" class="FormLabel">
                        <span class="FormLabel__title">STATUS *</span>
                        <el-tooltip class="item" effect="dark" placement="top" content="Mặt hàng có được mở bán không? Mặt hàng không hoạt động sẽ không được hiển thị trên thị trường.">
                          <i class="fas fa-question-circle"></i>
                        </el-tooltip>
                      </label>
                      <el-select
                        v-model="formData.active"
                        placeholder="Select"
                        id="active"
                        class="w-100"
                      >
                        <el-option value="1" label="Active"/>
                        <el-option value="0" label="Inactive"/>
                      </el-select>
                      <div v-if="formError.active" class="el-form-item__error">{{ formError.active }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="5">
                  <el-col :span="24" class="p-1">
                    <el-form-item prop="condition_note">
                      <label for="condition_note" class="FormLabel">
                        <span class="FormLabel__title">CONDITION NOTE</span>
                        <el-tooltip class="item" effect="dark" placement="top" content="Nhập thêm chi tiết về tình trạng mặt hàng. Điều này sẽ giúp khách hàng hiểu rõ mặt hàng.">
                          <i class="fas fa-question-circle"></i>
                        </el-tooltip>
                      </label>
                      <el-input
                        placeholder="Condition note"
                        type="text"
                        ref="condition_note"
                        autocomplete="off"
                        spellcheck="false"
                        id="condition_note"
                        v-model="formData.condition_note"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="5">
                  <el-col :span="24" class="p-1">
                    <el-form-item prop="description">
                      <label for="description" class="FormLabel">
                        <span class="FormLabel__title">Mô tả sản phẩm</span>
                        <el-tooltip class="item" effect="dark" placement="top" content="is tooltip">
                          <i class="fas fa-question-circle"></i>
                        </el-tooltip>
                      </label>
                      <editor
                        :api-key="tinymceSetup.api_key"
                        :init="tinymceSetup.config"
                        v-model="formData.description"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="5">
                  <el-col :span="24" class="p-1">
                    <div class="heading text-right">INVENTORY RULES</div>
                    <div class="line-break"></div>
                  </el-col>
                </el-row>

                <el-row :gutter="5">
                  <el-col :span="12" class="p-1">
                    <el-form-item prop="stock_quantity">
                      <label for="stock_quantity" class="FormLabel">
                        <span class="FormLabel__title">STOCK QUANTITY *</span>
                        <el-tooltip class="item" effect="dark" placement="top" content="Số lượng mặt hàng bạn có trong kho của mình">
                          <i class="fas fa-question-circle"></i>
                        </el-tooltip>
                      </label>
                      <el-input-number class="w-100"
                        v-model="formData.stock_quantity"
                        size="medium"
                        :min="1"
                        ref="stock_quantity"
                        id="stock_quantity"
                      />
                    </el-form-item>
                  </el-col>

                  <el-col :span="12" class="p-1">
                    <el-form-item prop="min_order_quantity">
                      <label for="min_order_quantity" class="FormLabel">
                        <span class="FormLabel__title">MIN ORDER QUANTITY</span>
                        <el-tooltip class="item" effect="dark" placement="top" content="Số lượng cho phép nhận đặt hàng. Phải là một giá trị số nguyên. Mặc định = 1">
                          <i class="fas fa-question-circle"></i>
                        </el-tooltip>
                      </label>
                      <el-input-number class="w-100"
                        v-model="formData.min_order_quantity"
                        size="medium"
                        :min="1"
                        ref="min_order_quantity"
                        id="min_order_quantity"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="5">
                  <el-col :span="12" class="p-1 price-append">
                    <el-form-item prop="sale_price">
                      <label for="sale_price" class="FormLabel">
                        <span class="FormLabel__title">PRICE *</span>
                        <el-tooltip class="item" effect="dark" placement="top" content="Giá mà không có bất kỳ thuế. Thuế sẽ được tính tự động dựa trên khu vực vận chuyển.">
                          <i class="fas fa-question-circle"></i>
                        </el-tooltip>
                      </label>
                      <app-currency-input v-model="formData.sale_price"/>
                      <div v-if="formError.sale_price" class="el-form-item__error">{{ formError.sale_price }}</div>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12" class="p-1 price-append">
                    <el-form-item prop="offer_price">
                      <label for="offer_price" class="FormLabel">
                        <span class="FormLabel__title">OFFER PRICE</span>
                        <el-tooltip class="item" effect="dark" placement="top" content="Giá ưu đãi sẽ được thực hiện giữa ngày bắt đầu và ngày kết thúc ưu đãi">
                          <i class="fas fa-question-circle"></i>
                        </el-tooltip>
                      </label>
                      <app-currency-input v-model="formData.offer_price"/>
                      <div v-if="formError.offer_price" class="el-form-item__error">{{ formError.offer_price }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="5">
                  <el-col :span="12" class="p-1">
                    <el-form-item prop="offer_start">
                      <label for="offer_start" class="FormLabel">
                        <span class="FormLabel__title">OFFER START DATE</span>
                        <el-tooltip class="item" effect="dark" placement="top" content="Phiếu mua hàng phải có ngày bắt đầu. Bắt buộc nếu trường giá ưu đãi được cung cấp">
                          <i class="fas fa-question-circle"></i>
                        </el-tooltip>
                      </label>
                      <el-date-picker
                        v-model="formData.offer_start"
                        type="date"
                        class="w-100"
                        format="dd-MM-yyyy"
                        placeholder="Offer start date"
                      />
                      <div v-if="formError.offer_start" class="el-form-item__error">{{ formError.offer_start }}</div>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12" class="p-1">
                    <el-form-item prop="offer_end">
                      <label for="offer_end" class="FormLabel">
                        <span class="FormLabel__title">OFFER END DATE</span>
                        <el-tooltip class="item" effect="dark" placement="top" content="Phiếu mua hàng phải có ngày bắt đầu. Bắt buộc nếu trường giá ưu đãi được cung cấp">
                          <i class="fas fa-question-circle"></i>
                        </el-tooltip>
                      </label>
                      <el-date-picker
                        v-model="formData.offer_end"
                        type="date"
                        class="w-100"
                        format="dd-MM-yyyy"
                        placeholder="Offer end date"
                      />
                      <div v-if="formError.offer_end" class="el-form-item__error">{{ formError.offer_end }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="5">
                  <el-col :span="24" class="p-1">
                    <el-form-item prop="linked_items">
                      <label for="linked_items" class="FormLabel">
                        <span class="FormLabel__title">LINKED ITEMS</span>
                        <el-tooltip class="item" effect="dark" placement="top" content="Các mặt hàng được liên kết sẽ hiển thị trên trang sản phẩm như các mặt hàng thường được mua cùng nhau. Đây là tùy chọn nhưng quan trọng.">
                          <i class="fas fa-question-circle"></i>
                        </el-tooltip>
                      </label>
                      <el-select
                        v-model="formData.linked_items"
                        class="w-100"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        placeholder="Choose product">
                        <el-option
                          v-for="(linked_item, index) in formSelect.linked_list"
                          :key="index"
                          :label="linked_item.name"
                          :value="linked_item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
          <el-col :span="8" class="p-1">
            <div class="FormOption__Item">
              <div class="FormTop__Heading">INVENTORY</div>
              <div class="FormTop__Content">
                <el-row :span="5">
                  <el-col :span="24" class="p-1">
                    <el-form-item prop="available_from">
                      <label for="available_from" class="FormLabel">
                        <span class="FormLabel__title">AVAILABLE FROM</span>
                        <el-tooltip class="item" effect="dark" placement="top" content="Ngày mà hàng sẽ có sẵn. Mặc định = ngay bây giờ">
                          <i class="fas fa-question-circle"></i>
                        </el-tooltip>
                      </label>
                      <el-date-picker
                        v-model="formData.available_from"
                        type="date"
                        class="w-100"
                        format="dd-MM-yyyy"
                        placeholder="Available from"
                      />
                      <div v-if="formError.available_from" class="el-form-item__error">{{ formError.available_from }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="5">
                  <el-col :span="24" class="p-1">
                    <div class="heading text-right">REPORTING</div>
                    <div class="line-break"></div>
                  </el-col>
                </el-row>

                <el-row :gutter="5">
                  <el-col :span="24" class="p-1 price-append">
                    <el-form-item prop="purchase_price">
                      <label for="purchase_price" class="FormLabel">
                        <span class="FormLabel__title">PURCHASE PRICE</span>
                        <el-tooltip class="item" effect="dark" placement="top" content="Trường được đề xuất. Điều này sẽ giúp tính toán lợi nhuận và tạo báo cáo">
                          <i class="fas fa-question-circle"></i>
                        </el-tooltip>
                      </label>
                      <app-currency-input v-model="formData.purchase_price"/>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="5">
                  <el-col :span="24" class="p-1">
                    <div class="heading text-right">SEO</div>
                    <div class="line-break"></div>
                  </el-col>
                </el-row>

                <el-row :gutter="5">
                  <el-col :span="24" class="p-1">
                    <el-form-item prop="slug">
                      <label for="slug" class="FormLabel">
                        <span class="FormLabel__title">Slug *</span>
                      </label>
                      <el-input
                        placeholder="SEO friendly URL"
                        type="text"
                        name="slug"
                        ref="slug"
                        autocomplete="off"
                        spellcheck="false"
                        id="slug"
                        @blur="coverValueToSlug"
                        v-model="formData.slug"
                      />
                      <small v-if="formData.slug">{{ getBaseUrl }}</small>
                      <div v-if="formError.slug" class="el-form-item__error">{{ formError.slug }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="5">
                  <el-col :span="24" class="p-1">
                    <el-form-item prop="meta_title">
                      <label for="meta_title" class="FormLabel">
                        <span class="FormLabel__title">Meta title</span>
                        <el-tooltip class="item" effect="dark" placement="top" content="Thẻ tiêu đề — về mặt kỹ thuật được gọi là phần tử tiêu đề — xác định tiêu đề của tài liệu. Thẻ tiêu đề thường được sử dụng trên các trang kết quả của công cụ tìm kiếm (SERP) để hiển thị các đoạn trích xem trước cho một trang nhất định và rất quan trọng đối với cả SEO và chia sẻ xã hội">
                          <i class="fas fa-question-circle"></i>
                        </el-tooltip>
                      </label>
                      <el-input
                        placeholder="Meta title"
                        type="text"
                        ref="meta_title"
                        autocomplete="off"
                        spellcheck="false"
                        id="meta_title"
                        v-model="formData.meta_title"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="5">
                  <el-col :span="24" class="p-1">
                    <el-form-item prop="meta_description">
                      <label for="meta_description" class="FormLabel">
                        <span class="FormLabel__title">Meta description</span>
                        <el-tooltip class="item" effect="dark" placement="top" content="Mô tả meta là các thuộc tính HTML cung cấp các giải thích ngắn gọn về nội dung của các trang web. Mô tả meta thường được sử dụng trên các trang kết quả của công cụ tìm kiếm (SERP) để hiển thị các đoạn trích xem trước cho một trang nhất định">
                          <i class="fas fa-question-circle"></i>
                        </el-tooltip>
                      </label>
                      <el-input
                        type="textarea"
                        ref="meta_description"
                        placeholder="Meta description"
                        v-model="formData.meta_description"
                        maxlength="500"
                        spellcheck="false"
                        id="meta_description"
                        tabindex="7"
                        show-word-limit
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template v-slot:form-footer>
      <el-button v-if="productId" type="primary" size="mini" @click.prevent="handleActionForm(handleAdd)">
        <i class="PopupForm__SaveIcon fas fa-save"></i>
        <span class="PopupForm_SaveLabel">Save</span>
      </el-button>
      <el-button v-if="inventoryId" type="primary" size="mini" @click.prevent="handleActionForm(handleUpdate)">
        <i class="PopupForm__SaveIcon fas fa-save"></i>
        <span class="PopupForm_SaveLabel">Update</span>
      </el-button>
    </template>
  </form-action>
</template>

<script>
import FormAction from '@/components/FormAction';
import UploadImage from '@/components/UploadImage';
import AppCurrencyInput from '@/components/AppCurrencyInput';
import { inventoryRules } from '@/validations';
import { mapActions } from 'vuex';
import Editor from '@tinymce/tinymce-vue';
import { tinymceConfig, tinymceApiKey } from '@/config/tinymce';
import { Message } from 'element-ui';
import CloudinaryUpload from '@/components/CloudinaryUpload';
import { changeToSlug } from '@/helpers';
import moment from 'moment';

const productInfo = {
  image: '',
  name: '',
  model_number: '',
  brand: '',
  manufacturer: '',
};

const defaultFormData = {
  title: '',
  sku: '',
  condition: '',
  active: '',
  condition_note: '',
  description: '',
  stock_quantity: 1,
  min_order_quantity: 1,
  sale_price: 0,
  offer_price: 0,
  offer_start: '',
  offer_end: '',
  linked_items: [],
  available_from: '',
  purchase_price: 0,
  slug: '',
  meta_title: '',
  meta_description: '',
}

const defaultFormSelect = {
  conditions: [
    { label: 'New', value: 'New' },
    { label: 'Used', value: 'Used' },
    { label: 'Refurbished', value: 'Refurbished' }
  ],
  linked_list: []
}

const defaultFormError = {
  title: '',
  sku: '',
  active: '',
  sale_price: '',
  offer_price: '',
  available_from: '',
  offer_start: '',
  offer_end: '',
  slug: ''
};

export default {
  components: {
    FormAction,
    UploadImage,
    CloudinaryUpload,
    'editor': Editor,
    'app-currency-input': AppCurrencyInput
  },
  data() {
    return {
      formName: '',
      productInfo: {...productInfo},
      formData: {...defaultFormData},
      formError: {...defaultFormError},
      formSelect: {...defaultFormSelect},
      formRules: inventoryRules,
      productId: this.$route.params.productId,
      inventoryId: this.$route.params.inventoryId,
      isFormLoading: false,
      linked_list: []
    };
  },
  watch: {
    $route(to, from) {
      this.productId = to.params.productId;
      this.inventoryId = to.params.inventoryId;
      if (to.name !== 'list-inventory') {
        this.formSetup();
      }
    }
  },
  created() {
    this.formSetup();
  },
  computed: {
    tinymceSetup() {
      return {
        config: tinymceConfig,
        api_key: tinymceApiKey
      };
    },
    getBaseUrl() {
      return `http://example.com/product/${this.formData.slug}`;
    },
  },
  methods: {
    ...mapActions({
      'addInventory': 'inventory/addInventory',
      'storeInventory': 'inventory/storeInventory',
      'setupFormInventory': 'inventory/setupFormInventory',
      'editInventory': 'inventory/editInventory',
      'updateInventory': 'inventory/updateInventory'
    }),
    async formSetup() {
      try {
        this.resetFormData();
        this.getFormName();
        this.isFormLoading = true;
        if (this.inventoryId) {
          const dataInventory = await this.editInventory(this.inventoryId);
          this.appendProductData(dataInventory.product);
           this.appendInventoryData(dataInventory.inventory);
        }
        if (this.productId) {
          const dataInventory = await this.addInventory(this.productId);
          this.appendProductData(dataInventory.product);
        }
        const dataSetup = await this.setupFormInventory();
        this.formSelect.linked_list = dataSetup.products;
        this.isFormLoading = false;
      } catch (error) {
        console.error('[App Error] => ', error);
        if (error.status === 404) {
          this.$confirm('Sản phẩm kho này không tồn tại, hoặc đã bị xóa trước đó !', 'Thông báo lỗi', {
            confirmButtonText: 'Quay về',
            cancelButtonText: 'Thêm mới',
            type: 'error'
          }).then(() => {
            this.back();
          }).catch(() => {
            this.back();
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
    back(router = '/stock/inventory', query = {}) {
      this.resetFormData();
      this.$refs['formData'].resetFields();
      this.$router.push({ path: router, query });
    },
    coverValueToSlug(e) {
      let val = e.target.value;
      this.formData.slug = changeToSlug(val);
    },
    handleCloseForm() {
      this.back();
    },
    handleUploadImagesDesc(files) {
      this.formData.media_list = files;
    },
    resetFormData() {
      this.formData  = {...defaultFormData};
      this.formError = {...defaultFormError};
    },
    handleActionForm(callback) {
      this.$refs['formData'].validate(valid => {
        if (valid) {
          callback().then(res => {
            this.$message({
              message: res.success,
              type: 'success',
              duration: 5 * 1000
            });
            this.resetFormData();
            this.back('/stock/inventory', { form: 'success' });
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
      this.formData.product_id = this.productId;
      return this.storeInventory(this.setFormData());
    },
    handleUpdate() {
      return this.updateInventory({ formData: this.setFormData(), id: this.inventoryId });
    },
    setFormData() {
      if (this.formData.offer_start) {
        this.formData.offer_start = moment(this.formData.offer_start).format('YYYY-MM-DD HH:mm');
      }
      if (this.formData.offer_end) {
        this.formData.offer_end = moment(this.formData.offer_end).format('YYYY-MM-DD HH:mm');
      }
      if (this.formData.available_from) {
        this.formData.available_from = moment(this.formData.available_from).format('YYYY-MM-DD HH:mm');
      }
      if (this.formData.sale_price === 0) {
        this.formData.sale_price = null;
      }
      if (this.formData.offer_price === 0) {
        this.formData.offer_price = null;
      }
      if (this.formData.purchase_price === 0) {
        this.formData.purchase_price = null;
      }
      return this.formData;
    },
    appendErrorToForm(errors) {
      for (const [key, value] of Object.entries(errors)) {
        this.formError[key] = value[0];
      }
    },
    appendProductData(product) {
      this.productInfo = product;
    },
    appendInventoryData(inventory) {
      this.formData.title = inventory.title;
      this.formData.sku = inventory.sku;
      this.formData.condition = inventory.condition;
      this.formData.active = inventory.active ? '1' : '0';
      this.formData.condition_note = inventory.condition_note;
      this.formData.description = inventory.description;
      this.formData.stock_quantity = inventory.stock_quantity;
      this.formData.min_order_quantity = inventory.min_order_quantity;
      this.formData.sale_price = inventory.sale_price ? +inventory.sale_price.split('.')[0] : 0;
      this.formData.offer_price = inventory.offer_price ? +inventory.offer_price.split('.')[0] : 0;
      this.formData.offer_start = moment(inventory.offer_start).format('YYYY-MM-DD HH:mm');
      this.formData.offer_end = moment(inventory.offer_end).format('YYYY-MM-DD HH:mm');
      this.formData.linked_items = inventory.linked_items;
      this.formData.available_from = moment(inventory.available_from).format('YYYY-MM-DD HH:mm');
      this.formData.purchase_price = inventory.purchase_price ? +inventory.purchase_price.split('.')[0] : 0;
      this.formData.slug = inventory.slug;
      this.formData.meta_title = inventory.meta_title;
      this.formData.meta_description = inventory.meta_description;
    },
  }
}
</script>