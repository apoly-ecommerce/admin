<template>
  <section class="PageCategorySubGroup">

    <router-view :key="key" />

    <page-table-content :tableName="tableName">
      <template v-slot:tools>
        <template>
          <el-button v-if="isTabTrashed" size="mini" @click="getList(list)">
            <i class="fas fa-list"></i>
            <span>Danh sách</span>
          </el-button>
          <el-button v-else size="mini" @click="getList(trashed)">
            <i class="fas fa-trash"></i>
            <span>Thùng rác</span>
          </el-button>
        </template>
        <router-link class="Table__tools-item" :to="{ name: 'add-category-sub-group' }">Thêm mới</router-link>
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
          v-if="isTabTrashed && tableData.length"
          class="m-1"
          type="danger"
          size="mini"
          @click="emptyTrash"
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

            <el-table-column type="selection" width="55" />

            <el-table-column label="Cover image" prop="cover_image" width="150">
              <template slot-scope="{row}">
                <div class="TableThumb_ThumbImage normal">
                  <img :src="row.cover_image" alt="" class="image medium">
                </div>
              </template>
            </el-table-column>

            <el-table-column label="Category sub-group" prop="name" width="300" sortable>
              <template slot-scope="{row}">
                <h5 class="line-txt-top">
                  <span>{{ row.name }}</span>
                </h5>
              </template>
            </el-table-column>

            <el-table-column label="Parent" prop="group" width="200" sortable>
              <template slot-scope="{row}">
                <h5 class="line-txt-top">
                  <span>{{ row.group.name }}</span>
                </h5>
              </template>
            </el-table-column>

            <el-table-column label="Categories" prop="categories_count" width="150" sortable>
              <template slot-scope="{row}">
                <el-tag type="success" size="mini">
                  {{ row.categories_count || 0 }}
                </el-tag>
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
                    <el-tooltip content="Chỉnh sửa" placement="top">
                      <el-button @click="edit(row.id)" size="mini" icon="el-icon-edit" />
                    </el-tooltip>
                    <el-tooltip content="Chuyển vào thùng rác" placement="top">
                      <el-button @click="trash(row.id)" size="mini" icon="el-icon-delete" />
                    </el-tooltip>
                  </template>
                  <template v-else>
                    <el-tooltip content="Khôi phục" placement="top">
                      <el-button @click="restore(row.id)" size="mini" icon="el-icon-refresh-left" />
                    </el-tooltip>
                    <el-tooltip content="Xóa vĩnh viễn" placement="top">
                      <el-button @click="destroy(row.id)" size="mini" icon="el-icon-close" />
                    </el-tooltip>
                  </template>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </section>

        <template v-if="tableData && tableData.length">
          <pagination v-if="!isTabTrashed" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList(list)" />
          <pagination v-else :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList(trashed)" />
        </template>
      </template>
    </page-table-content>
  </section>
</template>

<script>
import PageTableContent from '@/components/PageTableContent';
import Pagination from '@/components/Pagination';
import { mapGetters, mapActions } from 'vuex';
import { formatTime } from '@/helpers';

