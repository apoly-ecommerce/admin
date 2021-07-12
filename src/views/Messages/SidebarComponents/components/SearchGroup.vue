<template>
  <section class="SearchGroup-wrap">
    <section class="SearchControl">
      <el-input
        placeholder="Tìm kiếm"
        prefix-icon="el-icon-search"
        auto-complete="off"
        spellcheck="false"
        v-model="strSearch"
      />
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      strSearch: ''
    }
  }
}
</script>