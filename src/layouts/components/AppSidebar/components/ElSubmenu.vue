<template>
  <b-collapse :id="id" accordion="AppSidebar_Menu--level2">
    <ul class="TreeView__Menu">
      <li class="AppSidebar_Wrap__MenuItem"
        v-for="(menuItem, index) in children"
        :key="index"
      >
        <template v-if="menuItem.roles && !menuItem.children">
          <menu-link :to="menuItem.link">
            <i class="AppSidebar_Wrap__MenuIcon" :class="menuItem.icon"></i>
            <span class="AppSidebar_Wrap__MenuLabel">{{ menuItem.name }}</span>
          </menu-link>
        </template>

        <template v-if="menuItem.roles && menuItem.children">
          <menu-link :VBToggle="menuItem.name">
            <i class="AppSidebar_Wrap__MenuIcon" :class="menuItem.icon"></i>
            <span class="AppSidebar_Wrap__MenuLabel">{{ menuItem.name }}</span>
            <i class="fas fa-angle-right TreeView__icon TreeView__icon--close"></i>
          </menu-link>

          <b-collapse :id="menuItem.name" accordion="AppSidebar_Menu--level3">
            <ul class="TreeView__Menu level3">
              <li class="AppSidebar_Wrap__MenuItem"
                v-for="(childMenuItem, _index) in menuItem.children"
                :key="_index"
              >
                <menu-link :to="childMenuItem.link">
                  <i class="AppSidebar_Wrap__MenuIcon" :class="menuItem.icon"></i>
                  <span class="AppSidebar_Wrap__MenuLabel">{{ childMenuItem.name }}</span>
                </menu-link>
              </li>
            </ul>
          </b-collapse>
        </template>
      </li>
    </ul>
  </b-collapse>
</template>

<script>
// Components
import MenuLink from './MenuLink';

export default {
  name: 'el-submenu',
  components: {
    MenuLink
  },
  props: {
    children: {
      type: Array,
      require: true
    },
    id: {
      type: String,
      require: true
    }
  },
}
</script>