<template>
  <div class="tab-msg-skeleton">
    <div v-for="item in count" :key="item">
      <div class="d-flex align-items-center">
        <pk-skeleton style="margin: 10px;" circle height="55px" width="55px"/>
        <div class="w-100 d-flex flex-column justify-content-center">
          <div style="margin-bottom: 3px;" class="d-flex justify-content-between align-items-center">
            <pk-skeleton width="130px"/>
            <pk-skeleton width="40px" style="margin-right: 3px;"/>
          </div>
          <pk-skeleton width="170px"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Skeleton } from 'vue-loading-skeleton';

export default {
  components: {
    'pk-skeleton': Skeleton
  },
  props: ['count']
}
</script>