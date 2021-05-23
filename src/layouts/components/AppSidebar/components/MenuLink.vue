<template>
  <component
    class="AppSidebar_Wrap__MenuLink TreeView__Btn"
    :is="type"
    v-b-toggle="VBToggle"
    v-bind="linkProps(to)"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'menu-link',
  props: {
    to: {
      type: String,
      default: ''
    },
    VBToggle: {
      type: String,
      default: ''
    }
  },
  computed: {
    type() {
      if (!this.to) return 'a';
      return 'router-link';
    }
  },
  methods: {
    linkProps(to) {
      if (!this.to) return { href: 'javascript:;' };
      return { to: to }
    }
  }
}
</script>