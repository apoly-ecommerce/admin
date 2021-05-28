<template>
  <section class="PageRole">

    <router-view :key="key"></router-view>

    <page-table-content
      :tableName="tableName"
    >

      <template v-slot:tools>
        <el-button size="mini" @click="handleSwichTabRole">{{ tableName === 'List Role' ? 'Role Trashed' : 'List Role' }}</el-button>
        <router-link class="Table__tools-item" :to="{ name: 'add-role' }">Add Role</router-link>
      </template>

      <template v-slot:actions>
        <el-select v-model="tableActions" size="mini" style="margin-right: 4px; width: 100px;" placeholder="Action">
          <template v-if="tableName == 'List Role'">
            <el-option :value="'trash'">
              <i class="el-icon-delete-solid"></i>
              <span>Trash</span>
            </el-option>
          </template>
          <template v-else>
            <el-option :value="'restore'">
              <i class="el-icon-refresh-left"></i>
              <span>Restore</span>
            </el-option>
          </template>
          <el-option :value="'delete'">
            <i class="el-icon-close"></i>
            <span>Delete</span>
          </el-option>
        </el-select>
        <el-button v-if="tableActions" @click="handleTableAction" size="mini" type="primary">Append</el-button>
      </template>

      <template v-slot:supports>
        <el-button class="m-1" type="primary" size="mini" plain>PDF</el-button>
        <el-button class="m-1" type="primary" size="mini" plain>EXCEL</el-button>
        <el-button class="m-1" type="primary" size="mini" plain>PRINT</el-button>
      </template>

      <template v-slot:filters>
        <section v-if="tableSearch && tableSearch.options.length" class="SearchForm">
          <div class="d-flex">
            <el-select class="el-FormControl_custom" v-model="tableSearch.optionSelected" placeholder="Select">
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
            :data="roleDataSearch"
            style="width: 100%"
            emptyText="Empty data !"
            v-loading="listLoading"
            @selection-change="handleSelectionChange"
          >

            <el-table-column type="selection" width="55" />

            <el-table-column type="expand">
              <template slot-scope="props">
                <div class="ExpandData_Table">
                  <div v-if="props.row.created_at" class="ExpandData__Item">
                    <strong>Created at:</strong>
                    <span>{{ formatTime(props.row.created_at) }}</span>
                  </div>
                  <div v-if="props.row.updated_at" class="ExpandData__Item">
                    <strong>Updated at:</strong>
                    <span>{{ formatTime(props.row.created_at) }}</span>
                  </div>
                  <div v-if="props.row.deleted_at" class="ExpandData__Item">
                    <strong>Deleted at:</strong>
                    <span>{{ formatTime(props.row.created_at) }}</span>
                  </div>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="Name" property="name" width="550" sortable>
              <template slot-scope="{row}">
                <p class="role-name">{{ row.name }}</p>
                <small class="role-description">{{ row.description }}</small>
              </template>
            </el-table-column>

            <el-table-column label="Users" property="users_count" width="100" sortable>
              <template slot-scope="{row}">
                <el-tag size="mini">
                  {{ row.users_count || 0 }}
                </el-tag>
              </template>
            </el-table-column>

            <el-table-column label="Type" property="public" width="100" sortable>
              <template slot-scope="{row}">
                <small>{{ row.public == 1 ? 'Merchant' : 'Platform' }}</small>
              </template>
            </el-table-column>

            <el-table-column label="Role level" property="level" width="120" sortable>
              <template slot-scope="{row}">
                <el-tag type="info" size="mini">
                  {{ row.level }}
                </el-tag>
              </template>
            </el-table-column>

            <el-table-column label="Options" align="right">
              <template slot-scope="{row}">
                <el-button-group>
                  <template v-if="!row.deleted_at">
                    <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
                    <el-button @click="handleTrashRole(row.id)" size="mini" type="danger" icon="el-icon-delete"></el-button>
                  </template>
                  <template v-else>
                    <el-button @click="handleRestoreRole(row.id)" size="mini" type="primary" icon="el-icon-refresh-left"></el-button>
                    <el-button @click="handleDestroyRole(row.id)" size="mini" type="danger" icon="el-icon-close"></el-button>
                  </template>
                </el-button-group>
              </template>
            </el-table-column>

          </el-table>
        </section>

        <template>
          <pagination v-if="handleConditionPaginate('List Role')" :total="totalRole" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getListRole" />
          <pagination v-if="handleConditionPaginate('Role Trashed')" :total="totalRole" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getListRoleTrash" />
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
import { mapActions } from 'vuex';
// Utils
import { parseTime } from '@/utils/functions';

