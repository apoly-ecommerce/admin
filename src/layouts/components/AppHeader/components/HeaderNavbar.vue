<template>
  <nav class="AppHeader__NavBar NavBar">
    <navbar-btn-toggle/>
    <navbar-custom-menu/>
  </nav>
</template>

<script>
import NavbarCustomMenu from './NavbarCustomMenu';
import NavbarBtnToggle from './NavbarBtnToggle';

export default {
  name: 'header-navbar',
  components: {
    NavbarCustomMenu,
    NavbarBtnToggle
  },
}
</script>