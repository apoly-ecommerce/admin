<template>
  <section class="UserPage">

    <!-- Nested router of this -->
    <template>
      <router-view :key="key"></router-view>
    </template>

    <!-- Components page table content -->
    <template>
      <page-table-content
        :tableName="'List role'"
        :getPagination="getPagination"
        @eventPagination="handlePagination"
      >

        <!-- Table content slot for tools -->
        <template v-slot:tools>
          <router-link class="Table__tools-item" :to="{ name: 'add-user' }">Add User</router-link>
        </template>

        <!-- Table content slot for supports -->
        <template v-slot:supports>
          <button type="button" class="Button__Item">
            <span>COPY</span>
          </button>
          <button type="button" class="Button__Item">
            <span>CSV</span>
          </button>
          <button type="button" class="Button__Item">
            <span>EXCEL</span>
          </button>
          <button type="button" class="Button__Item">
            <span>PDF</span>
          </button>
          <button type="button" class="Button__Item">
            <span>PRINT</span>
          </button>
        </template>

        <!-- Table content slot for filters -->
        <template v-slot:filters>
          <section v-if="tableSearch && tableSearch.options.length" class="SearchForm">
            <div class="d-flex">
              <select v-model="tableSearch.optionSelected" class="SearchForm__FormSelect">
                <option
                  v-for="(option, index) in tableSearch.options"
                  :key="index"
                  :value="option.value"
                >{{ option.name }}</option>
              </select>
              <div class="SearchForm_FormGroup">
                <fa-icon class="SearchForm__Icon" icon="search" />
                <input type="text"
                  v-model="tableSearch.value"
                  :placeholder="getPlaceholderSearch"
                  name="q" class="SearchForm__FormControl" autocomplete="off" spellcheck="false">
              </div>
            </div>
          </section>
        </template>

        <!-- Table content slot for main content -->
        <template v-slot:main-content>
          <section class="TableBox_Content">

            <el-table
              ref="multipleTable"
              :data="userDataSearch"
              style="width: 100%"
              emptyText="Empty data !"
              @selection-change="handleSelectionChange"
            >

              <el-table-column
                type="selection"
                width="55">
              </el-table-column>

              <el-table-column
                label="Avatar"
                width="120">
                <template>
                  <div class="thumb-iframe">
                    <img src="https://www.gravatar.com/avatar/454141dab8fba2c55bc2d81247a629a4?s=30&d=mm" class="Img-Circle Img-Small" alt="">
                  </div>
                </template>
              </el-table-column>

              <el-table-column
                property="nice_name"
                label="Nice Name"
                width="120"
                sortable>
              </el-table-column>

              <el-table-column
                property="full_name"
                label="Full Name"
                width="200"
                sortable>
              </el-table-column>

              <el-table-column
                property="email"
                label="Email"
                width="250"
                sortable>
              </el-table-column>

              <el-table-column
                property="role"
                label="Role"
                width="100"
                sortable>
              </el-table-column>

              <el-table-column
                property="status"
                label="Status"
                width="120"
                sortable>
              </el-table-column>

              <el-table-column>
                <template>
                  <el-button
                    size="mini"
                  >Profile</el-button>
                  <el-button
                    size="mini"
                  >Edit</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                  >Trash</el-button>
                </template>
              </el-table-column>

            </el-table>

          </section>
        </template>

      </page-table-content>
    </template>

  </section>
</template>

<script>
// Configs Paginate of Page User
import { paginates } from '@/config';

// Components
import PageTableContent from '@/components/PageTableContent';

export default {
  components: {
    PageTableContent,
  },
  data() {
    return {
      tableData: [
        {
          avatar: 'https://www.gravatar.com/avatar/454141dab8fba2c55bc2d81247a629a4?s=30&d=mm',
          nice_name: 'Admin 1',
          full_name: 'Phạm Đình Hùng 4',
          email: 'phamdinhhung2k1.it@gmail.com 1',
          role: 'Admin',
          status: 'Active'
        },
        {
          avatar: 'https://www.gravatar.com/avatar/454141dab8fba2c55bc2d81247a629a4?s=30&d=mm',
          nice_name: 'Admin 2',
          full_name: 'Phạm Đình Hùng 3',
          email: 'phamdinhhung2k1.it@gmail.com 2',
          role: 'Admin',
          status: 'Inactive'
        },
        {
          avatar: 'https://www.gravatar.com/avatar/454141dab8fba2c55bc2d81247a629a4?s=30&d=mm',
          nice_name: 'Admin 3',
          full_name: 'Phạm Đình Hùng 2',
          email: 'phamdinhhung2k1.it@gmail.com 3',
          role: 'Admin',
          status: 'Active'
        },
        {
          avatar: 'https://www.gravatar.com/avatar/454141dab8fba2c55bc2d81247a629a4?s=30&d=mm',
          nice_name: 'Admin 4',
          full_name: 'Phạm Đình Hùng 1',
          email: 'phamdinhhung2k1.it@gmail.com 4',
          role: 'Admin',
          status: 'Inactive'
        },
      ],
      tableSearch: {
        value: '',
        options: [
          {
            name: 'Nice Name',
            value: 'nice_name',
            placeholder: 'Enter the nice name'
          },
          {
            name: 'Full Name',
            value: 'full_name',
            placeholder: 'Enter the full name'
          },
          {
            name: 'Email',
            value: 'email',
            placeholder: 'Enter the email'
          },
          {
            name: 'Role',
            value: 'role',
            placeholder: 'Enter role'
          },
        ],
        optionSelected: 'full_name'
      },
      multipleSelection: [],
      paginateUser: paginates.user,
    };
  },
  computed: {
    key() {
      return this.$route.path;
    },
    getPlaceholderSearch() {
      let optionCurrent = this.tableSearch.options.filter(item => item.value === this.tableSearch.optionSelected);
      return optionCurrent[0]['placeholder'];
    },
    getPagination() {
      return {
        rows: 10,
        perPage: this.paginateUser.perPage,
        options: this.paginateUser.options,
        currentPage: this.paginateUser.currentPage
      };
    },
    userDataSearch() {
      const { value, optionSelected } = this.tableSearch;
      let searchResult = this.tableData.filter(item => {
        return !value || item[optionSelected].toLowerCase().includes(value.toLowerCase());
      });
      return searchResult;
    },
  },
  methods: {
    handlePagination({ page, perPage }) {
      this.paginateUser.currentPage = page;
      this.paginateUser.perPage = perPage;
    },
    handleEditUser() {
      console.log('handle edit user !');
    },
    handleDeleteUser() {
      console.log('handle delete user !')
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
    }
  }
}
</script>