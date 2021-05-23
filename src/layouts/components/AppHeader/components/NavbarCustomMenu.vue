<template>
  <ul class="NavBar__nav NavBar_CustomMenu">
    <custom-menu-message
      :dropdownName="getDropdownMenuNameActive"
      @eventActiveDropdownMenu="activeDropdownMenu"
    />
    <custom-menu-notification
      :dropdownName="getDropdownMenuNameActive"
      @eventActiveDropdownMenu="activeDropdownMenu"
    />
    <custom-menu-announce
      :dropdownName="getDropdownMenuNameActive"
      @eventActiveDropdownMenu="activeDropdownMenu"
    />
    <custom-menu-profile />
    <custom-menu-logout />
  </ul>
</template>

<script>
// Components
import CustomMenuMessage from './CustomMenuMessage';
import CustomMenuNotification from './CustomMenuNotification';
import CustomMenuAnnounce from './CustomMenuAnnounce';
import CustomMenuProfile from './CustomMenuProfile';
import CustomMenuLogout from './CustomMenuLogout';

// Store
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'navbar-custom-menu',
  components: {
    CustomMenuMessage,
    CustomMenuNotification,
    CustomMenuAnnounce,
    CustomMenuProfile,
    CustomMenuLogout
  },
  computed: {
    ...mapGetters({
      'getDropdownMenuNameActive': 'app/getDropdownMenuNameActive'
    })
  },
  methods: {
    ...mapActions({
      'handleActiveDropdownMenu': 'app/handleActiveDropdownMenu'
    }),
    activeDropdownMenu(name) {
      this.handleActiveDropdownMenu(name);
    }
  },
}
</script>
<style>
  .dropdown-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
  }
</style>