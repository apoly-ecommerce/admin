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
// Components
import MenuItem from './MenuItem';

// config
import { mapSidebarMenu } from '@/config';

export default {
  name: 'sidebar-menu',
  components: {
    MenuItem
  },
  data() {
    return {
      mapSidebarMenu: mapSidebarMenu
    };
  }
}
</script>