export default {
  components: {
    PageTableContent,
    Pagination,
  },
  data() {
    return {
      listLoading: false,
      isTabTrashed: false,
      tableName: 'Danh sách nhóm danh mục phụ',
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
    $route() {
      this.reRenderDataFromUrl();
    }
  },
  created() {
    this.getList(this.list);
  },
  computed: {
    ...mapGetters({
      'tableData': 'categorySubGroup/getCategorySubGroups',
      'total': 'categorySubGroup/getTotal'
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
        'fetchListCategorySubGroupByPaginate': 'categorySubGroup/fetchListCategorySubGroupByPaginate',
        'trashCategorySubGroup': 'categorySubGroup/trashCategorySubGroup',
        'massTrashCategorySubGroup': 'categorySubGroup/massTrashCategorySubGroup',
        'fetchListCategorySubGroupTrashedByPaginate': 'categorySubGroup/fetchListCategorySubGroupTrashedByPaginate',
        'destroyCategorySubGroup': 'categorySubGroup/destroyCategorySubGroup',
        'massDestroyCategorySubGroup': 'categorySubGroup/massDestroyCategorySubGroup',
        'restoreCategorySubGroup': 'categorySubGroup/restoreCategorySubGroup',
        'massRestoreCategorySubGroup': 'categorySubGroup/massRestoreCategorySubGroup',
        'emptyTrashCategorySubGroup': 'categorySubGroup/emptyTrashCategorySubGroup'
    }),
    formatTime(time) {
      return formatTime(time);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    edit(id) {
      this.$router.push({
        name: 'edit-category-sub-group',
        params: { id }
      });
    },
    handleTableAction() {
      if (this.tableAction === 'Trash') {
        return this.massTrash();
      }
      if (this.tableAction === 'Delete') {
        return this.massDestroy();
      }
      if (this.tableAction === 'Restore') {
        return this.massRestore();
      }
    },
    async list() {
      await this.fetchListCategorySubGroupByPaginate(this.listQuery);
      this.isTabTrashed = false;
    },
    async trashed() {
      await this.fetchListCategorySubGroupTrashedByPaginate(this.listQuery);
      this.isTabTrashed = true;
    },
    async getList(callback) {
      this.listLoading = true;
      try {
        await callback();
        this.listLoading = false;
      } catch (err) {
        this.listLoading = false;
        console.error('[App Error] => ', err);
      }
    },
    restore(id) {
      this.restoreCategorySubGroup(id)
      .then(res => {
        this.$message({
          type: 'success',
          message: res.success
        });
        this.reRenderDataFromFormAction();
      })
      .catch(error => {
        this.$message.error('Khôi phục thất bại !');
        console.error('App: ', error);
      });
    },
    trash(id) {
      this.$confirm('Xác nhận chuyển nhóm danh mục phụ vào thùng rác ?', 'Xác nhận', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        this.trashCategorySubGroup(id)
        .then(res => {
          this.$message({
            type: 'success',
            message: res.success
          });
          this.reRenderDataFromFormAction();
        })
        .catch(error => {
          this.$message.error('Không chuyển được vào thùng rác !');
          console.error('[App Error] => ', error);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Đã hủy chuyển thùng rác !'
        });
      });
    },
    destroy(id) {
      this.$confirm('Xác nhận xóa vĩnh viễn nhóm danh mục phụ này ?', 'Xác nhận', {
        confirmButtonText: 'Agree',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.destroyCategorySubGroup(id)
        .then(res => {
          this.$message({
            type: 'success',
            message: res.success
          });
          this.reRenderDataFromFormAction();
        })
        .catch(error => {
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
    massDestroy() {
      let ids = this.multipleSelection.map(item => item.id);
      if (!ids.length) {
        return this.$message.error('Vui lòng chọn ích nhất một nhóm danh mục !');
      }
      this.$confirm('Xác nhận xóa vĩnh viễn danh sách nhóm danh mục phụ này ?', 'Xác nhận', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        this.massDestroyCategorySubGroup(ids)
        .then(res => {
          this.$message({
            type: 'success',
            message: res.success
          });
          this.reRenderDataFromFormAction();
        })
        .catch(error => {
          this.$message.error('Không xóa vĩnh viễn được danh sách nhóm danh mục !');
          console.error('[App Error] => ', error);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Đã hủy xóa vĩnh viễn !'
        });
      });
    },
    massTrash() {
      let ids = this.multipleSelection.map(item => item.id);
      if (!ids.length) {
        return this.$message.error('Vui lòng chọn ích nhất một nhóm danh mục phụ !');
      }
      this.$confirm('Xác nhận chuyển danh sách nhóm danh mục phụ này vào thùng rác ?', 'Xác nhận', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        this.massTrashCategorySubGroup(ids)
        .then(res => {
          this.$message({
            type: 'success',
            message: res.success
          });
          this.reRenderDataFromFormAction();
        })
        .catch(error => {
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
    massRestore() {
      let ids = this.multipleSelection.map(item => item.id);
      if (!ids.length) {
        return this.$message.error('Vui lòng chọn ích nhất một nhóm danh mục !');
      }
      this.$confirm('Xác nhận khôi phục danh sách nhóm danh mục phụ này ?', 'Xác nhận', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        this.massRestoreCategorySubGroup(ids)
        .then(res => {
          this.$message({
            type: 'success',
            message: res.success
          });
          this.reRenderDataFromFormAction();
        })
        .catch(error => {
          this.$message.error('Khôi phục thất bại !');
          console.error('[App Error] => ', error);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Đã hủy chuyển thùng rác !'
        });
      });
    },
    emptyTrash() {
      this.$confirm('Xác nhận xóa vĩnh viễn toàn bộ dữ liệu trong thùng rác ?', 'Xác nhận', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        this.emptyTrashCategorySubGroup()
        .then(res => {
          this.$message({
            type: 'success',
            message: res.success
          });
          this.getList(this.list);
        })
        .catch(error => {
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
    reRenderDataFromFormAction() {
      this.tableAction = '';
      if (this.tableData.length === 0) {
        this.getList(!this.isTabTrashed ? this.list : this.trashed).then(() => {
          this.listQuery.page = 1;
        });
      }
    },
    reRenderDataFromUrl() {
      if (this.$route.query.form === 'success') {
        this.getList(this.list)
        .then(() => {
          let query = Object.assign({}, this.$route.query);
          delete query.form;
          this.$router.replace({ query });
        });
      };
    }
  }
}
</script>