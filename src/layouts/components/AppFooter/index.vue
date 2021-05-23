<template>
  <footer class="AppFooter">
    <div class="AppFooter_Wrap">
      <div class="AppFooter__copyright">
        <p class="AppFooter__copyright--text">
          <strong>Copyright © {{ currentYear }}.</strong>
          <span>{{ copyright }}</span>
        </p>
      </div>
      <div class="AppFooter__version">
        <router-link to="/">{{ appName }} Version: {{ version }}</router-link>
      </div>
    </div>
  </footer>
</template>

<script>
// Store
import { mapGetters } from 'vuex';
// Helper
import { getCurrentYear } from '@/helpers';
// Settings
import appSetting from '@/settings/app';

export default {
  name: 'App-footer',
  computed: {
    ...mapGetters({
      'copyright': 'app/getCopyright',
      'version': 'app/getVersion'
    }),
    currentYear() {
      return getCurrentYear();
    },
    appName() {
      return appSetting.appName;
    }
  }
}
</script>
<style>
  .AppFooter {
    width: 100%;
    height: var(--footer-height);
    background-color: var(--app-bg);
    padding: 15px;
    color: #444;
    border-top: 1px solid #d2d6de;
    transition: transform 0.3s ease-in-out, margin 0.3s ease-in-out, -webkit-transform 0.3s ease-in-out;
    position: relative;
    z-index: var(--footer--z-index);
    left: 0;
    bottom: 0;
  }

  .AppFooter_Wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: .9rem;
  }
</style>