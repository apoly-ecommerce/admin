<template>
  <section class="PageAddress">
    <router-view :key="key" />
    <section v-if="addressInfo" class="PageContainer">
      <user-info
         v-if="isAddressOfCustomerOrUser"
         :address="addressInfo"
      />
      <section class="AddressWidget-bottom">
        <page-table-content :tableName="tableName">
          <template v-slot:tools>

            <router-link
              class="Table__tools-item"
              :to="{ name: 'add-address' }"
            >
              <span>Thêm mới</span>
            </router-link>

          </template>
          <template v-slot:main-content>
            <section class="Addresses-Content">
              <div
                v-for="(address, index) in addressInfo.addresses"
                :key="index"
                :gutter="5"
                class="AddressInfo-item"
              >
                <address-item
                  :address="address"
                  @success="reRenderDataFromFormAction"
                />
              </div>
            </section>
          </template>
        </page-table-content>
      </section>
    </section>
  </section>
</template>

<script>
import PageTableContent from '@/components/PageTableContent';
import AddressItem from './components/AddressItem';
import UserInfo from './components/UserInfo';
import { mapActions } from 'vuex';

export default {
  components: {
    PageTableContent,
    UserInfo,
    AddressItem,
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
    reRenderDataFromFormAction() {
      this.formSetup();
    },
    reRenderDataFromUrl() {
      if (this.$route.query.form === 'success') {
        this.formSetup().then(() => {
          let query = Object.assign({}, this.$route.query);
          delete query.form;
          this.$router.replace({ query });
        });
      };
    }
  }
}
</script>
<style src="@/styles/app/address-page.css"></style>