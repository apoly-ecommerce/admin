// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

// ApiAuthenticate
import '@/middleware/apiAuth';

// Plugins
import './plugins';
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

// Common styles
import './styles/common/index.css';

Vue.config.productionTip = false;

Vue.use(Element);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});
