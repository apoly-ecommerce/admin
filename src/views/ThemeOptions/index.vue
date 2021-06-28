<template>
  <section class="PageThemeOption">

    <router-view :key="key"></router-view>

    <page-table-content :tableName="tableName">
      <template v-slot:main-content>
        <section class="TableBox_Content">
          <el-table
            ref="multipleTable"
            :data="tableData"
            style="width: 100%"
            emptyText="Empty data !"
            v-loading="listLoading"
          >
            <el-table-column label="Options" prop="options" width="300">
              <template slot-scope="{row}">
                <div class="line-txt-top">
                  <strong>{{ row.option }}</strong>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="Values" prop="values">
              <template slot-scope="{row}">
                <h5 class="line-txt-top">
                  <el-tag
                    v-for="(value, index) in row.values"
                    :key="index"
                    size="mini"
                    type="info"
                    class="m-1"
                  >{{ value }}</el-tag>
                </h5>
              </template>
            </el-table-column>

            <el-table-column label="Options" align="right">
              <template slot-scope="{row}">
                <el-tooltip content="Chỉnh sửa" placement="top">
                  <el-button @click="handleEdit(row.id)" size="mini" icon="el-icon-edit" />
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </section>
      </template>
    </page-table-content>
  </section>
</template>

<script>
import PageTableContent from '@/components/PageTableContent';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    PageTableContent,
  },
  data() {
    return {
      listLoading: false,
      tableName: 'Theme Options',
    };
  },
  created() {
    this.getList();
  },
  computed: {
    ...mapGetters({
      'featured_brands': 'theme/getFeaturedBrands',
      'trending_categories': 'theme/getTrendingCategories'
    }),
    key() {
      return this.$route.path;
    },
    tableData() {
      return [
        {
          id: 1,
          option: 'Featured brands',
          values: this.featured_brands
        },
        {
          id: 2,
          option: 'Trending now categories',
          values: this.trending_categories
        }
      ];
    }
  },
  methods: {
    ...mapActions({
        'fetchListThemeOptions': 'theme/fetchListThemeOptions',
    }),
    getList() {
      this.listLoading = true;
      this.fetchListThemeOptions(this.listQuery).then(res => {
        this.listLoading  = false;
        this.totalRow = res.total;
      }).catch(error => {
        this.listLoading = false;
        console.error('[App Error] => ', error);
      });
    },
    handleEdit(id) {
      if (id === 1) {
        this.$router.push({
          name: 'update-featured-brands',
        });
      }
      else {
        this.$router.push({
          name: 'update-trending-now-categories',
        });
      }
    },
  }
}
</script>