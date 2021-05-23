<template>
  <header class="AppHeader">
    <header-logo />
    <header-navbar />
  </header>
</template>

<script>
import { HeaderLogo, HeaderNavbar } from "./components";

export default {
  name: "App-header",
  components: {
    HeaderLogo,
    HeaderNavbar
  }
};
</script>
<style>
/* Header */
.AppHeader {
  width: 100%;
  height: var(--header-height);
  position: var(--header-position);
  top: 0;
  left: 0;
  z-index: var(--header--z-index);
}
/* Logo */
.AppHeader__logo {
  border-bottom: 3px solid var(--header-bg);
}

.AppHeader .AppHeader__logo {
  float: left;
  transition: width 0.3s ease-in-out;
  display: block;
  height: 49px;
  text-align: center;
  width: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.AppHeader__logoThumbNail {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
/* Navbar */
.AppHeader__NavBar {
  background-color: var(--header-bg);
  min-height: 49px;
  transition: margin-left 0.3s ease-in-out;
  margin-left: 160px;
}
.NavBar__btn {
  float: left;
}
.NavBar__btn .btn--name {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: none;
}
.NavBar_UserMenu {
  float: left;
}
.NavBar_UserMenu .NavBar_UserMenu__item .NavBar_UserMenu__link {
  color: var(--app-color);
  font-weight: 100;
}
.NavBar_CustomMenu__item .DropdownMenu__table {
  width: 280px;
}
.NavBar_CustomMenu__item .NavBar_CustomMenu__link {
  text-align: center;
}
.NavBar_CustomMenu {
  float: right;
  display: flex;
  align-items: center;
}
.NavBar_CustomMenu__link .NavBar_CustomMenu__image {
  display: block;
  width: 25px;
  height: 25px;
  float: left;
  margin-right: 5px;
  margin-top: -3px;
}
.NavBar_CustomMenu__link .user-avatar {
  border-radius: 100%;
  overflow: hidden;
}
/* Global */
.NavBar_MenuLink {
  padding: 15px;
  color: var(--app-color)!important;
  display: block;
  font-size: 0.9rem;
}
.NavBar_CustomMenu__item:hover > .NavBar_MenuLink {
  color: #f6f6f6;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
