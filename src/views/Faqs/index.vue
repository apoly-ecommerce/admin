<template>
  <section class="PageFaq">
    <router-view :key="key"></router-view>

    <el-row :gutter="5">
      <el-col :span="7" class="p-1">
        <page-table-content :tableName="'TOPICS'">
          <template v-slot:tools>
            <router-link class="Table__tools-item" :to="{ name: 'add-faq-topic' }">Add Topic</router-link>
          </template>
          <template v-slot:main-content>
            <section class="TableBox_Content">
              <el-table
                :data="faqTopics"
                style="width: 100%"
                emptyText="Empty data !"
                v-loading="listFaqTopicLoading"
              >
                <el-table-column label="Name" prop="name" width="150">
                  <template slot-scope="{row}">
                    <div class="line-txt-top">{{ row.name }}</div>
                  </template>
                </el-table-column>

                <el-table-column label="For" prop="for">
                  <template slot-scope="{row}">
                    <div class="line-txt-top">{{ row.for }}</div>
                  </template>
                </el-table-column>

                <el-table-column label="Options" align="right">
                  <template slot-scope="{row}">
                    <el-button-group>
                      <el-tooltip content="Chỉnh sửa" placement="top">
                        <el-button @click="handleEditFaqTopic(row.id)" size="mini" icon="el-icon-edit" />
                      </el-tooltip>
                      <el-tooltip content="Xóa vĩnh viễn" placement="top">
                        <el-button @click="handleDestroyFaqTopic(row.id)" size="mini" icon="el-icon-delete" />
                      </el-tooltip>
                    </el-button-group>
                  </template>
                </el-table-column>
              </el-table>
            </section>
          </template>
        </page-table-content>
      </el-col>
      <el-col :span="17" class="p-1">
        <page-table-content :tableName="'FAQS'">
          <template v-slot:tools>
            <router-link class="Table__tools-item" :to="{ name: 'add-faq' }">Add Faq</router-link>
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
                  <i class="SearchForm__Icon fas fa-search"></i>
                  <el-input class="el-FormControl_custom" :placeholder="getPlaceholderSearch" v-model="tableSearch.value" autocomplete="off" spellcheck="false"></el-input>
                </div>
              </div>
            </section>
          </template>

          <template v-slot:main-content>
            <section class="TableBox_Content">
              <el-table
                :data="dataSearchFaq"
                style="width: 100%"
                emptyText="Empty data !"
                v-loading="listFaqLoading"
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
                    </div>
                  </template>
                </el-table-column>

                <el-table-column label="Detail" width="650">
                  <template slot-scope="{row}">
                    <div class="line-txt-top">
                      <strong>{{ row.question }}</strong>
                      <p class="raw-content" v-html="row.answer"/>
                    </div>
                  </template>
                </el-table-column>

                <el-table-column label="Topic">
                  <template slot-scope="{row}">
                    <div class="line-txt-top">{{ row.topic.name }}</div>
                  </template>
                </el-table-column>

                <el-table-column label="Options" align="right">
                  <template slot-scope="{row}">
                    <el-button-group>
                      <el-tooltip content="Chỉnh sửa" placement="top">
                        <el-button @click="handleEditFaq(row.id)" size="mini" icon="el-icon-edit" />
                      </el-tooltip>
                      <el-tooltip content="Xóa vĩnh viễn" placement="top">
                        <el-button @click="handleDestroyFaq(row.id)" size="mini" icon="el-icon-delete" />
                      </el-tooltip>
                    </el-button-group>
                  </template>
                </el-table-column>
              </el-table>
            </section>

            <template v-if="faqs && faqs.length">
              <pagination :total="totalRowFaq" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getListFaq" />
            </template>
          </template>
        </page-table-content>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import PageTableContent from '@/components/PageTableContent';
import Pagination from '@/components/Pagination';
import { mapGetters, mapActions } from 'vuex';
import { parseTime } from '@/utils/functions';

