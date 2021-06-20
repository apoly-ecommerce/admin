<template>
  <section v-if="isShow" class="DialogView_Components">
    <section class="Dialog_Wrap" style="width: 600px;">
      <button @click="close" class="Dialog_Control-Close el-icon-circle-close"></button>
      <section class="Dialog_Content">
        <section class="DialogInfo-top">
          <section class="DialogCover">
            <section class="BackgroundCover-fullSize">
              <img :src="user.image" alt="">
            </section>
            <section class="UserProfile">
              <img :src="user.image" alt="">
              <section class="UserUsername">{{ user.name }}</section>
            </section>
          </section>
        </section>
        <section class="DialogInfo-bottom">
          <el-tabs type="border-card">
            <el-tab-pane label="THÔNG TIN CƠ BẢN">
              <table>
                <tbody>
                  <tr>
                    <th>Họ tên:</th>
                    <td>{{ user.name }}</td>
                  </tr>
                  <tr>
                    <th>My Shop:</th>
                    <td>{{ user.shop && user.shop.length ? user.shop.name : 'Không có' }}</td>
                  </tr>
                  <tr>
                    <th>Quyền:</th>
                    <td>
                      <el-tag type="primary">{{ user.role.name }}</el-tag>
                    </td>
                  </tr>
                  <tr>
                    <th>Sinh nhật:</th>
                    <td>{{ formatDob(user.dob) }}</td>
                  </tr>
                  <tr>
                    <th>Giới tính:</th>
                    <td>
                      <i v-if="user.sex === 'male'" class="fas fa-mars"></i>
                      <i v-else class="fas fa-venus"></i>
                      <span>{{ user.sex === 'male' ? 'Nam' : 'Nữ' }}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>Trạng thái:</th>
                    <td>
                      <el-tag v-if="user.active" effect="dark" type="success" size="mini">Active</el-tag>
                      <el-tag v-else type="warning" effect="dark" size="mini">Inactive</el-tag>
                    </td>
                  </tr>
                  <tr>
                    <th>Member since:</th>
                    <td>{{ fromNow(user.created_at) }}</td>
                  </tr>
                </tbody>
              </table>
            </el-tab-pane>
            <el-tab-pane label="MÔ TẢ BẢN THÂN">
              <article class="description">{{ user.description }}</article>
            </el-tab-pane>
            <el-tab-pane label="THÔNG TIN LIÊN HỆ">
              <table>
                <tbody>
                  <tr>
                    <th>Email:</th>
                    <td>{{ user.email ? user.email : 'Không có' }}</td>
                  </tr>
                  <tr>
                    <th>Phone:</th>
                    <td>{{ user.phone ? user.phone : 'Không có' }}</td>
                  </tr>
                  <tr v-if="user.primaryAddress">
                    <th>Address:</th>
                    <td>
                      <p v-if="user.primaryAddress.address_line_1">
                        {{ user.primaryAddress.address_line_1 }}
                      </p>
                      <p v-if="user.primaryAddress.address_line_2">
                        {{ user.primaryAddress.address_line_2 }}
                      </p>
                      <p v-if="user.primaryAddress.state_id">
                        {{ user.primaryAddress.state.name }}
                      </p>
                      <p v-if="user.primaryAddress.city">
                        {{ user.primaryAddress.city }}
                      </p>
                      <p v-if="user.primaryAddress.country">
                        {{ user.primaryAddress.country.name }}
                      </p>
                      <p v-if="user.primaryAddress.phone">
                        P: {{ user.primaryAddress.phone }}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="checkAddressExists(user.primaryAddress)" class="GoogleMap">
                <iframe width="100%" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" :src="`https://maps.google.it/maps?q=${toGeocodeString(user.primaryAddress)}&output=embed`"></iframe>
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

export default {
  name: 'view-user',
  props: {
    user: {
      type: Object,
      default: {}
    },
    isShow: {
      type: Boolean,
      default: false
    }
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
    toGeocodeString(address) {
      let data = [];
      if (!address) return;
      if (address.address_line_1) {
        data.push(address.address_line_1);
      }
      if (address.address_line_2) {
        data.push(address.address_line_2);
      }
      if (address.city) {
        data.push(address.city);
      }
      if (address.state_id) {
        data.push(address.state.name);
      }
      if (address.zip_code) {
        data.push(address.zip_code);
      }
      if (address.country_id) {
        data.push(address.country.name);
      }
      let str = data.join(', ');
      let result = str.replaceAll(' ', '+');
      return result;
    },
    checkAddressExists(address) {
      if (!address) return;
      if (
        (address.address_line_1 || address.address_line_2) &&
        address.city && address.state_id && address.zip_code && address.country_id
      ) {
        return true;
      } else return false;
    }
  }
}
</script>

<style src="@/styles/app/dialog-view-detail.css"></style>
<style scoped>
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
.DialogInfo-bottom .el-tag[data-v-463d4298] {
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
</style>