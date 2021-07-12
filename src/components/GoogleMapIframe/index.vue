<template>
  <div
    v-if="checkAddressExists(address)"
    class="GoogleMap"
  >
    <iframe
      width="100%"
      height="100%"
      frameborder="0"
      scrolling="no"
      marginheight="0"
      marginwidth="0"
      :src="`https://maps.google.it/maps?q=${toGeocodeString(address)}&output=embed`"
    />
  </div>
</template>

<script>
import { checkAddressExists, toGeocodeString } from '@/helpers';

export default {
  props: {
    address: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    toGeocodeString(address) {
      return toGeocodeString(address);
    },
    checkAddressExists(address) {
      return checkAddressExists(address);
    }
  }
}
</script>