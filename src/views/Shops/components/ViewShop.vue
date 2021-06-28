<template>
  <section v-if="isShow" class="DialogView_Components">
    <section class="Dialog_Wrap">
      <button @click="close" class="Dialog_Control-Close el-icon-circle-close"></button>
      <section class="Dialog_Content">
        <section class="DialogInfo-top">
          <el-row :gutter="5">
            <el-col :span="7" class="p-1">
              <div class="thumbnail-avatar">
                <img :src="shop.logo_image" alt="Feature image">
              </div>
            </el-col>
            <el-col :span="17" class="p-1">
              <table class="ViewAll-info">
                <tbody>
                  <tr>
                    <th class="text-right">Tên:</th>
                    <td style="width: 75%">
                      <span>{{ shop.name }}</span>
                    </td>
                  </tr>
                  <tr>
                    <th class="text-right">Chủ nhân:</th>
                    <td style="width: 75%">{{ shop.owner.name }}</td>
                  </tr>
                  <tr>
                    <th class="text-right">Trạng thái</th>
                    <td style="width: 75%">{{ shop.active }}</td>
                  </tr>
                  <tr>
                    <th class="text-right">Thành viên từ:</th>
                    <td style="width: 75%">{{ fromNow(shop.created_at) }}</td>
                  </tr>
                  <tr>
                    <th class="text-right">Cập nhật cuối cùng:</th>
                    <td style="width: 75%">{{ formatDate(shop.updated_at) }}</td>
                  </tr>
                </tbody>
              </table>
            </el-col>
          </el-row>
        </section>
        <section class="DialogInfo-bottom">
          <el-tabs type="border-card">
            <el-tab-pane label="THÔNG TIN CƠ BẢN">
              <table class="Basic-info">
                <tbody>
                  <tr>
                    <th>Legal name:</th>
                    <td>{{ shop.legal_name ? shop.legal_name : 'Không có' }}</td>
                  </tr>
                  <tr>
                    <th>Slug:</th>
                    <td>{{ shop.slug ? shop.slug : 'Không có' }}</td>
                  </tr>
                  <tr>
                    <th>External url:</th>
                    <td>{{ shop.external_url ? shop.external_url : 'Không có' }}</td>
                  </tr>
                </tbody>
              </table>
            </el-tab-pane>
            <el-tab-pane label="CẤU HÌNH">
              <table>
                <tbody>
                  <tr>
                    <th>Phone hỗ trợ:</th>
                    <td>{{ shop.config.support_phone ? shop.config.support_phone : 'Không có' }}</td>
                  </tr>
                  <tr>
                    <th>Email hỗ trợ:</th>
                    <td>{{ shop.config.support_email ? shop.config.support_email : 'Không có' }}</td>
                  </tr>
                  <tr>
                    <th>Cấu hình được cập nhật lúc:</th>
                    <td>{{ formatDate(shop.config.updated_at) }}</td>
                  </tr>
                </tbody>
              </table>
            </el-tab-pane>
            <el-tab-pane label="MÔ TẢ">
                <article class="content" v-html="shop.description" />
            </el-tab-pane>
            <el-tab-pane label="LIÊN HỆ">
              <table>
                <tbody>
                  <tr>
                    <th>Email:</th>
                    <td>{{ shop.email ? shop.email : 'Không có' }}</td>
                  </tr>
                  <tr>
                    <th>Address:</th>
                    <td>
                      <div v-if="shop.primaryAddress">
                        <p v-if="shop.primaryAddress.address_line_1">
                          {{ shop.primaryAddress.address_line_1 }}
                        </p>
                        <p v-if="shop.primaryAddress.address_line_2">
                          {{ shop.primaryAddress.address_line_2 }}
                        </p>
                        <p v-if="shop.primaryAddress.state_id">
                          {{ shop.primaryAddress.state.name }}
                        </p>
                        <p v-if="shop.primaryAddress.city">
                          {{ shop.primaryAddress.city }}
                        </p>
                        <p v-if="shop.primaryAddress.country">
                          {{ shop.primaryAddress.country.name }}
                        </p>
                        <p v-if="shop.primaryAddress.phone">
                          Phone: {{ shop.primaryAddress.phone }}
                        </p>
                      </div>
                      <div v-else>Không có</div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="checkAddressExists(shop.primaryAddress)" class="GoogleMap">
                <iframe width="100%" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" :src="`https://maps.google.it/maps?q=${toGeocodeString(shop.primaryAddress)}&output=embed`"></iframe>
              </div>
            </el-tab-pane>
          </el-tabs>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import moment from 'moment';
import { checkAddressExists, toGeocodeString } from '@/helpers';

export default {
  name: 'view-shop',
  props: {
    shop: { type: Object, default: {} },
    isShow: { type: Boolean, default: false }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    fromNow(dateStr) {
      return moment(dateStr).locale('vi').fromNow();
    },
    formatDate(dateStr) {
      if (!dateStr) return 'Không có';
      return moment(dateStr).locale('vi').format('DD-MM-YYYY');
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

<style src="@/styles/app/dialog-view-detail.css"></style>