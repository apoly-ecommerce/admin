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
                <slot name="actions"/>
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

    </section>
  </section>
</template>

<script>
export default {
  name: 'page-table-content',
  props: {
    tableName: {
      Object: String,
      require: true
    },
  }
}
</script>
<style src='@/styles/app/table-content.css'></style>