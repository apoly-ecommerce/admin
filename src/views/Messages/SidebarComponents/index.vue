<template>
  <section class="SidebarNav">
    <section class="nav-MenuChatGroup">

      <!-- NavSidebarHeading -->
      <section class="Nav-sbHeading">
        <section class="Heading-wrap">
          <div class="d-flex justify-content-between align-items-center">
            <h3 class="title">Chats</h3>
            <sidebar-tools />
          </div>
        </section>

        <search-group />
      </section>

      <!-- NavSidebarBody -->
      <section class="Nav-sbBody">
        <section class="Body-wrap">

          <msg-filter-bar />

          <conversation-list />

        </section>
      </section>

    </section>
  </section>
</template>

<script>
import SidebarTools from './components/SidebarTools';
import SearchGroup from './components/SearchGroup';
import MsgFilterBar from './components/MsgFilterBar';
import ConversationList from './components/ConversationList';

export default {
  components: {
    SidebarTools,
    SearchGroup,
    MsgFilterBar,
    ConversationList
  }
}
</script>

<style src="@/styles/app/sidebar-msg.css"></style>