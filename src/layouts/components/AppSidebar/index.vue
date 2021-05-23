<template>
  <aside class="AppSidebar">
    <sidebar-menu />
  </aside>
</template>

<script>
// Components
import { SidebarMenu } from './components';

export default {
  name: 'App-sidebar',
  components: {
    SidebarMenu
  }
}
</script>
<style>
.AppSidebar {
    background-color: var(--sidebar-color);
    position: absolute;
    top: 0;
    left: 0;
    width: var(--sidebar-width);
    min-height: 100%;
    padding-top: var(--sidebar-space-top);
    z-index: var(--sidebar--z-index);
    transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
  }

  .AppSidebar .AppSidebar_Wrap__Menu {
    overflow: hidden;
    white-space: nowrap;
  }

  .AppSidebar_Wrap__MenuItem .AppSidebar_Wrap__MenuLink {
    color: var(--primary-color);
    font-weight: 100;
    text-transform: uppercase;
    display: block;
    padding: 12px 5px 12px 6px;
    font-size: .85rem;
    border-left: 3px solid transparent;
  }

  .AppSidebar_Wrap__MenuItem.active > .AppSidebar_Wrap__MenuLink,
  .AppSidebar_Wrap__Menu > .AppSidebar_Wrap__MenuItem > .AppSidebar_Wrap__MenuLink:hover {
    border-left-color: var(--header-bg);
    background-color: #1e282c;
    color: var(--app-color);
  }

  .AppSidebar_Wrap__MenuLink .AppSidebar_Wrap__MenuIcon {
    margin-right: 4px;
  }

  .AppSidebar_Wrap__MenuItem .AppSidebar_Wrap__MenuLink {
    position: relative;
  }

  .AppSidebar_Wrap__MenuItem .TreeView__icon {
    position: absolute;
    right: 5%;
    top: 50%;
    font-size: .8rem;
    transition: transform 0.3s ease-in-out;
  }

  .AppSidebar_Wrap__MenuItem .TreeView__icon--close {
    transform: translateY(-50%) rotate(0deg);
  }

  .AppSidebar_Wrap__MenuItem .TreeView__icon--open {
    transform: translateY(-50%) rotate(90deg);
  }

  .AppSidebar_Wrap__MenuItem .TreeView__Menu {
    background-color: #2c3b41;
    transition: height .5s ease;
    overflow: hidden;
  }
  .TreeView__Menu.level3 {
    background-color: #434343;
    padding-left: 10px;
  }

  .AppSidebar_Wrap__MenuItem .TreeView__Menu > .AppSidebar_Wrap__MenuItem > .AppSidebar_Wrap__MenuLink {
    padding: 10px 5px 10px 15px;
  }

  .AppSidebar_Wrap__MenuItem .TreeView__Menu > .AppSidebar_Wrap__MenuItem:hover > .AppSidebar_Wrap__MenuLink {
    color: var(--app-color);
  }
</style>