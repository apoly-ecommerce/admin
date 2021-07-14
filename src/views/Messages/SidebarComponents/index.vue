<template>
  <div id="sidebarMsg-component">
    <div class="sidebar-wrap d-flex">
      <!-- Nav Tabs Selections -->
      <nav-tabs-selection />

      <!-- Nav Menu -->
      <div class="msgSidebar-menu d-flex flex-column overflow-hidden">
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
        <nav-tabs-panel />
      </div>
    </div>
  </div>
</template>

<script>
import NavTabsSelection from './components/NavTabsSelection';
import MsgContactSearch from './components/MsgContactSearch';
import MsgFiltersBar from './components/MsgFiltersBar';
import NavTabsPanel from './components/NavTabsPanel';

export default {
  components: {
    NavTabsSelection,
    MsgContactSearch,
    MsgFiltersBar,
    NavTabsPanel
  }
}
</script>
<style src="@/styles/app/sidebar-msg.css"></style>