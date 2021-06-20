<template>
  <li class="NavBar_CustomMenu__item DropdownMenu">
    <a href="javascript:;" class="NavBar_CustomMenu__link DropdownMenu__btn NavBar_MenuLink"
      @click.prevent="activeDropdownMenu(tabName)"
    >
      <i class="fas fa-envelope NavBar_CustomMenu__icon"></i>
    </a>
    <ul class="DropdownMenu__table" v-if="dropdownName && dropdownName===tabName">
      <i
        class="fas fa-times DropdownMenu__btn--close"
        @click="activeDropdownMenu('')"
      ></i>
      <li class="DropdownMenu__title">You have 0 messages</li>
      <li class="DropdownMenu__divider"></li>
      <li class="DropdownMenu__footer">
        <a href="" class="DropdownMenu__link">See All Messages</a>
      </li>
    </ul>
  </li>
</template>

<script>


export default {
  name: 'custom-menu-message',
  props: {
    dropdownName: { type: String, default: '' }
  },
  data() {
    return {
      tabName: 'messages'
    };
  },
  methods: {
    activeDropdownMenu(name) {
      this.$emit('eventActiveDropdownMenu', name);
    }
  }
}
</script>