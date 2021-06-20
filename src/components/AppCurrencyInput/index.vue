<template>
  <el-input ref="input" :placeholder="placeholder" :value="formattedValue" v-currency="options" @input="handleInput">
    <template slot="prepend">VNĐ</template>
  </el-input>
</template>

<script>
import { setValue, parse as parseCurrency } from "vue-currency-input";

export default {
  props: {
    placeholder: {
      type: String,
      default: 'Money'
    },
    value: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      formattedValue: null
    };
  },
  computed: {
    options() {
      return {
        currency: "VND",
        locale: "vi",
        distractionFree: false,
        allowNegative: false
      };
    }
  },
  watch: {
    value(value) {
      this.setValue(value);
    }
  },
  mounted() {
    this.setValue(this.value);
  },
  methods: {
    setValue(value) {
      setValue(this.$refs.input, value);
    },
    handleInput(value) {
      this.$emit("input", parseCurrency(value, this.options));
      this.formattedValue = value;
    }
  }
};
</script>
