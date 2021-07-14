<template>
  <div class="MsgContactSearch">
    <div class="FormContactsControl">
      <el-input
        placeholder="Tìm kiếm ..."
        prefix-icon="el-icon-search"
        autocomplete="off"
        spellcheck="false"
        v-model="strContactSearch"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      strContactSearch: ''
    };
  },
  watch: {
    strContactSearch(data) {
      this.handleContactSearch(data);
    }
  },
  methods: {
    ...mapActions({
      'handleContactSearch': 'message/handleContactSearch'
    })
  }
}
</script>