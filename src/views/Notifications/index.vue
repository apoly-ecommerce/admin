<template>
  <section class="PageNotification">
    <page-table-content :tableName="tableName">

      <template v-slot:tools>
        <el-button
          type="danger"
          size="mini"
          @click="massDestroy"
        >
          <i class="el-icon-delete" />
          <small>XÓA TẤT CẢ</small>
        </el-button>
      </template>

      <template v-slot:main-content>
        <section class="TableBox_Content">
          <el-table
            :data="tableData"
            style="width: 100%"
            emptyText="Empty data !"
            v-loading="listLoading"
          >
            <el-table-column label="Thông báo" width="900">
              <template slot-scope="{row}">
                <element-notification :type="row.type" :data="row.data"/>
              </template>
            </el-table-column>

            <el-table-column label="Thời gian" width="200">
              <template slot-scope="{row}">
                <div>{{ fromNow(row.created_at) }}</div>
              </template>
            </el-table-column>

            <el-table-column label="Xóa" align="right">
              <template slot-scope="{row}">
                <el-button @click="destroy(row.id)" size="mini" icon="el-icon-delete" />
              </template>
            </el-table-column>
          </el-table>
        </section>
      </template>
    </page-table-content>
  </section>
</template>

<script>
import ElementNotification from '@/components/ElementNotification';
import PageTableContent from '@/components/PageTableContent';
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';

export default {
  components: {
    PageTableContent,
    ElementNotification
  },
  data() {
    return {
      tableName: 'Danh sách thông báo',
      listLoading: false,
    };
  },
  watch: {
    $route() {
      this.getList();
    }
  },
  created() {
    this.getList();
  },
  computed: {
    ...mapGetters({
      'tableData': 'notification/getNotifications'
    }),
  },
  methods: {
    ...mapActions({
      'fetchNotifications': 'notification/fetchNotifications',
      'markAllNotificationsAsRead': 'notification/markAllNotificationsAsRead',
      'destroyNotification': 'notification/destroyNotification',
      'destroyAllNotification' : 'notification/destroyAllNotification'
    }),
    fromNow(dateStr) {
      return moment(dateStr).locale('vi').fromNow();
    },
    async getList() {
      this.listLoading = true;
      await Promise.all([ this.fetchNotifications(), this.markAllNotificationsAsRead() ]);
      this.listLoading = false;
    },
    destroy(id) {
      this.$confirm('Xác nhận xóa vĩnh viễn thông báo này ?', 'Xác nhận', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        this.destroyNotification(id)
        .then(res => {
          this.$message({
            type: 'success',
            message: res.success
          });
        })
        .catch(err => {
          this.$message.error('Xóa vĩnh viễn thất bại !');
          console.error('[App Error] => ', err);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Đã hủy xóa vĩnh viễn !'
        });
      });
    },
    massDestroy() {
      this.$confirm('Xác nhận xóa tất cả thông báo', 'Xác nhận', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        this.destroyAllNotification()
        .then(res => {
          this.$message({
            type: 'success',
            message: res.success
          });
        })
        .catch(err => {
          this.$message.error('Xóa thất bại !');
          console.error('[App Error] => ', err);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Đã hủy xóa toàn bộ !'
        });
      });
    }
  }
}
</script>