export default {
  components: {
    PageTableContent,
    Pagination,
  },
  data() {
    return {
      listRole: [],
      totalRole: 0,
      listLoading: true,
      tableName: 'List Role',
      listQuery: {
        limit: 10,
        page: 1
      },
      tableSearch: {
        value: '',
        options: [
          { name: 'Name', value: 'name', placeholder: 'Enter the name' },
          { name: 'Level', value: 'level', placeholder: 'Enter the role level' },
          { name: 'Description', value: 'description', placeholder: 'Enter the role description' }
        ],
        optionSelected: 'name'
      },
      multipleSelection: [],
      tableActions: ''
    };
  },
  watch: {
    $route() {
      this.getListRole();
    }
  },
  created() {
    this.getListRole();
  },
  computed: {
    key() {
      return this.$route.path;
    },
    getPlaceholderSearch() {
       let optionCurrent = this.tableSearch.options.filter(item => item.value === this.tableSearch.optionSelected);
      return optionCurrent[0]['placeholder'];
    },
    roleDataSearch() {
      const { value, optionSelected } = this.tableSearch;
      let searchResult = this.listRole.filter(item => {
        return !value || !item[optionSelected] || (item[optionSelected].toString().toLowerCase()).includes(value.toLowerCase());
      });
      return searchResult;
    },
  },
  methods: {
    ...mapActions({
      'fetchListRole': 'role/fetchListRole',
      'fetchListRoleTrashed': 'role/fetchListRoleTrashed',
      'trashRole': 'role/trashRole',
      'restoreRole': 'role/restoreRole',
      'destroyRole': 'role/destroyRole',
      'massTrashRole': 'role/massTrashRole',
      'massDestroyRole': 'role/massDestroyRole',
      'massRestoreRole': 'role/massRestoreRole'
    }),
    handleSwichTabRole() {
      this.listQuery.page = 1;
      if (this.tableName === 'List Role') {
        this.getListRoleTrash();
      } else {
        this.getListRole();
      }
    },
    handleConditionPaginate(tableName) {
      return tableName === this.tableName && this.totalRole > 0;
    },
    formatTime(time) {
      return parseTime(time);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getListRole() {
      this.listLoading = true;
      this.fetchListRole(this.listQuery).then(res => {
        this.listLoading = false;
        this.listRole  = res.data;
        this.totalRole = res.total;
        this.tableName = 'List Role';
      }).catch(error => {
        this.listLoading = false;
        console.error('App: ', error);
      });
    },
    getListRoleTrash() {
      this.listLoading = true;
      this.fetchListRoleTrashed(this.listQuery).then(res => {
        this.listLoading = false;
        this.listRole  = res.data;
        this.totalRole = res.total;
        this.tableName = 'Role Trashed';
      }).catch(error => {
        this.listLoading = false;
        console.error('App: ', error);
      });
    },
    handleRestoreRole(roleId) {
      // code logic ...
      this.restoreRole(roleId).then(res => {
        this.$message({
          type: 'success',
          message: res.success
        });
        this.getListRoleTrash();
      }).catch(error => {
        this.$message.error('Failed to restore Role !');
        console.error('App: ', error);
      })
    },
    handleTrashRole(roleId) {
      this.$confirm('Are you sure you want to move role to the trash ?', 'Confirm', {
        confirmButtonText: 'Agree',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        // code logic ...
        this.trashRole(roleId).then(res => {
          this.$message({
            type: 'success',
            message: res.success
          });
          this.getListRole();
        }).catch(error => {
          this.$message.error('Failed to move Role to trash !');
          console.error('App: ', error);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Move trash canceled !'
        });
      });
    },
    handleDestroyRole(roleId) {
      this.$confirm('Are you sure to delete this role ?', 'Confirm', {
        confirmButtonText: 'Agree',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        // code logic ...
        this.destroyRole(roleId).then(res => {
          this.$message({
            type: 'success',
            message: res.success
          });
          this.getListRoleTrash();
        }).catch(error => {
          this.$message.error('Failed to permanent deletion Role !');
          console.error('App: ', error);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Permanent deletion canceled !'
        });
      });
    },
    handleTableAction() {
      if (this.tableActions === 'delete') {
        this.handleMassDestroyRole();
        return;
      }
      if (this.tableActions === 'trash') {
        this.handleMassTrashRole();
        return;
      }
      if (this.tableActions === 'restore') {
        this.handleMassRestoreRole();
        return;
      }
    },
    handleMassDestroyRole() {
      let roleIds = this.multipleSelection.map(item => item.id);
      if (!roleIds.length) {
        this.$message.error('Please select at least one role !');
        return;
      }
      this.$confirm('Are you sure you want to permanently delete the role list?', 'Confirm', {
        confirmButtonText: 'Agree',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        // code logic ...
        this.massDestroyRole(roleIds).then(res => {
          this.$message({
            type: 'success',
            message: res.success
          });
          if (this.tableName === 'List Role') {
            this.getListRole();
          } else {
            this.getListRoleTrash();
          }
        }).catch(error => {
          this.$message.error('Deleting the role list failed !');
          console.error('App: ', error);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Move trash canceled !'
        });
      });
    },
    handleMassTrashRole() {
      let roleIds = this.multipleSelection.map(item => item.id);
      if (!roleIds.length) {
        this.$message.error('Please select at least one role !');
        return;
      }
      this.$confirm('Are you sure you want to move the list of roles to the trash ?', 'Confirm', {
        confirmButtonText: 'Agree',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        // code logic ...
        this.massTrashRole(roleIds).then(res => {
          this.$message({
            type: 'success',
            message: res.success
          });
          this.getListRole();
        }).catch(error => {
          this.$message.error('Moved list of roles in to trash failed !');
          console.error('App: ', error);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Move trash canceled !'
        });
      });
    },
    handleMassRestoreRole() {
      let roleIds = this.multipleSelection.map(item => item.id);
      if (!roleIds.length) {
        this.$message.error('Please select at least one role !');
        return;
      }
      this.$confirm('Are you sure you want to restore the role list ?', 'Confirm', {
        confirmButtonText: 'Agree',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        // code logic ...
        this.massRestoreRole(roleIds).then(res => {
          this.$message({
            type: 'success',
            message: res.success
          });
          this.getListRoleTrash();
        }).catch(error => {
          this.$message.error('Restore list of roles failed !');
          console.error('App: ', error);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Restore canceled !'
        });
      });
    },
    handleEditRole() {

    }
  }
}
</script>