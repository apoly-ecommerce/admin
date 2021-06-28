<template>
  <section class="PageProduct">

    <router-view :key="key"></router-view>

    <page-table-content :tableName="tableName">
      <template v-slot:tools>
        <template>
          <el-button v-if="isTabTrashed" size="mini" @click="getList">
            <i class="fas fa-list"></i>
            <span>Danh sách</span>
          </el-button>
          <el-button v-else size="mini" @click="getListTrashed">
            <i class="fas fa-trash"></i>
            <span>Thùng rác</span>
          </el-button>
        </template>

        <router-link class="Table__tools-item" :to="{ name: 'add-product' }">Thêm mới</router-link>
      </template>

      <template v-slot:actions>
        <el-select v-model="tableAction" size="mini" style="margin-right: 4px; width: 100px;" placeholder="Tùy chọn">
          <template v-if="!isTabTrashed">
            <el-option :value="'Trash'">
              <i class="el-icon-delete-solid"></i>
              <span>Trash</span>
            </el-option>
          </template>
          <template v-else>
            <el-option :value="'Restore'">
              <i class="el-icon-refresh-left"></i>
              <span>Restore</span>
            </el-option>
          </template>
          <el-option :value="'Delete'">
            <i class="el-icon-close"></i>
            <span>Delete</span>
          </el-option>
        </el-select>
        <el-button v-if="tableAction" @click="handleTableAction" size="mini" type="primary">Áp dụng</el-button>
      </template>

      <template v-slot:supports>
        <el-button
          v-if="isTabTrashed && tableData.length && tableData.length"
          class="m-1"
          type="danger"
          size="mini"
          @click="handleEmptyTrash"
        >Làm sạch thùng rác</el-button>
        <el-button class="m-1" type="primary" size="mini" plain>PDF</el-button>
        <el-button class="m-1" type="primary" size="mini" plain>EXCEL</el-button>
        <el-button class="m-1" type="primary" size="mini" plain>PRINT</el-button>
      </template>

      <template v-slot:filters>
        <section v-if="tableSearch && tableSearch.options.length" class="SearchForm">
          <div class="d-flex">
            <el-select class="el-FormControl_custom FormSelectOptionSearch_SizeCustom" v-model="tableSearch.optionSelected" placeholder="Select">
              <el-option
                v-for="(option, index) in tableSearch.options"
                :key="index"
                :label="option.name"
                :value="option.value">
              </el-option>
            </el-select>
            <div class="SearchForm_FormGroup">
              <i class="SearchForm__Icon fas fa-search"></i>
              <el-input class="el-FormControl_custom" :placeholder="getPlaceholderSearch" v-model="tableSearch.value" autocomplete="off" spellcheck="false"></el-input>
            </div>
          </div>
        </section>
      </template>

      <template v-slot:main-content>
        <section class="TableBox_Content">

          <el-table
            ref="multipleTable"
            :data="dataSearch"
            style="width: 100%"
            emptyText="Empty data !"
            v-loading="listLoading"
            @selection-change="handleSelectionChange"
          >

            <el-table-column type="expand">
              <template slot-scope="props">
                <div class="ExpandData_Table">
                  <div v-if="props.row.created_at" class="ExpandData__Item">
                    <el-tag type="success">
                      <strong>Ngày tạo:</strong>
                      <span>{{ formatTime(props.row.created_at) }}</span>
                    </el-tag>
                  </div>
                  <div v-if="props.row.updated_at" class="ExpandData__Item">
                    <el-tag type="warning">
                      <strong>Cập nhật gần nhất:</strong>
                      <span>{{ formatTime(props.row.created_at) }}</span>
                    </el-tag>
                  </div>
                  <div v-if="props.row.deleted_at" class="ExpandData__Item">
                    <el-tag type="danger">
                      <strong>Ngày xóa:</strong>
                      <span>{{ formatTime(props.row.created_at) }}</span>
                    </el-tag>
                  </div>
                </div>
              </template>
            </el-table-column>

            <el-table-column type="selection" width="50" />

            <el-table-column label="Image" prop="image" width="120">
              <template slot-scope="{row}">
                <div class="TableThumb_ThumbImage">
                  <img :src="row.image" alt="" class="image medium">
                </div>
              </template>
            </el-table-column>

            <el-table-column label="Name" prop="name" width="250" sortable>
              <template slot-scope="{row}">
                <h5 class="line-txt-top">
                  <span>{{ row.name }}</span>
                </h5>
              </template>
            </el-table-column>

            <el-table-column label="Brand" prop="brand" width="150" sortable>
              <template slot-scope="{row}">
                  <div class="line-txt-top">{{ row.brand }}</div>
              </template>
            </el-table-column>

            <el-table-column label="Categories" prop="categories" width="150" sortable>
              <template slot-scope="{row}">
                <h5 class="line-txt-top">
                  <el-tag
                    v-for="category in row.categories"
                    :key="category.id"
                    size="mini"
                    type="info"
                    class="my-1"
                  >{{ category.name }}</el-tag>
                </h5>
              </template>
            </el-table-column>

            <el-table-column label="Status" prop="active" width="150" sortable>
              <template slot-scope="{row}">
                <el-tag v-if="row.active" effect="dark" type="success" size="mini">Active</el-tag>
                <el-tag v-else type="warning" effect="dark" size="mini">Inactive</el-tag>
              </template>
            </el-table-column>

            <el-table-column label="Options" align="right">
              <template slot-scope="{row}">
                <el-button-group>
                  <template v-if="!row.deleted_at">
                    <el-tooltip content="Thông tin" placement="top">
                      <el-button @click="handleView(row.id)" size="mini" icon="el-icon-rank" />
                    </el-tooltip>
                    <el-tooltip content="Chỉnh sửa" placement="top">
                      <el-button @click="handleEdit(row.id)" size="mini" icon="el-icon-edit" />
                    </el-tooltip>
                    <el-tooltip content="Chuyển vào thùng rác" placement="top">
                      <el-button @click="handleTrash(row.id)" size="mini" icon="el-icon-delete" />
                    </el-tooltip>
                  </template>
                  <template v-else>
                    <el-tooltip content="Khôi phục" placement="top">
                      <el-button @click="handleRestore(row.id)" size="mini" icon="el-icon-refresh-left" />
                    </el-tooltip>
                    <el-tooltip content="Xóa vĩnh viễn" placement="top">
                      <el-button @click="handleDestroy(row.id)" size="mini" icon="el-icon-close" />
                    </el-tooltip>
                  </template>
                </el-button-group>
              </template>
            </el-table-column>

          </el-table>

        </section>

        <template v-if="tableData && tableData.length">
          <pagination v-if="!isTabTrashed" :total="totalRow" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
          <pagination v-else :total="totalRow" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getListTrashed" />
        </template>
      </template>
    </page-table-content>

    <view-product :isShow="isShowDialog" :product="productSelected" @close="handleCloseDialog" />

  </section>
