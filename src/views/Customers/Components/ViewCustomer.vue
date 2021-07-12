<template>
  <section v-if="isShow" class="DialogView_Components">
    <section class="Dialog_Wrap" style="width: 600px;">
      <button @click="close" class="Dialog_Control-Close el-icon-circle-close"></button>
      <section class="Dialog_Content">
        <section class="DialogInfo-top">
          <section class="DialogCover">
            <section class="BackgroundCover-fullSize">
              <img :src="customer.image" alt="">
            </section>
            <section class="UserStatus">
              <h3 class="user-type">Customer</h3>
              <h5 class="user-status">{{ customer.active ? 'Active' : 'Inactive' }}</h5>
            </section>
            <section class="UserProfile">
              <img :src="customer.image" alt="">
              <section class="UserUsername">{{ customer.name }}</section>
            </section>
          </section>
        </section>
        <section class="DialogInfo-middle">
          <el-row :gutter="5">
            <el-col :span="8">
              <div class="middle-heading">ĐÃ CHI</div>
              <div class="middle-content">{{ formatCurrency(customer.total_spent) }}</div>
            </el-col>
            <el-col :span="8">
              <div class="middle-heading">THAM GIA TỪ</div>
              <div class="middle-content">{{ fromNow(customer.created_at) }}</div>
            </el-col>
            <el-col :span="8">
              <div class="middle-heading"># SỐ ĐƠN ĐẶT</div>
              <div class="middle-content">{{ customer.orders_count || 0 }}</div>
            </el-col>
          </el-row>
        </section>
        <section class="DialogInfo-bottom">
          <el-tabs type="border-card">
            <el-tab-pane label="THÔNG TIN CƠ BẢN">
              <table>
                <tbody>
                  <tr>
                    <th>Họ tên:</th>
                    <td>{{ customer.name }}</td>
                  </tr>
                  <tr>
                    <th>Email:</th>
                    <td>{{ customer.email }}</td>
                  </tr>
                  <tr>
                    <th>Sinh nhật:</th>
                    <td>{{ formatDob(customer.dob) }}</td>
                  </tr>
                  <tr>
                    <th>Giới tính:</th>
                    <td>
                      <i v-if="customer.sex === 'male'" class="fas fa-mars"></i>
                      <i v-else class="fas fa-venus"></i>
                      <span>{{ customer.sex === 'male' ? 'Nam' : 'Nữ' }}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>Giới thiệu:</th>
                    <td>{{ customer.description || 'Không có' }}</td>
                  </tr>
                </tbody>
              </table>
            </el-tab-pane>
            <el-tab-pane label="DANH SÁCH ĐỊA CHỈ">
              <div class="AddressesList">
                <div
                  v-for="(address, index) in customer.addresses"
                  :key="index"
                >
                  <comp-address-content
                    :address="address"
                  />
                </div>
              </div>
              <google-map-iframe
                :address="customer.primaryAddress"
              />
            </el-tab-pane>
            <el-tab-pane v-if="userAuth.is_from_platform" label="ĐƠN ĐẶT HÀNG MỚI NHẤT">
              <el-table
                ref="latest_orders"
                :data="customer.latest_orders"
                emptyText="Không có đơn hàng nào !"
              >
                <el-table-column label="#Order" prop="code" width="100">
                  <template slot-scope="{row}">
                    <span>{{ row.code }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="Grand total" prop="total" width="120">
                  <template slot-scope="{row}">
                    <span>{{ row.total }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="Payment" prop="payment" width="100">
                  <template slot-scope="{row}">
                    <el-tag type="danger" size="mini" effect="dark">{{ row.payment }}</el-tag>
                  </template>
                </el-table-column>

                <el-table-column label="Status" prop="status" width="150">
                  <template slot-scope="{row}">
                    <el-tag type="danger" size="mini" effect="dark">{{ row.status }}</el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import { formatCurrency } from '@/helpers';
import GoogleMapIframe from '@/components/GoogleMapIframe';
import CompAddressContent from '@/components/CompAddressContent';

export default {
  name: 'view-customer',
  components: {
    'google-map-iframe': GoogleMapIframe,
    'comp-address-content': CompAddressContent
  },
  props: {
    customer: {
      type: Object,
      default: {}
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      'userAuth': 'auth/getUserAuth'
    })
  },
  methods: {
    close() {
      this.$emit('close');
    },
    formatDob(dateStr) {
      return moment(dateStr).locale('vi').format('DD-MM-YYYY');
    },
    fromNow(dateStr) {
      return moment(dateStr).locale('vi').fromNow();
    },
    formatCurrency(number) {
      return formatCurrency(number);
    }
  }
}
</script>

<style src="@/styles/app/dialog-view-detail.css"></style>
<style>
.Dialog_Content {
  overflow: hidden;
}
.DialogCover {
  height: 160px;
  width: 100%;
  background: #f00;
  overflow: hidden;
  position: relative;
}
.DialogCover .BackgroundCover-fullSize img {
    -webkit-filter: blur(20px);
    -moz-filter: blur(20px);
    -o-filter: blur(20px);
    -ms-filter: blur(20px);
    filter: blur(20px);
    margin-left: -100px;
    margin-top: -200px;
    min-width: 130%;
}
.DialogCover .UserProfile {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.DialogCover .UserStatus {
  position: absolute;
  top: 0;
  left: 0;
  color: #fff;
  padding: 10px;
}
.DialogCover .UserStatus .user-type {
  font-weight: 300;
  font-size: 1.6rem;
}
.DialogCover .UserStatus .user-status {
  font-weight: 300;
  font-size: 1rem;
}
.DialogCover .UserProfile img {
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  overflow: hidden;
  padding: 5px;
  background: #fff;
}
.DialogCover .UserProfile .UserUsername {
  padding: 5px;
  font-size: 1.3rem;
  line-height: 1;
  color: #262626;
}
.DialogInfo-bottom .el-tag {
  height: 21px;
  line-height: 18px;
  padding: 0 8px;
}
.DialogInfo-bottom .description * {
  font-size: .9rem;
  padding: 3px 0;
}
.DialogInfo-bottom .GoogleMap iframe {
  width: 100%;
}
.DialogInfo-bottom .GoogleMap {
  width: 100%;
  overflow: hidden;
  height: 350px;
}
.DialogInfo-middle {
  padding: 5px 0;
  text-align: center;
}
.DialogInfo-middle .middle-heading {
  font-size: .8rem;
}
.DialogInfo-middle .middle-content {
  font-size: .8rem;
  font-weight: 500;
  padding: 5px;
}
.AddressesList address {
  font-size: .8rem;
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 0;
}
.AddressesList address:last-child {
  border: none;
}
.AddressesList address strong {
  text-transform: uppercase;
  float: right;
}
.el-table__empty-block {
  width: 100%!important;
}
</style>