<template>
  <section v-if="isShow" class="DialogView_Components">
    <section class="Dialog_Wrap">
      <button @click="close" class="Dialog_Control-Close el-icon-circle-close"></button>
      <section class="Dialog_Content">
        <section class="DialogInfo-top">
          <el-row :gutter="5">
            <el-col :span="7" class="p-1">
              <div class="thumbnail-avatar">
                <img :src="product.image" alt="Feature image">
              </div>
            </el-col>
            <el-col :span="17" class="p-1">
              <table class="ViewAll-info">
                <tbody>
                  <tr>
                    <th class="text-right">Name:</th>
                    <td style="width: 75%">
                      <span>{{ product.name }}</span>
                    </td>
                  </tr>
                  <tr>
                    <th class="text-right">Brand</th>
                    <td style="width: 75%">{{ product.brand }}</td>
                  </tr>
                  <tr>
                    <th class="text-right">Model number:</th>
                    <td style="width: 75%">{{ product.model_number }}</td>
                  </tr>
                  <tr>
                    <th class="text-right">Status</th>
                    <td style="width: 75%">{{ product.active }}</td>
                  </tr>
                  <tr>
                    <th class="text-right">Created at:</th>
                    <td style="width: 75%">{{ product.created_at }}</td>
                  </tr>
                  <tr>
                    <th class="text-right">Last update:</th>
                    <td style="width: 75%">{{ product.updated_at }}</td>
                  </tr>
                </tbody>
              </table>
            </el-col>
          </el-row>
        </section>
        <section class="DialogInfo-bottom">
          <el-tabs type="border-card">
            <el-tab-pane label="Thông tin cơ bản">
              <table class="Basic-info">
                <tbody>
                  <tr>
                    <th>Yêu cầu vận chuyển:</th>
                    <td>{{ product.requires_shipping ? 'Có' : 'Không' }}</td>
                  </tr>
                  <tr>
                    <th>Nhà cung cấp:</th>
                    <td>{{ product.manufacturer ? product.manufacturer.name : 'Không có' }}</td>
                  </tr>
                  <tr>
                    <th>MPN:</th>
                    <td>{{ product.mpn ? product.mpn : 'Không có' }}</td>
                  </tr>
                  <tr>
                    <th>Danh mục:</th>
                    <td>
                      <div v-if="product.categories">
                        <el-tag
                          v-for="category in product.categories"
                          :key="category.id"
                          size="mini"
                          type="info"
                          class="m-1"
                        >{{ category.name }}</el-tag>
                      </div>
                      <div v-else>Không có</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </el-tab-pane>
            <el-tab-pane label="Bảo hành">
              <table>
                <tbody>
                  <tr>
                    <th>Thời gian bảo hành:</th>
                    <td>{{ product.warranty_period ? product.warranty_period : 'không có' }}</td>
                  </tr>
                  <tr>
                    <th>Hình thức bảo hành:</th>
                    <td>{{ product.warranty_form ? product.warranty_form : 'không có' }}</td>
                  </tr>
                  <tr>
                    <th>Nơi bảo hành</th>
                    <td>{{ product.warranty_place ? product.warranty_place : 'không có' }}</td>
                  </tr>
                </tbody>
              </table>
            </el-tab-pane>
            <el-tab-pane label="Hoàn tiền">
              <table>
                <tr>
                  <th>Phần trăm hoàn tiền:</th>
                  <td>{{ product.percent_refund ? product.percent_refund : 'không có' }}</td>
                </tr>
                <tr>
                  <th>Đổi trả trong vòng:</th>
                  <td>{{ product.return_time ? product.return_time : 'không có' }}</td>
                </tr>
                <tr>
                  <th>Cho phép kiễm tra hàng:</th>
                  <td>{{ product.allow_inspection ? 'Có' : 'Không' }}</td>
                </tr>
              </table>
            </el-tab-pane>
            <el-tab-pane label="Thông tin chi tiết">
              <article class="content" v-html="product.detail_information" />
            </el-tab-pane>
            <el-tab-pane label="Mô tả sản phẩm">
              <article class="content" v-html="product.description" />
            </el-tab-pane>
            <el-tab-pane label="Bộ sưu tập">
              <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="(item, index) in product.media_products" :key="index">
                  <img style="width: 100%; height: 100%; object-fit: cover;" v-if="item.type === 'image'" :src="item.url">
                  <video v-if="item.type === 'video'" style="width: 100%; height: 100%; object-fit: cover;" controls autoplay name="media">
                    <source :src="item.url" type="video/mp4">
                  </video>
                </el-carousel-item>
              </el-carousel>
            </el-tab-pane>
            <el-tab-pane label="Seo">
              <table>
                <tr>
                  <th>Slug:</th>
                  <td>{{ product.slug ? product.slug : 'không có' }}</td>
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
export default {
  name: 'view-product',
  props: {
    product: {
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
    }
  }
}
</script>

<style src="@/styles/app/dialog-view-detail.css"></style>