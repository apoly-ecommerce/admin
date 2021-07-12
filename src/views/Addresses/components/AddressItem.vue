<template>
  <el-row>
    <el-col :span="12" class="col-item p-1">
      <div class="d-flex justify-content-between h-100 position-relative">
        <comp-address-content :address="address" />
        <div class="d-flex flex-column justify-content-end h-100">
          <el-button-group>
            <el-button @click="edit(address.id)" size="mini" icon="el-icon-edit" />
            <el-button v-if="address.address_type !== 'Primary'" @click="destroy(address.id)" size="mini" icon="el-icon-delete" />
          </el-button-group>
        </div>
      </div>
    </el-col>
    <el-col :span="12" class="col-item p-1">
      <google-map-iframe :address="address" />
    </el-col>
  </el-row>
</template>

<script>
import { mapActions } from 'vuex';
import GoogleMapIframe from '@/components/GoogleMapIframe';
import CompAddressContent from '@/components/CompAddressContent';

export default {
  name: 'address-item',
  components: {
    'google-map-iframe': GoogleMapIframe,
    'comp-address-content': CompAddressContent
  },
  props: {
    address: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    ...mapActions({
      'destroyAddress': 'address/destroyAddress'
    }),
    edit(id) {
      this.$router.push({
        name: 'edit-address',
        params: { id }
      });
    },
    destroy(id) {
      this.$confirm('Xác nhận xóa vĩnh viễn địa chỉ này ?', 'Xác nhận', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        this.destroyAddress(id).then(res => {
          this.$message({
            type: 'success',
            message: res.success
          });
          this.$emit('success');
        }).catch(err => {
          this.$message.error('Xóa vĩnh viễn thất bại !');
          console.error('[App Error] => ', err);
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