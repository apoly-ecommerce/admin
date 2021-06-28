<template>
  <section class="PageAddress">
    <router-view :key="key"></router-view>

    <section v-if="addressInfo" class="PageContainer">
      <section v-if="isAddressOfCustomerOrUser" class="AddressWidget-top">
        <section class="AddressWidget-left">
          <div class="thumbnail">
            <img :src="addressInfo.addressable.image" alt="Avatar">
          </div>
        </section>
        <section class="AddressWidget-right">
          <div class="content">
            <div class="address-type">{{ addressInfo.addressable_type }}: {{ addressInfo.addressable.name }}</div>
            <div class="address-info-text">Email: {{ addressInfo.addressable.email }}</div>
            <template v-if="addressInfo.addressable.primaryAddress">
              <div class="address-info-text">Phone: {{ addressInfo.addressable.primaryAddress.phone || 'Không có' }}</div>
              <div class="address-info-text">Zip/Postal Code: {{ addressInfo.addressable.primaryAddress.zip_code ||'Không có' }}</div>
            </template>
            <el-button @click="isShowDialog = true" class="p-1 btn-view-detail" size="mini">Chi tiết</el-button>
          </div>
        </section>
      </section>
      <section class="AddressWidget-bottom">
        <page-table-content :tableName="tableName">

        <template v-slot:tools>
          <router-link class="Table__tools-item" :to="{ name: 'add-address' }">Thêm mới</router-link>
        </template>

        <template v-slot:main-content>
          <section class="Addresses-Content">
            <el-row
              v-for="(address, index) in addressInfo.addresses"
              :key="index"
              :gutter="5"
              class="AddressInfo-item"
            >
              <el-col :span="12" class="col-item p-1">
                <div class="d-flex justify-content-between h-100">
                  <address>
                    <p v-if="address.address_line_1">
                      {{ address.address_line_1 }}
                    </p>
                    <p v-if="address.address_line_2">
                      {{ address.address_line_2 }}
                    </p>
                    <p v-if="address.state">
                      {{ address.state.name }}
                    </p>
                    <p v-if="address.city">
                      {{ address.city }}
                    </p>
                    <p v-if="address.country">
                      {{ address.country.name }}
                    </p>
                    <p v-if="address.phone">
                      Phone: {{ address.phone }}
                    </p>
                  </address>
                  <div class="d-flex flex-column justify-content-between h-100">
                    <strong class="type">{{ address.address_type }}</strong>
                    <el-button-group>
                      <el-button @click="handleEdit(address.id)" size="mini" icon="el-icon-edit" />
                      <el-button v-if="address.address_type !== 'Primary'" @click="handleDestroy(address.id)" size="mini" icon="el-icon-delete" />
                    </el-button-group>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="col-item p-1">
                <div v-if="checkAddressExists(address)" class="GoogleMap">
                  <iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" :src="`https://maps.google.it/maps?q=${toGeocodeString(address)}&output=embed`"></iframe>
                </div>
              </el-col>
            </el-row>
          </section>
        </template>
        </page-table-content>
      </section>

      <view-user v-if="addressable_type && addressable_type === 'user'" :isShow="isShowDialog" :user="addressInfo.addressable" @close="isShowDialog = false"/>
      <view-customer v-if="addressable_type && addressable_type === 'customer'" :isShow="isShowDialog" :customer="addressInfo.addressable" @close="isShowDialog = false"/>
    </section>
  </section>
</template>

<script>
import PageTableContent from '@/components/PageTableContent';
import ViewUser from '@/views/Users/Components/ViewUser';
import ViewCustomer from '@/views/Customers/components/ViewCustomer';
import { checkAddressExists, toGeocodeString } from '@/helpers';
import { mapActions } from 'vuex';

export default {
  components: {
    PageTableContent,
    ViewUser,
    ViewCustomer
  },
  data() {
    return {
      tableName: 'Danh sách địa chỉ',
      addressInfo: null,
      addressable_type: this.$route.params.addressable_type,
      addressable_id: this.$route.params.addressable_id,
      isShowDialog: false,
    }
  },
  watch: {
    $route(to, from) {
      this.addressable_type = to.params.addressable_type;
      this.addressable_id   = to.params.addressable_id;
      this.reRenderDataFromUrl();
    }
  },
  created() {
    this.formSetup();
  },
  computed: {
    key() {
      return this.$route.path;
    },
    isAddressOfCustomerOrUser() {
      if (this.addressable_type === 'user' || this.addressable_type === 'customer')
        return true;
      return false;
    }
  },
  methods: {
    ...mapActions({
      'fetchAddressesByAddressable': 'address/fetchAddressesByAddressable',
      'setIsLoading': 'app/handleSetIsLoading',
      'destroyAddress': 'address/destroyAddress'
    }),
    async formSetup() {
      try {
        this.setIsLoading(true);
        if (this.addressable_type && this.addressable_id) {
          const dataAddress = await this.fetchAddressesByAddressable({ addressable_type: this.addressable_type, addressable_id: this.addressable_id });
          this.addressInfo = dataAddress.data;
        }
        this.setIsLoading(false);
      } catch (error) {
        console.error('[App Error] => ', error);
        this.setIsLoading(false);
        if (error.status === 404) {
          this.$confirm('Không tồn tại thông tin địa chỉ này !', 'Thông báo lỗi', {
            confirmButtonText: 'Quay về',
            cancelButtonText: 'Thêm mới',
            type: 'error'
          }).then(() => {
            this.$router.push(`/admin/${this.addressable_type}`);
          }).catch(() => {
            this.$router.push(`/admin/${this.addressable_type}/add`);
          });
        } else {
          this.$message.error('Có lỗi trong quá trình tải dữ liệu !');
          this.$router.push(`/admin/${this.addressable_type}`);
        }
      }
    },
    handleDestroy(id) {
      this.$confirm('Xác nhận xóa vĩnh viễn địa chỉ này ?', 'Xác nhận', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        // Code logic
        this.destroyAddress(id).then(res => {
          this.$message({
            type: 'success',
            message: res.success
          });
          this.reRenderDataFromFormAction();
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
    handleEdit(id) {
      this.$router.push({
        name: 'update-address',
        params: { id }
      });
    },
    reRenderDataFromFormAction() {
      this.tableAction = '';
      if (this.tableData.length === 0) {
        if (! this.isTabTrashed) { this.getList() }
        else { this.getListTrashed(); }
      }
    },
    reRenderDataFromUrl() {
      if (this.$route.query.form === 'success') {
        this.formSetup();
        let query = Object.assign({}, this.$route.query);
        delete query.form;
        this.$router.replace({ query });
      };
    },
    toGeocodeString(address) {
      return toGeocodeString(address);
    },
    checkAddressExists(address) {
      return checkAddressExists(address);
    }
  }
}
</script>
<style src="@/styles/app/address-page.css"></style>