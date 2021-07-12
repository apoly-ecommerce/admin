<template>
  <div>
    <div v-if="type === 'default'">
      <router-link to="/dashboard">
        <i class="icon fa fa-bell" />
        <span class="text">Thông báo chưa đọc</span>
      </router-link>
    </div>

    <div v-if="type === 'password_updated'">
      <router-link to="/dashboard">
        <i class="icon fa fa-lock" />
        <span class="text">Mật khẩu đã được thay đổi!</span>
      </router-link>
    </div>

    <div v-if="type === 'profile_updated'">
      <router-link to="/dashboard">
        <i class="icon fa fa-bell">Cập nhật tài khoản thành công!</i>
        <span class="text"></span>
      </router-link>
    </div>

    <div v-if="type === 'send_login_info'">
      <router-link to="/dashboard">
        <i class="icon fa fa-cogs" />
        <span class="text">Thông tin đăng nhập đã được gửi đến địa chỉ email của bạn</span>
      </router-link>
    </div>

    <div v-if="type === 'shop_config_updated'">
      <router-link to="/dashboard">
        <i class="icon fa fa-wrench" />
        <span class="text">Cấu hình cửa hàng đã được cập nhật!</span>
      </router-link>
    </div>

    <div v-if="type === 'shop_created'">
      <router-link to="/dashboard">
        <i class="icon fa fa-building" />
        <span class="text">Cửa hàng {{ data.name }} đã được tạo</span>
      </router-link>
    </div>

    <div v-if="type === 'shop_down_for_maintenance'">
      <router-link to="/dashboard">
        <i class="icon fa fa-powerff" />
        <span class="text">Đã tắt hoặc động cửa hàng</span>
      </router-link>
    </div>

    <div v-if="type === 'shop_up_for_maintenance'">
      <router-link to="/dashboard">
        <i class="icon fa fa-heart" />
        <span class="text">Đã bậc hoặc động cửa hàng</span>
      </router-link>
    </div>

    <div v-if="type === 'shop_updated'">
      <router-link to="/dashboard">
        <i class="icon fa fa-bell" />
        <span class="text">Thông tin cửa hàng đã được cập nhật!</span>
      </router-link>
    </div>

    <div v-if="type === 'system_config_updated'">
      <router-link to="/dashboard">
        <i class="icon fa fa-cogs" />
        <span class="text">Đã cập nhật cấu hình hệ thống!</span>
      </router-link>
    </div>

    <div v-if="type === 'system_info_updated'">
      <router-link to="/dashboard">
        <i class="icon fa fa-warning" />
        <span class="text">Thông tin hệ thống được cập nhật!</span>
      </router-link>
    </div>

    <div v-if="type === 'system_is_down'">
      <router-link to="/dashboard">
        <i class="icon fa fa-powerff" />
        <span class="text">Đã bật hoặc động hệ thống</span>
      </router-link>
    </div>

    <div v-if="type === 'system_is_up'">
      <router-link to="/dashboard">
        <i class="icon fa fa-heart" />
        <span class="text">Đã tắt hoặc động hệ thống</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['type', 'data']
}
</script>