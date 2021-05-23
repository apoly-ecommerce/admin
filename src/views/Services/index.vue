<template>
  <section class="PageServices">

    <!-- nested router of this-->
    <template>
      <router-view :key="key"></router-view>
    </template>

    <!-- component page table content -->
    <template>
      <page-table-content
        :tableName="'My Services'"
        :getPagination="getPagination"
        @eventPagination="handlePagination"
      >

          <!-- table content slot for tools -->
          <template v-slot:tools>
            <router-link class="Table__tools-item" :to="{ name: 'add-service' }">Add New Services</router-link>
          </template>

          <!-- table content slot supports -->
          <template v-slot:supports>
            <button type="button" class="Button__Item">
              <span>Copy</span>
            </button>
            <button type="button" class="Button__Item">
              <span>CSV</span>
            </button>
            <button type="button" class="Button__Item">
              <span>EXCEL</span>
            </button>
            <button type="button" class="Button__Item">
              <span>PDF</span>
            </button>
            <button type="button" class="Button__Item">
              <span>PRINT</span>
            </button>
          </template>

          <!-- table content slot filters -->
          <template v-slot:filters>
            <form class="SearchForm">
              <div class="SearchForm_FormGroup">
                <fa-icon class="SearchForm__Icon" icon="search" />
                <input type="text" name="q" class="SearchForm__FormControl" placeholder="Enter key ?" autocomplete="off" spellcheck="false">
              </div>
            </form>
          </template>

          <!-- table content slot main-content -->
          <template v-slot:main-content>
            <section class="TableBox_Content">
              <b-table
                class="m-0"
                show-empty
                emptyText="No data found!"
                :fields="fields"
                :items="items"
                :per-page="getPagination.perPage"
                :current-page="getPagination.currentPage"
              >

                <template #head(index) class="order"></template>

                <!-- Virtual column [#Order] -->
                <template #cell(index)="data">
                  {{ data.index + 1 }}
                </template>

                <!-- Image -->
                <template #cell(image)="data">
                  <div class="image thumbNail">
                    <img :src="data.item.image" alt="">
                  </div>
                </template>

                <!-- Options -->
                <template #cell(options)>
                  <a href="" class="table-option-item" v-b-tooltip.hover title="Detail">
                    <fa-icon icon="info-circle" />
                  </a>
                  <a href="" class="table-option-item" v-b-tooltip.hover title="Edit">
                    <fa-icon icon="edit" />
                  </a>
                  <a href="" class="table-option-item" v-b-tooltip.hover title="Update">
                    <fa-icon icon="trash-alt" />
                  </a>
                </template>

              </b-table>
            </section>
          </template>

      </page-table-content>
    </template>

  </section>
</template>

<script>
// Configs Paginate @of PageServices
import { paginates } from '@/config';

// Componentns
import PageTableContent from '@/components/PageTableContent';

export default {
  components: {
    PageTableContent
  },
  data() {
    return {
      paginateService: paginates.service,
      fields: [
        { key: 'index',     label: '#Order',    thClass: 'order' },
        { key: 'image',     label: 'Image',     sortable: false, thClass: 'image' },
        { key: 'name',      label: 'Name',      sortable: true  },
        { key: 'create_at', label: 'Create at', sortable: true  },
        { key: 'detail',    label: 'Detail',    sortable: false },
        { key: 'options',   label: 'Options',   sortable: false, thClass: 'option' },
      ],
      items: [
        { image: 'https://i.pinimg.com/originals/32/30/00/3230002646ee1c51d7697150316f6dc4.jpg', name: 'Name 1', create_at: 'Create at 1', detail: 'Detail 1', options: 'Option 1' },
        { image: 'https://i.pinimg.com/originals/32/30/00/3230002646ee1c51d7697150316f6dc4.jpg', name: 'Name 2', create_at: 'Create at 2', detail: 'Detail 2', options: 'Option 2' },
        { image: 'https://i.pinimg.com/originals/32/30/00/3230002646ee1c51d7697150316f6dc4.jpg', name: 'Name 3', create_at: 'Create at 3', detail: 'Detail 3', options: 'Option 3' },
        { image: 'https://i.pinimg.com/originals/32/30/00/3230002646ee1c51d7697150316f6dc4.jpg', name: 'Name 4', create_at: 'Create at 4', detail: 'Detail 4', options: 'Option 4' },
        { image: 'https://i.pinimg.com/originals/32/30/00/3230002646ee1c51d7697150316f6dc4.jpg', name: 'Name 5', create_at: 'Create at 5', detail: 'Detail 5', options: 'Option 5' },
      ]
    };
  },
  computed: {
    getPagination() {
      return {
        rows: this.items.length,
        perPage: this.paginateService.perPage,
        options: this.paginateService.options,
        currentPage: this.paginateService.currentPage
      };
    },
    key() {
      return this.$route.path;
    }
  },
  methods: {
    handlePagination({ page, perPage }) {
      this.paginateService.currentPage = page;
      this.paginateService.perPage = perPage;
    },
  },
}
</script>