</template>

<script>
import PageTableContent from '@/components/PageTableContent';
import Pagination from '@/components/Pagination';
import ViewProduct from './components/ViewProduct';
import { mapGetters, mapActions } from 'vuex';
import { parseTime } from '@/utils/functions';

export default {
  components: {
    PageTableContent,
    Pagination,
    ViewProduct
  },
  data() {
    return {
      totalRow: 0,
      listLoading: false,
      isTabTrashed: false,
      tableName: 'Danh sách sản phẩm',
      listQuery: {
        limit: 10,
        page: 1
      },
      tableSearch: {
        value: '',
        options: [
          { name: 'Tên', value: 'name', placeholder: 'Nhập tên' },
        ],
        optionSelected: 'name'
      },
      multipleSelection: [],
      tableAction: '',
      productSelected: {},
      isShowDialog: false
    };
  },
  created() {
    this.getList();
  },
  computed: {
    ...mapGetters({
      'tableData': 'product/getListProduct',
    }),
    key() {
      return this.$route.path;
    },
    getPlaceholderSearch() {
      let optionCurrent = this.tableSearch.options.filter(item => item.value === this.tableSearch.optionSelected);
      return optionCurrent[0]['placeholder'];
    },
    dataSearch() {
      const { value, optionSelected } = this.tableSearch;
      let searchResult = this.tableData.filter(item => {
        return !value || !item[optionSelected] || (item[optionSelected].toString().toLowerCase()).includes(value.toLowerCase());
      });
      return searchResult;
    },
  },
  methods: {
    ...mapActions({
        'fetchListProductByPaginate': 'product/fetchListProductByPaginate',
        'trashProduct': 'product/trashProduct',
        'massTrashProduct': 'product/massTrashProduct',
        'fetchListProductTrashedByPaginate': 'product/fetchListProductTrashedByPaginate',
        'destroyProduct': 'product/destroyProduct',
        'massDestroyProduct': 'product/massDestroyProduct',
        'restoreProduct': 'product/restoreProduct',
        'massRestoreProduct': 'product/massRestoreProduct',
        'emptyTrashProduct': 'product/emptyTrashProduct'
    }),
    formatTime(time) {
      return parseTime(time);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getList() {
      this.listLoading = true;
      this.fetchListProductByPaginate(this.listQuery).then(res => {
        this.listLoading  = false;
        this.isTabTrashed = false;
        this.totalRow = res.total;
      }).catch(error => {
        this.listLoading = false;
        console.error('[App Error] => ', error);
      });
    },
    getListTrashed() {
      this.listLoading = true;
      this.fetchListProductTrashedByPaginate(this.listQuery).then(res => {
        this.listLoading  = false;
        this.isTabTrashed = true;
        this.totalRow = res.total;
      }).catch(error => {
        this.listLoading = false;
        console.error('[App Error] => ', error);
      });
    },
    handleTableAction() {
      if (this.tableAction === 'Trash') {
        this.handleMassTrash(); return;
      }
      if (this.tableAction === 'Delete') {
        this.handleMassDestroy(); return;
      }
      if (this.tableAction === 'Restore') {
        this.handleMassRestore(); return;
      }
    },
    handleRestore(id) {
      this.restoreProduct(id).then(res => {
        this.$message({
          type: 'success',
          message: res.success
        });
        this.reRenderDataFromFormAction();
      }).catch(error => {
        this.$message.error('Khôi phục thất bại !');
        console.error('App: ', error);
      });
    },
    handleTrash(id) {
      this.$confirm('Xác nhận chuyển vào thùng rác ?', 'Xác nhận', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        // code logic ...
        this.trashProduct(id).then(res => {
          this.$message({
            type: 'success',
            message: res.success
          });
          this.reRenderDataFromFormAction();
        }).catch(error => {
          this.$message.error('Chuyển vào thùng rác không thành công !');
          console.error('[App Error] => ', error);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Đã hủy chuyển thùng rác !'
        });
      });
    },
    handleDestroy(id) {
      this.$confirm('Xác nhận xóa vĩnh viễn khách hàng này ?', 'Xác nhận', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        // Code logic
        this.destroyProduct(id).then(res => {
          this.$message({
            type: 'success',
            message: res.success
          });
          this.reRenderDataFromFormAction();
        }).catch(error => {
          this.$message.error('Xóa vĩnh viễn thất bại !');
          console.error('[App Error] => ', error);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Đã hủy xóa vĩnh viễn !'
        });
      });
    },
    handleMassDestroy() {
      let ids = this.multipleSelection.map(item => item.id);
      if (!ids.length) {
        this.$message.error('Bạn chưa có lựa chọn nào !');
        return;
      }
      this.$confirm('Xác nhận xóa vĩnh viễn danh sách này ?', 'Xác nhận', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        // code logic ...
        this.massDestroyProduct(ids).then(res => {
          this.$message({
            type: 'success',
            message: res.success
          });
          this.reRenderDataFromFormAction();
        }).catch(error => {
          this.$message.error('Danh sách xóa vĩnh viễn không thành công !');
          console.error('[App Error] => ', error);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Đã hủy xóa vĩnh viễn !'
        });
      });
    },
    handleMassTrash() {
      let ids = this.multipleSelection.map(item => item.id);
      if (!ids.length) {
        this.$message.error('Bạn chưa có lựa chọn nào !');
        return;
      }
      this.$confirm('Xác nhận chuyển danh sách này vào thùng rác ?', 'Xác nhận', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        // code logic ...
        this.massTrashProduct(ids).then(res => {
          this.$message({
            type: 'success',
            message: res.success
          });
          this.reRenderDataFromFormAction();
        }).catch(error => {
          this.$message.error('Chuyển danh sách vào thùng rác không thành công !');
          console.error('[App Error] => ', error);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Đã hủy chuyển thùng rác !'
        });
      });
    },
    handleEmptyTrash() {
      this.$confirm('Xác nhận xóa vĩnh viễn toàn bộ dữ liệu trong thùng rác ?', 'Xác nhận', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        // code logic ...
        this.emptyTrashProduct().then(res => {
          this.$message({
            type: 'success',
            message: res.success
          });
          this.getList();
        }).catch(error => {
          this.$message.error('Quá trình xóa vĩnh viễn không thành công !');
          console.error('[App Error] => ', error);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Đã hủy xóa vĩnh viễn toàn bộ dữ liệu !'
        });
      });
    },
    handleMassRestore() {
      let ids = this.multipleSelection.map(item => item.id);
      if (!ids.length) {
        this.$message.error('Bạn chưa có lựa chọn nào !');
        return;
      }
      this.$confirm('Xác nhận khôi phục danh sách này ?', 'Xác nhận', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        // code logic ...
        this.massRestoreProduct(ids).then(res => {
          this.$message({
            type: 'success',
            message: res.success
          });
          this.reRenderDataFromFormAction();
        }).catch(error => {
          this.$message.error('Khôi phục danh sách thất bại !');
          console.error('[App Error] => ', error);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Đã hủy chuyển thùng rác !'
        });
      });
    },
    handleEdit(id) {
      this.$router.push({
        name: 'update-product',
        params: { id }
      });
    },
    reRenderDataFromFormAction() {
      this.tableAction = '';
      if (this.tableData.length === 0) {
        if (! this.isTabTrashed) { this.getList() }
        else { this.getListTrashed(); }
      }
    },
    handleView(id) {
      this.isShowDialog = true;
      this.productSelected = this.tableData.filter(item => item.id === id)[0];
    },
    handleCloseDialog() {
      this.productSelected = {};
      this.isShowDialog = false;
    }
  }
}
</script>
