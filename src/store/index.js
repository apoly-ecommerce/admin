import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Modules
import app from './modules/app';
import user from './modules/user';
import country from './modules/country';
import module from './modules/module';
import state from './modules/state';
import role from './modules/role';
import categoryGroup from './modules/categoryGroup';
import categorySubGroup from './modules/categorySubGroup';
import category from './modules/category';
import manufacturer from './modules/manufacturer';
import product from './modules/product';

const store = new Vuex.Store({
  modules: {
    app,
    user,
    module,
    country,
    state,
    role,
    categoryGroup,
    categorySubGroup,
    category,
    manufacturer,
    product
  }
});

export default store;