import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';
import VuexPersist from 'vuex-persist';

import User from './User';

import settings from './settings';

// import example from './module-example'

Vue.use(Vuex);

const database = new VuexORM.Database();

database.register(User);

const vuexPersist = new VuexPersist({
  key: 'r4w-app',
  storage: localStorage,
});

window.User = User;
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      settings,
    },
    plugins: [VuexORM.install(database), vuexPersist.plugin],

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
  });

  return Store;
}
