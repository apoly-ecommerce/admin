<template>
  <nav class="AppHeader__NavBar NavBar">
    <navbar-btn-toggle/>
    <navbar-user-menu/>
    <navbar-custom-menu/>
  </nav>
</template>

<script>

// Components
import NavbarUserMenu from './NavbarUserMenu';
import NavbarCustomMenu from './NavbarCustomMenu';
import NavbarBtnToggle from './NavbarBtnToggle';

export default {
  name: 'header-navbar',
  components: {
    NavbarUserMenu,
    NavbarCustomMenu,
    NavbarBtnToggle
  },
}
</script>