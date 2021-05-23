<template>
  <li class="AppSidebar_Wrap__MenuItem">

    <template v-if="isMenuChildless && menuItem.link">
      <menu-link :to="menuItem.link">
        <fa-icon class="AppSidebar_Wrap__MenuIcon" :icon="menuItem.icon" />
        <span class="AppSidebar_Wrap__MenuLabel">{{ menuItem.name }}</span>
      </menu-link>
    </template>

    <template v-if="isMenuHasChildren">
      <menu-link :VBToggle="slugMenuName(menuItem.name)">
        <fa-icon class="AppSidebar_Wrap__MenuIcon" :icon="menuItem.icon" />
        <span class="AppSidebar_Wrap__MenuLabel">{{ menuItem.name }}</span>
        <fa-icon class="TreeView__icon TreeView__icon--close" :icon="['fas', 'angle-right']"/>
      </menu-link>
      <el-submenu
        :id="slugMenuName(menuItem.name)"
        :children="menuItem.children"
      />
    </template>
  </li>
</template>

<script>
// Components
import MenuLink from './MenuLink';
import ElSubmenu from './ElSubmenu';

// Helpers
import { changeToSlug } from '@/helpers';

export default {
  name: 'menu-item',
  components: {
    MenuLink,
    ElSubmenu,
  },
  props: {
    menuItem: {
      type: Object, default: {}
    }
  },
  data() {
    return {};
  },
  computed: {
    isMenuChildless() {
      if (this.menuItem.roles && !this.menuItem.children) {
        return true;
      } return false;
    },
    isMenuHasChildren() {
      if (this.menuItem.roles && this.menuItem.children) {
        return true;
      } return false;
    }
  },
  methods: {
    slugMenuName(name) {
      return changeToSlug(name);
    }
  }
}
</script>