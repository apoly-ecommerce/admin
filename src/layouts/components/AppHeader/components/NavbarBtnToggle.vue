<template>
  <a href="javascript:;" class="NavBar__btn btnToggle NavBar_MenuLink">
    <fa-icon :icon="['fas', 'bars']"/>
    <span class="btn--name">Toggle navigation</span>
  </a>
</template>

<script>
export default {
  name: 'navbar-btn-toggle'
}
</script>