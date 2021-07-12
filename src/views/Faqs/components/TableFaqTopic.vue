<template>
  <page-table-content :tableName="tableName">
    <template v-slot:tools>
      <router-link class="Table__tools-item" :to="{ name: 'add-faq-topic' }">Add Topic</router-link>
    </template>
    <template v-slot:main-content>
      <section class="TableBox_Content">
        <el-table
          :data="formData"
          style="width: 100%"
          emptyText="Empty data !"
          v-loading="isLoading"
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
                  <el-button @click="edit(row.id)" size="mini" icon="el-icon-edit" />
                </el-tooltip>
                <el-tooltip content="Xóa vĩnh viễn" placement="top">
                  <el-button @click="destroy(row.id)" size="mini" icon="el-icon-delete" />
                </el-tooltip>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </template>
  </page-table-content>
</template>

<script>
import PageTableContent from '@/components/PageTableContent';
import { mapActions } from 'vuex';

export default {
  name: 'table-faq-topic',
  components: {
    PageTableContent,
  },
  props: {
    formData: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      tableName: 'TOPICS',
    };
  },
  methods: {
    ...mapActions({
      'destroyFaqTopic': 'faq/destroyFaqTopic',
    }),
    edit(id) {
      this.$router.push({
        name: 'edit-faq-topic',
        params: { id },
      });
    },
    destroy(id) {
      this.$confirm('Xác nhận xóa vĩnh viễn phần tử này ?', 'Xác nhận', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        this.destroyFaqTopic(id)
        .then(res => {
          this.$message({
            type: 'success',
            message: res.success
          });
        })
        .catch(err => {
          if (err.status === 422) {
            this.$message.error(err.data.data.error);
          } else {
            this.$message.error('Xóa vĩnh viễn thất bại !');
            console.error('[App Error] => ', err);
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Đã hủy xóa vĩnh viễn !'
        });
      });
    }
  }
}
</script>