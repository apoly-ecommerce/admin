<template>
  <section class="AddressWidget-top">
    <section class="AddressWidget-left">
      <div class="thumbnail">
        <img :src="$props.address.addressable.image" alt="Avatar">
      </div>
    </section>
    <section class="AddressWidget-right">
      <div class="content">
        <div class="address-type">{{ $props.address.addressable_type }}: {{ $props.address.addressable.name }}</div>
        <div class="address-info-text">Email: {{ $props.address.addressable.email }}</div>
        <template v-if="$props.address.addressable.primaryAddress">
          <div class="address-info-text">Phone: {{ $props.address.addressable.primaryAddress.phone || 'Không có' }}</div>
          <div class="address-info-text">Zip/Postal Code: {{ $props.address.addressable.primaryAddress.zip_code ||'Không có' }}</div>
        </template>
        <el-button @click="isShowDialog = true" class="p-1 btn-view-detail" size="mini">Chi tiết</el-button>
      </div>
    </section>
    <template v-if="$props.address.addressable_type">
      <view-user
        v-if="$props.address.addressable_type === 'user'"
        :isShow="isShowDialog"
        :user="$props.address.addressable"
        @close="isShowDialog = false"
      />
      <view-customer
        v-if="$props.address.addressable_type === 'customer'"
        :isShow="isShowDialog"
        :customer="$props.address.addressable"
        @close="isShowDialog = false"
      />
    </template>
  </section>
</template>

<script>
import ViewUser from '@/views/Users/Components/ViewUser';
import ViewCustomer from '@/views/Customers/components/ViewCustomer';

export default {
  name: 'user-info',
  components: {
    ViewUser,
    ViewCustomer
  },
  props: {
    address: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isShowDialog: false
    }
  }
}
</script>