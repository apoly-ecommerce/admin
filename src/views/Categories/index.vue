<template>
  <section class="PageCategory">

    <router-view :key="key"></router-view>

    <page-table-content :tableName="tableName">

      <template v-slot:tools>
        <template>
          <el-button v-if="isTabTrashed" size="mini" @click="getList">
            <fa-icon icon="list" />
            <span>Danh sách</span>
          </el-button>
          <el-button v-else size="mini" @click="getListTrashed">
            <fa-icon icon="trash" />
            <span>Thùng rác</span>
          </el-button>
        </template>

        <router-link class="Table__tools-item" :to="{ name: 'add-category' }">Thêm mới</router-link>
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
              <fa-icon class="SearchForm__Icon" icon="search" />
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

            <el-table-column label="Cover image" prop="cover_image_url" width="120">
              <template slot-scope="{row}">
                <div class="TableThumb_ThumbImage">
                  <img :src="row.cover_image_url" alt="" class="image medium">
                </div>
              </template>
            </el-table-column>

            <el-table-column label="Feature image" prop="feature_image_url" width="120">
              <template slot-scope="{row}">
                <div class="TableThumb_ThumbImage">
                  <img :src="row.feature_image_url" alt="" class="image medium">
                </div>
              </template>
            </el-table-column>

            <el-table-column label="Category name" prop="name" width="200" sortable>
              <template slot-scope="{row}">
                <h5 class="line-txt-top">
                  <span>{{ row.name }}</span>
                  <el-tag v-if="row.featured" size="mini" effect="dark">Featured</el-tag>
                </h5>
                <small class="line-txt-bottom">{{ row.description }}</small>
              </template>
            </el-table-column>

            <el-table-column label="Parent" prop="sub_group" width="300" sortable>
              <template slot-scope="{row}">
                <h5 class="line-txt-top">
                  <span>{{ row.sub_group.group.name }}</span>
                  <i class="el-icon-d-arrow-right"></i>
                  <span>{{ row.sub_group.name }} </span>
                </h5>
              </template>
            </el-table-column>

            <el-table-column label="Products" prop="products_count" width="150" sortable>
              <template slot-scope="{row}">
                <h5 class="line-txt-top">
                  <span>{{ row.products_count || 0 }}</span>
                </h5>
              </template>
            </el-table-column>

            <el-table-column label="Order" prop="order" width="150" sortable>
              <template slot-scope="{row}">
                <el-tag type="info" size="mini">
                  {{ row.order || 0 }}
                </el-tag>
              </template>
            </el-table-column>

            <el-table-column label="Options" align="right">
              <template slot-scope="{row}">
                <el-button-group>
                  <template v-if="!row.deleted_at">
                    <el-button @click="handleEdit(row.id)" size="mini" type="primary" icon="el-icon-edit"></el-button>
                    <el-button @click="handleTrash(row.id)" size="mini" type="danger" icon="el-icon-delete"></el-button>
                  </template>
                  <template v-else>
                    <el-button @click="handleRestore(row.id)" size="mini" type="primary" icon="el-icon-refresh-left"></el-button>
                    <el-button @click="handleDestroy(row.id)" size="mini" type="danger" icon="el-icon-close"></el-button>
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

  </section>
</template>

<script>
// Components
import PageTableContent from '@/components/PageTableContent';
import Pagination from '@/components/Pagination';
// Store
import { mapGetters, mapActions } from 'vuex';
// Utils
import { parseTime } from '@/utils/functions';

