<template>
  <section class="AppSidebar_Wrap" role="AppSidebar_MenuList">
    <ul class="AppSidebar_Wrap__Menu">
      <menu-item
        v-for="(menuItem, index) in mapSidebarMenu"
        :key="index"
        :menuItem="menuItem"
      />
    </ul>
  </section>
</template>

<script>
import MenuItem from './MenuItem';
import { mapGetters } from 'vuex';

export default {
  name: 'sidebar-menu',
  components: {
    MenuItem
  },
  computed: {
    ...mapGetters({
      'mapSidebarMenu': 'app/getMapSidebarMenu'
    })
  }
}
</script>