export default {
  components: {
    PageTableContent,
    Pagination,
  },
  data() {
    return {
      listFaqTopicLoading: false,
      listFaqLoading: false,
      isTabFaqTrashed: false,
      totalRowFaq: 0,
      listQuery: {
        limit: 10,
        page: 1
      },
      tableSearch: {
        value: '',
        options: [
          { name: 'Câu hỏi', value: 'question', placeholder: 'Nhập câu hỏi' },
          { name: 'Câu trả lời', value: 'answer', placeholder: 'Nhập câu trả lời' },
        ],
        optionSelected: 'question'
      },
    };
  },
  watch: {
    $route(to, from) {
      this.reRenderDataFromUrl();
    }
  },
  created() {
    this.getListFaq();
    this.getListFaqTopic();
  },
  computed: {
    ...mapGetters({
      'faqTopics': 'faq/getFaqTopics',
      'faqs': 'faq/getFaqs'
    }),
    key() {
      return this.$route.path;
    },
    getPlaceholderSearch() {
      let optionCurrent = this.tableSearch.options.filter(item => item.value === this.tableSearch.optionSelected);
      return optionCurrent[0]['placeholder'];
    },
    dataSearchFaq() {
      const { value, optionSelected } = this.tableSearch;
      let searchResult = this.faqs.filter(item => {
        return !value || !item[optionSelected] || (item[optionSelected].toString().toLowerCase()).includes(value.toLowerCase());
      });
      return searchResult;
    },
  },
  methods: {
    ...mapActions({
      'fetListFaqTopic': 'faq/fetListFaqTopic',
      'fetchListFaqByPaginate': 'faq/fetchListFaqByPaginate',
      'destroyFaqTopic': 'faq/destroyFaqTopic',
      'destroyFaq': 'faq/destroyFaq'
    }),
    formatTime(time) {
      return parseTime(time);
    },
    getListFaq() {
      this.listFaqLoading = true;
      this.fetchListFaqByPaginate(this.listQuery).then(res => {
        this.listFaqLoading  = false;
        this.isTabFaqTrashed = false;
        this.totalRowFaq     = res.total;
      }).catch(error => {
        this.listFaqLoading = false;
        console.error('[App Error] => ', error);
      });
    },
    getListFaqTopic() {
      this.listFaqTopicLoading = true;
      this.fetListFaqTopic().then(res => {
        this.listFaqTopicLoading  = false;
      }).catch(error => {
        this.listFaqTopicLoading = false;
        console.error('[App Error] => ', error);
      });
    },
    handleEditFaqTopic(id) {
      this.$router.push({
        name: 'edit-faq-topic',
        params: { id },
      });
    },
    handleDestroyFaqTopic(id) {
      this.$confirm('Xác nhận xóa vĩnh viễn phần tử này ?', 'Xác nhận', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        this.destroyFaqTopic(id).then(res => {
          this.$message({
            type: 'success',
            message: res.success
          });
        }).catch(error => {
          if (error.status === 422) {
            this.$message.error(error.data.data.error);
          }
          else {
            this.$message.error('Xóa vĩnh viễn thất bại !');
            console.error('[App Error] => ', error);
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Đã hủy xóa vĩnh viễn !'
        });
      });
    },
    handleEditFaq(id) {
      this.$router.push({
        name: 'edit-faq',
        params: { id },
      });
    },
    handleDestroyFaq(id) {
      this.$confirm('Xác nhận xóa vĩnh viễn phần tử này ?', 'Xác nhận', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        this.destroyFaq(id).then(res => {
          this.$message({
            type: 'success',
            message: res.success
          });
          this.reRenderDataFaqFromFormAction();
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
    reRenderDataFaqFromFormAction() {
      if (this.faqs.length === 0) {
        this.getListFaq();
      }
    },
    reRenderDataFromUrl() {
      if (this.$route.query.form === 'success') {
        this.getListFaq();
        this.getListFaqTopic();
        let query = Object.assign({}, this.$route.query);
        delete query.form;
        this.$router.replace({ query });
      };
    }
  }
}
</script>