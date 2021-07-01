<template>
  <section v-if="isShow" class="DialogView_Components">
    <section class="Dialog_Wrap">
      <button @click="close" class="Dialog_Control-Close el-icon-circle-close"></button>
      <section class="Dialog_Content">
        <section class="DialogInfo-top">
          <el-row :gutter="5">
            <el-col :span="7" class="p-1">
              <div class="thumbnail-avatar">
                <img :src="manufacturer.logo_image" alt="Feature image">
              </div>
            </el-col>
            <el-col :span="17" class="p-1">
              <table class="ViewAll-info">
                <tbody>
                  <tr>
                    <th class="text-right">Name:</th>
                    <td style="width: 75%">
                      <span>{{ manufacturer.name }}</span>
                    </td>
                  </tr>
                  <tr v-if="manufacturer.country">
                    <th class="text-right">Country:</th>
                    <td style="width: 75%">
                      <span>{{ manufacturer.country.name }}</span>
                    </td>
                  </tr>
                  <tr>
                    <th class="text-right">Status:</th>
                    <td style="width: 75%">
                      <span>{{ manufacturer.active ? 'Active' : 'Inactive' }}</span>
                    </td>
                  </tr>
                  <tr>
                    <th class="text-right">Available from:</th>
                    <td style="width: 75%">
                      <span>{{ formatDate(manufacturer.created_at) }}</span>
                    </td>
                  </tr>
                  <tr>
                    <th class="text-right">Last update:</th>
                    <td style="width: 75%">
                      <span>{{ formatDate(manufacturer.updated_at) }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </el-col>
          </el-row>
        </section>
        <section class="DialogInfo-bottom">
          <el-tabs type="border-card">
            <el-tab-pane label="Description">
              <article class="description" v-html="manufacturer.description" />
            </el-tab-pane>
            <el-tab-pane label="Contact">
              <table>
                <tr>
                  <th>Email:</th>
                  <td>{{ manufacturer.email }}</td>
                </tr>
                <tr>
                  <th>Phone:</th>
                  <td>{{ manufacturer.phone }}</td>
                </tr>
              </table>
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
  name: 'view-manufacturer',
  props: {
    manufacturer: {
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
    formatDate(dateStr) {
      if (!dateStr) return 'Không có';
      return moment(dateStr).locale('vi').format('DD-MM-YYYY');
    },
  }
}
</script>

<style src="@/styles/app/dialog-view-detail.css"></style>