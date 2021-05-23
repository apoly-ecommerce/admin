<template>
  <section class="PageContent">
    <section class="Table-TableBox">

      <section class="Table-TableBox__header">
        <div class="Table__name">{{ tableName }}</div>
        <div class="Table__tools">
          <slot name="tools"/>
        </div>
      </section>

      <section class="Table-TableBox__body">
        <section class="SortTable_Wrap TableBox_Data">
          <section class="TableBox_Actions">

            <section class="TableBox_Actions__supports">
              <div class="Supports_Button-GroupButton">
                <slot name="supports"/>
              </div>
            </section>

            <section class="TableBox_Actions__filters">
              <div class="SearchBox_Filter">
                <slot name="filters" />
              </div>
            </section>

          </section>

          <slot name="main-content"/>

        </section>
      </section>

      <!-- Paginations -->
      <pagination
        :pagination="getPagination"
        @eventPagination="handlePagination"
      />

    </section>
  </section>
</template>

<script>
// Componentns
import Pagination from '@/components/Pagination';

export default {
  name: 'page-table-content',
  props: {
    tableName: {
      Object: String,
      require: true
    },
    getPagination: {
      type: Object,
      require: true
    }
  },
  components: {
    Pagination
  },
  methods: {
    handlePagination({ page, perPage }) {
      this.$emit('eventPagination', { page, perPage });
    }
  }
}
</script>
<style>
  .PageContent {
    position: relative;
    background-color: var(--app-bg);
    box-shadow: rgb(0 0 0 / 10%) 0px 1px 1px;
    margin-bottom: 20px;
  }
  .Table-TableBox .Table-TableBox__header {
    border-bottom: 1px solid var(--header-bg);
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;
  }
  .Table-TableBox__header .Table__name {
    color: var(--second-color);
  }
  .Table-TableBox__header .Table__tools {
    color: var(--second-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .Table-TableBox__header .Table__tools .Table__tools-item {
    background-color: #555;
    color: var(--app-color);
    font-size: .8rem;
    padding: 5px 7px;
    margin-left: 4px;
  }
  .Table-TableBox .Table-TableBox__body {
    padding: 10px;
  }
  .SortTable_Wrap .TableBox_Actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .TableBox_Actions__supports .Supports_Button-GroupButton {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .Supports_Button-GroupButton .Button__Item {
    border: 1px solid #ddd;
    font-size: .75rem;
    padding: 6px 10px;
    border-right-color: transparent;
    text-transform: uppercase;
  }
  .Supports_Button-GroupButton .Button__Item:last-child {
    border-right-color: #ddd;
  }
  .Supports_Button-GroupButton .Button__Item:hover {
    color: #333;
    border-color: #8c8c8c;
    background-color: #d4d4d4;
    border-right-color: 1px solid #333;
  }
  .TableBox_Actions__filters .SearchForm_FormGroup {
    position: relative;
    width: 320px;
  }
  .TableBox_Actions__filters .SearchForm__Icon {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    color: #585454;
    font-size: .9rem;
    padding: 0 10px;
    box-sizing: content-box;
  }
  .TableBox_Actions__filters .SearchForm__FormSelect {
    border: 1px solid #ddd;
    margin-right: 2px;
    color: #4c4747;
    cursor: pointer;
  }
  .TableBox_Actions__filters .SearchForm__FormControl {
    display: block;
    width: 100%;
    border: 1px solid #ddd;
    padding: 5px 5px 5px 30px;
  }
  .TableBox_Content .thumb-iframe {
    display: block;
    position: relative;
  }
  .TableBox_Content .Img-Circle {
    display: block;
    border-radius: 100%;
  }
  .TableBox_Content .Img-Small {
    display: block;
    width: 40px;
    height: 40px;
  }
  .TableBox_Content thead th {
    border-bottom-width: 2px!important;
    font-weight: 500;
  }
  .TableBox_Content thead th .el-checkbox__inner {
    margin-left: 5px;
  }
  .TableBox_Content .el-checkbox__inner::after {
    left: 6px;
    top: 3px;
  }
  .TableBox_Content thead th:last-child,
  .TableBox_Content td:last-child {
    text-align: right;
  }
  .TableBox_Content thead .order {
    width: 40px;
    text-align: center;
  }
  .TableBox_Content .el-checkbox__inner {
    width: 18px;
    height: 18px;
  }
  .TableBox_Content td {
    font-size: .9rem;
    color: #666;
    vertical-align: middle;
  }
  .TableBox_Content td .table-option-item {
    color: #666;
    font-size: .9rem;
    padding: 2px;
  }
  .TableBox_Content .image.thumbNail {
    width: 100px;
    height: 100px;
    overflow: hidden;
  }
  .TableBox_Content .image.thumbNail img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .Table-TableBox__Paginate .custom-select {
    border: 1px solid #dee2e6;
    padding: 4px 8px;
    margin-right: 3px;
    margin-top: 0!important;
    color: #605a5a;
    font-size: .9rem;
  }
</style>