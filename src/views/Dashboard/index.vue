<template>
  <section class="PageDashboard">
    <panel-group />
    <section class="index-module_grip">
      <b-row class="index-module_row row">

        <b-col cols="8" class="index-module_col"></b-col>

        <b-col cols="4" class="index-module_col"></b-col>

      </b-row>
    </section>
  </section>
</template>

<script>
// Components
import PanelGroup from '@/components/PanelGroup';
export default {
  name: 'Dashboard',
  components: {
    PanelGroup
  }
}
</script>
<style>
  .PageDashboard .index-module_info {
    background-color: var(--app-color);
    box-shadow: 0 1px 1px rgb(0 0 0 / 10%);
    display: flex;
    align-items: center;
  }
  .index-module_info .index-module_info__icon {
    width: 90px;
    flex: 0 0 90px;
    height: 90px;
    font-size: 2.0rem;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .index-module_info .module_info--yellow {
    background-color: #f39c12;
  }
  .index-module_info .module_info--aqua {
    background-color: #00c0ef;
  }
  .index-module_info .module_info--green {
    background-color: #00a65a;
  }
  .index-module_info .module_info--red {
    background-color: #dd4b39;
  }
  .index-module_info .index-module_info__content {
    width: 100%;
    height: 90px;
    padding: 5px 10px;
  }
  .index-module_info__content .module_info__text {
    font-size: .85rem;
    color: var(--second-color);
  }
  .module_info__number {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .module_info__number .value {
    color: var(--second-color);
    font-weight: bold;
    padding: 4px 0;
  }
  .module_info__number .view {
    color: #72afd2;
    padding-left: 5px;
  }
  .index-module_info__content .progress {
    height: 12px;
    font-size: .6rem;
    line-height: 1.3;
    border-radius: 0;
    margin-top: 6px;
    margin-bottom: 6px;
  }
  .module_info__process--desc {
    color: #777;
    font-size: .7rem;
  }
</style>