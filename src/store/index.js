import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { pipe, pluck, uniq, map, objOf, findIndex, equals } from 'ramda';

import lobbyists from '@/assets/lobbyists.json';

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    lobbyists,
  },

  getters: {
    firmNames({ lobbyists }) {
      return pipe(
        pluck('lobbying_firm'),
        uniq
      )(lobbyists);
    },

    firms(state, { firmNames }){
      return map(
        objOf('name'),
        firmNames
      );
    },
  }
});

export default store;
