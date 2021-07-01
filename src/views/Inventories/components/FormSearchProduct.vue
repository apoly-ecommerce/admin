<template>
  <section class="DialogView_Components">
    <section class="Dialog_Wrap">
      <button @click="close" class="Dialog_Control-Close el-icon-circle-close"></button>
      <section class="Dialog_Content">
        <el-form>
          <el-form-item label="Nhập từ khóa về sản phẩm để tìm kiếm" prop="strSearch">
            <el-input
              :placeholder="getPlaceholderSearch"
              v-model="tableSearch.value"
              class="input-with-select"
              autocomplete="off"
              spellcheck="false"
            >
              <el-select v-model="tableSearch.optionSelected" slot="prepend" placeholder="Select">
                <el-option
                  v-for="(option, index) in tableSearch.options"
                  :key="index"
                  :label="option.name"
                  :value="option.value">
                </el-option>
              </el-select>
            </el-input>
          </el-form-item>
        </el-form>
        <section v-if="tableSearch.value" class="search-results">
          <el-table
            :data="dataSearch"
            style="width: 100%"
            emptyText="Empty data !"
          >
            <el-table-column label="Image" width="150">
              <template slot-scope="{row}">
                <div class="TableThumb_ThumbImage">
                  <img :src="row.image" alt="" class="image medium w-100 h-100">
                </div>
              </template>
            </el-table-column>

            <el-table-column label="Detail" width="500">
              <template slot-scope="{row}">
                <div class="line-txt-top">
                  <strong>{{ row.name }}</strong>
                  <p v-if="row.model_number">Model number: {{ row.model_number }}</p>
                  <p v-if="row.brand">Brand:{{ row.brand }}</p>
                  <a href="javascript:;" @click="handleViewDialogProduct(row.id)">view detail</a>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="Action" align="right">
              <template slot-scope="{row}">
                <el-button @click="handleAddInventory(row.id)" type="primary" size="mini">Nhập kho</el-button>
              </template>
            </el-table-column>
          </el-table>
        </section>
      </section>
    </section>

    <view-product :isShow="isShowDialogViewProduct" :product="productSelected" @close="handleCloseDialog" />

  </section>
</template>

<script>
import { mapActions } from 'vuex';
import ViewProduct from '@/views/Products/components/ViewProduct';

export default {
  name: 'form-search-product',
  components: {
    ViewProduct
  },
  data() {
    return {
      products: [],
      tableSearch: {
        value: '',
        options: [
          { name: 'Tên', value: 'name', placeholder: 'Nhập tên sản phẩm' },
          { name: 'Thương hiệu', value: 'brand', placeholder: 'Nhập tên thương hiệu' },
          { name: 'Mô tả', value: 'description', placeholder: 'Nhập mô tả' },
          { name: 'model', value: 'model_number', placeholder: 'Nhập model sản phẩm' },
          { name: 'Shop id', value: 'shop_id', placeholder: 'Nhập id shop '}
        ],
        optionSelected: 'name'
      },
      isShowDialogViewProduct: false,
      productSelected: {}
    }
  },
  watch: {
    $route(to, from) {
      if (to.name !== 'list-inventory') {
        this.getListProduct();
      }
    }
  },
  created() {
    this.getListProduct();
  },
  computed: {
    getPlaceholderSearch() {
      let optionCurrent = this.tableSearch.options.filter(item => item.value === this.tableSearch.optionSelected);
      return optionCurrent[0]['placeholder'];
    },
    dataSearch() {
      const { value, optionSelected } = this.tableSearch;
      let searchResult = this.products.filter(item => {
        return !value || !item[optionSelected] || (item[optionSelected].toString().toLowerCase()).includes(value.toLowerCase());
      });
      return searchResult;
    },
  },
  methods: {
    ...mapActions({
      'fetchListProduct': 'product/fetchListProduct'
    }),
    close() {
      this.$router.push({ path: '/stock/inventory' });
    },
    getListProduct() {
      this.fetchListProduct().then(res => {
        this.products = res.products;
      }).catch(err => {
        console.error('[App Error] => ', err);
        this.$message.error('Có lỗi trong quá trình tải dữ liệu !');
      });
    },
    handleAddInventory(id) {
      this.$router.push({
        name: 'edit-inventory',
        params: { id }
      });
    },
    handleViewDialogProduct(id) {
      this.isShowDialogViewProduct = true;
      this.productSelected = this.products.filter(item => item.id === id)[0];
    },
    handleCloseDialog() {
      this.isShowDialogViewProduct = false;
      this.productSelected = {};
    }
  }
}
</script>

<style src="@/styles/app/dialog-view-detail.css"></style>
<style>
.Dialog_Content {
  background-color: #fff;
  padding: 15px;
}
.el-input-group__prepend {
  width: 120px;
}
</style>