<template>
  <section class="Table-TableBox__Paginate" v-if="pagination.rows && pagination.rows > 0">
    <div class="Table-TableBox__Paginate--perPage">
      <b-form-select size="sm" class="mt-3"
        :options="pagination.options"
        :value="pagination.perPage"
        @change="handleChangePerPage"
      ></b-form-select>
    </div>
    <b-pagination
      :total-rows="pagination.rows"
      :per-page="pagination.perPage"
      :value="currentPage"
      v-bind="$attrs"
      first-number
      last-number
    >
      <template #prev-text><fa-icon @click="handleChangeCurrentPage(currentPage - 1, pagination.perPage)" class="Table-TableBox__icon" icon="chevron-left" /></template>

      <template #next-text><fa-icon @click="handleChangeCurrentPage(currentPage + 1, pagination.perPage)" class="Table-TableBox__icon" icon="chevron-right" /></template>

      <template #ellipsis-text>
        <i>...</i>
      </template>

      <template #page="{ page, active }">
        <b v-if="active">{{ page }}</b>
        <i v-else @click="handleChangeCurrentPage(page, pagination.perPage)">{{ page }}</i>
      </template>

    </b-pagination>
  </section>
</template>

<script>
// Import Utils
export default {
  name: 'pagination',
  props: {
    pagination: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      currentPage: +this.pagination.currentPage
    };
  },
  methods: {
    handleChangeCurrentPage(page, perPage) {
      this.$emit('eventPagination', { page, perPage });
      this.currentPage = page;
    },
    handleChangePerPage(perPage) {
      this.$emit('eventPagination', { page: 1, perPage });
    }
  }
}
</script>
<style>
  .Table-TableBox__Paginate {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 10px 10px;
  }
  .Table-TableBox__Paginate .page-link {
    outline: none!important;
    box-shadow: none!important;
    padding: 5px 12px;
    border-radius: 0!important;
  }
  .Table-TableBox__Paginate .page-item .page-link {
    padding: 0!important;
  }
  .Table-TableBox__Paginate .Table-TableBox__icon {
    font-size: .8rem;
    padding: 7.2px 12px;
    box-sizing: content-box;
  }
  .Table-TableBox__Paginate .page-item .page-link i,
  .Table-TableBox__Paginate .page-item .page-link b {
    padding: 5px 10px;
    display: block;
  }
</style>