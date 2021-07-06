<template>
  <div class="d-flex flex-column" :class="`justify-content-${$props.align} align-items-${$props.align}`">
    <label for="address" class="FormLabel" style="margin-bottom: 8px">
      <span class="FormLabel__title">ADDRESS</span>
      <el-tooltip v-if="$props.tooltip" class="item" effect="dark" :content="$props.tooltip" placement="top">
        <i class="fas fa-question-circle"></i>
      </el-tooltip>
    </label>
    <template v-if="$props.address && Object.keys($props.address).length">
      <address class="address">
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
      <el-button class="d-block" type="primary" size="mini" @click="handleUpdate">
        <i class="fas fa-map-marker-alt"></i>
        <small>UPDATE ADDRESS</small>
      </el-button>
    </template>
    <el-button v-else class="d-block" type="primary" size="mini" @click="handleCreate">
      <i class="fas fa-map-marker-alt"></i>
      <small>ADD ADDRESS</small>
    </el-button>
  </div>
</template>

<script>
export default {
  props: {
    address: {
      type: Object,
      default: () => {}
    },
    tooltip: {
      type: String,
      default: ''
    },
    align: {
      type: String,
      default: 'start'
    },
    addressableType: {
      type: String,
      default: ''
    },
    addressableId: {
      type: Number,
      default: null
    },
    redirect: {
      type: String,
      default: ''
    }
  },
  computed: {
    addressUrl() {
      return `/address/addresses/${this.$props.addressableType}/${this.$props.addressableId}`;
    }
  },
  methods: {
    handleCreate() {
      this.$router.push({
        path: `${this.addressUrl}/add`,
        query: {
          back_to: this.$props.redirect
        }
      });
    },
    handleUpdate() {
      this.$router.push({
        path: `${this.addressUrl}/edit/${this.$props.address.id}`,
        query: {
          back_to: this.$props.redirect
        }
      });
    }
  }
}
</script>
<style scoped>
.address {
  font-size: .8rem;
  color: #333;
  margin-bottom: 10px;
  background: #f7f7f7;
  padding: 5px 8px;
  border-radius: 3px;
  border: 1px solid #e9e9e9;
  line-height: 1.5;
}
</style>