export default {
  components: {
    PageTableContent,
    Pagination,
  },
  data() {
    return {
      totalRow: 0,
      listLoading: false,
      isTabTrashed: false,
      tableName: 'Danh sách danh mục',
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
      tableAction: ''
    };
  },
  watch: {
    $route(to, from) {
      this.reRenderFormData();
    }
  },
  created() {
    this.getList();
  },
  computed: {
    ...mapGetters({
      'tableData': 'category/getCategories',
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
        'fetchCategoryByPaginate': 'category/fetchCategoryByPaginate',
        'trashCategory': 'category/trashCategory',
        'massTrashCategory': 'category/massTrashCategory',
        'fetchListCategoryTrashedByPaginate': 'category/fetchListCategoryTrashedByPaginate',
        'destroyCategory': 'category/destroyCategory',
        'massDestroyCategory': 'category/massDestroyCategory',
        'restoreCategory': 'category/restoreCategory',
        'massRestoreCategory': 'category/massRestoreCategory'
    }),
    formatTime(time) {
      return parseTime(time);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getList() {
      this.listLoading = true;
      this.fetchCategoryByPaginate(this.listQuery).then(res => {
        this.listLoading  = false;
        this.isTabTrashed = false;
        this.totalRow = res.total;
      }).catch(error => {
        this.listLoading = false;
        console.error('App Error: ', error);
      });
    },
    getListTrashed() {
      this.listLoading = true;
      this.fetchListCategoryTrashedByPaginate(this.listQuery).then(res => {
        this.listLoading  = false;
        this.isTabTrashed = true;
        this.totalRow = res.total;
      }).catch(error => {
        this.listLoading = false;
        console.log('App Error: ', error);
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
      this.restoreCategory(id).then(res => {
        this.$message({
          type: 'success',
          message: res.success
        });
        this.reRenderFormData();
      }).catch(error => {
        this.$message.error('Khôi phục thất bại !');
        console.error('App: ', error);
      });
    },
    handleTrash(id) {
      this.$confirm('Xác nhận chuyển nhóm danh mục phụ vào thùng rác ?', 'Xác nhận', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        // code logic ...
        this.trashCategory(id).then(res => {
          this.$message({
            type: 'success',
            message: res.success
          });
          this.reRenderFormData();
        }).catch(error => {
          this.$message.error('Không chuyển được vào thùng rác !');
          console.error('App Error: ', error);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Đã hủy chuyển thùng rác !'
        });
      });
    },
    handleDestroy(id) {
      this.$confirm('Xác nhận xóa vĩnh viễn nhóm danh mục phụ này ?', 'Xác nhận', {
        confirmButtonText: 'Agree',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        // Code logic
        this.destroyCategory(id).then(res => {
          this.$message({
            type: 'success',
            message: res.success
          });
          this.reRenderFormData();
        }).catch(error => {
          this.$message.error('Xóa vĩnh viễn thất bại !');
          console.error('App Error: ', error);
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
        this.$message.error('Vui lòng chọn ích nhất một nhóm danh mục !');
        return;
      }
      this.$confirm('Xác nhận xóa vĩnh viễn danh sách nhóm danh mục phụ này ?', 'Xác nhận', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        // code logic ...
        this.massDestroyCategory(ids).then(res => {
          this.$message({
            type: 'success',
            message: res.success
          });
          this.reRenderFormData();
        }).catch(error => {
          this.$message.error('Không xóa vĩnh viễn được danh sách nhóm danh mục !');
          console.error('App Error: ', error);
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
        this.$message.error('Vui lòng chọn ích nhất một nhóm danh mục phụ !');
        return;
      }
      this.$confirm('Xác nhận chuyển danh sách nhóm danh mục phụ này vào thùng rác ?', 'Xác nhận', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        // code logic ...
        this.massTrashCategory(ids).then(res => {
          this.$message({
            type: 'success',
            message: res.success
          });
          this.reRenderFormData();
        }).catch(error => {
          this.$message.error('Chuyển vào thùng rác không thành công !');
          console.error('App Error: ', error);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Đã hủy chuyển thùng rác !'
        });
      });
    },
    handleMassRestore() {
      let ids = this.multipleSelection.map(item => item.id);
      if (!ids.length) {
        this.$message.error('Vui lòng chọn ích nhất một nhóm danh mục !');
        return;
      }
      this.$confirm('Xác nhận khôi phục danh sách nhóm danh mục phụ này ?', 'Xác nhận', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        // code logic ...
        this.massRestoreCategory(ids).then(res => {
          this.$message({
            type: 'success',
            message: res.success
          });
          this.reRenderFormData();
        }).catch(error => {
          this.$message.error('Khôi phục thất bại !');
          console.error('App Error: ', error);
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
        name: 'update-category',
        params: { id }
      });
    },
    reRenderFormData() {
      this.tableAction = '';
      if (! this.tableData.length || this.$route.query.form === 'success') {
        if (! this.isTabTrashed) { this.getList() }
        else { this.getListTrashed(); }
        let query = Object.assign({}, this.$route.query);
        delete query.form;
        this.$router.replace({ query });
      };
    }
  }
}
</script>