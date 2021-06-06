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

// Element ui
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import enLang from 'element-ui/lib/locale/lang/vi';

// Font awesome picker
import VueFontAwesomePicker from "vfa-picker";
Vue.use(VueFontAwesomePicker);

// Common styles
import './styles/common/index.css';

Vue.use(Element, {
  locale: enLang
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});
