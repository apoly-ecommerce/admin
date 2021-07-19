<template>
  <div id="sidebarMsg-component">
    <div class="sidebar-wrap d-flex h-100">
      <!-- Nav Tabs Selections -->
      <nav-tabs-selection />

      <!-- Nav Menu -->
      <div class="msgSidebar-menu">
        <div class="SidebarTop d-flex flex-column overflow-hidden">
          <div class="msgSidebar-header">
            <div class="d-flex justify-content-between align-items-center">
              <h3 class="sbMsg-heading">Chats</h3>
              <router-link
                tag="div"
                to="/support/message/group/create"
                class="createMsgGroup-btn"
                role="button"
              >
                <div class="clickable i-center" title="Tạo nhóm chat">
                  <i class="fas fa-users"/>
                  <span class="d-none">Tạo nhóm chat</span>
                </div>
              </router-link>
            </div>
          </div>
          <msg-contact-search />
          <div class="msg-divider bottom" style="margin: 0 10px;"></div>
          <msg-filters-bar />
        </div>
        <!-- <nav-tabs-panel /> -->
        <div class="ConversationList">
          <div class="virtualized-scroll" :style="`height: ${sidebarSize}`">
            <tab-panel-my-friends v-show="tabActive === 'myFriends'"/>
            <tab-panel-conv-friends v-show="tabActive === 'convFriends'"/>
            <tab-panel-conv-group v-show="tabActive === 'convGroup'"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabsSelection from './components/NavTabsSelection';
import MsgContactSearch from './components/MsgContactSearch';
import MsgFiltersBar from './components/MsgFiltersBar';
import NavTabsPanel from './components/NavTabsPanel';
import TabPanelMyFriends from './components/TabPanelMyFriends';
import TabPanelConvFriends from './components/TabPanelConvFriends';
import TabPanelConvGroup from './components/TabPanelConvGroup';

import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    NavTabsSelection,
    MsgContactSearch,
    MsgFiltersBar,
    NavTabsPanel,
    TabPanelMyFriends,
    TabPanelConvFriends,
    TabPanelConvGroup
  },
  data() {
    return {
      sidebarSize: '0px'
    }
  },
  mounted() {
    let hSbt = +document.querySelector(".SidebarTop").offsetHeight;
    let hLW  = +document.querySelector(".msgSidebar-menu").offsetHeight;
    this.sidebarSize = `${hLW-hSbt-2}px`
  },
  computed: {
    ...mapGetters({
      'tabActive': 'message/getTabChatSelected',
    })
  },
}
</script>
<style src="@/styles/app/sidebar-msg.css"></style>