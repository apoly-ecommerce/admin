<template>
  <div class="msg-filters-bar">
    <el-select v-model="optionSelected" placeholder="Select">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      optionSelected: '1',
      options: [
        { label: 'Tất cả tin nhắn', value: '1'},
        { label: 'Tin nhắn chưa đọc', value: '2'},
      ],
    }
  }
}
</script>