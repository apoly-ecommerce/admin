<template>
  <address>
    <strong class="address-type">{{ address.address_type }}</strong>
    <p v-if="$props.address.address_line_1">
      {{ $props.address.address_line_1 }}
    </p>
    <p v-if="$props.address.address_line_2">
      {{ $props.address.address_line_2 }}
    </p>
    <p v-if="$props.address.state">
      {{ $props.address.state.name }}
    </p>
    <p v-if="$props.address.city">
      {{ $props.address.city }}
    </p>
    <p v-if="$props.address.country">
      {{ $props.address.country.name }}
    </p>
    <p v-if="$props.address.phone">
      Phone: {{ $props.address.phone }}
    </p>
  </address>
</template>

<script>
export default {
  props: {
    address: {
      type: Object,
      default: () => {}
    }
  }
}
</script>