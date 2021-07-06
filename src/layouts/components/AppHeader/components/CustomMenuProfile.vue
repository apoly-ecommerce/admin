<template>
  <li class="NavBar_CustomMenu__item">
    <router-link to="/account/profile" class="NavBar_CustomMenu__link NavBar_MenuLink">
      <img :src="userAuth.image" class="NavBar_CustomMenu__image user-avatar" alt="Avatar">
      <span class="NavBar_CustomMenu__label">{{ userAuth.nice_name || userAuth.name }}</span>
    </router-link>
  </li>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'custom-menu-profile',
  computed: {
    ...mapGetters({
      'userAuth': 'auth/getUserAuth'
    })
  }
}
</script>