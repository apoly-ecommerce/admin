<template>
  <li class="NavBar_CustomMenu__item">
    <a href="" class="NavBar_CustomMenu__link NavBar_MenuLink">
      <img src="https://www.gravatar.com/avatar/bf360ba5e23b916fd50940cc12bb1f69?s=30&d=mm" class="NavBar_CustomMenu__image user-avatar" alt="">
      <span class="NavBar_CustomMenu__label">{{ nice_name }}</span>
    </a>
  </li>
</template>

<script>
// Store
import { mapGetters } from 'vuex';

export default {
  name: 'custom-menu-profile',
  computed: {
    ...mapGetters({
      'nice_name': 'user/get_nice_name'
    })
  }
}
</script>