<template>
  <section class="PageFaq">
    <router-view :key="key" />

    <el-row :gutter="5">
      <el-col :span="7" class="p-1">
        <table-faq-topic
          :formData="formDataFaqTopics"
          :isLoading="listFaqTopicLoading"
        />
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

            <template v-if="formDataFaqs && formDataFaqs.length">
              <pagination :total="totalFaq" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList(faqs)" />
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
import TableFaqTopic from './components/TableFaqTopic';
import { mapGetters, mapActions } from 'vuex';
import { formatTime } from '@/helpers';

export default {
  components: {
    PageTableContent,
    TableFaqTopic,
    Pagination,
  },
  data() {
    return {
      listFaqTopicLoading: false,
      listFaqLoading: false,
      isTabFaqTrashed: false,
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
    $route() {
      this.reRenderDataFromUrl();
    }
  },
  created() {
    this.getList(this.faqs);
    this.getList(this.faqTopics);
  },
  computed: {
    ...mapGetters({
      'formDataFaqTopics': 'faq/getFaqTopics',
      'formDataFaqs': 'faq/getFaqs',
      'totalFaq': 'faq/getTotalFaq'
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
      let searchResult = this.formDataFaqs.filter(item => {
        return !value || !item[optionSelected] || (item[optionSelected].toString().toLowerCase()).includes(value.toLowerCase());
      });
      return searchResult;
    },
  },
  methods: {
    ...mapActions({
      'fetListFaqTopic': 'faq/fetListFaqTopic',
      'fetchListFaqByPaginate': 'faq/fetchListFaqByPaginate',
      'destroyFaq': 'faq/destroyFaq'
    }),
    formatTime(time) {
      return formatTime(time);
    },
    async faqs() {
      this.listFaqLoading = true;
      await this.fetchListFaqByPaginate(this.listQuery)
      this.listFaqLoading  = false;
    },
    async faqTopics() {
      this.listFaqTopicLoading = true;
      await this.fetListFaqTopic();
      this.listFaqTopicLoading = false;
    },
    async getList(callback) {
      try {
        await callback();
      } catch (err) {
        console.error('[App Error] => ', err);
      }
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
      if (!this.formDataFaqs.length) {
        this.getList(this.faqs).then(() => {
          this.listQuery.page = 1;
        });
      }
    },
    async reRenderDataFromUrl() {
      if (this.$route.query.form === 'success') {
        await Promise.all([ this.getList(this.faqs), this.getList(this.faqTopics) ]);
        let query = Object.assign({}, this.$route.query);
        delete query.form;
        this.$router.replace({ query });
      };
    }
  }
}
</script>