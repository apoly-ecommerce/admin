import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Modules
import app     from './modules/app';
import user    from './modules/user';
import country from './modules/country';
import state   from './modules/state';
import role    from './modules/role';

const store = new Vuex.Store({
  modules: {
    app,
    user,
    country,
    state,
    role
  }
});

export default store;