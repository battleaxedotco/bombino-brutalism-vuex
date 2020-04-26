import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// Import name-spaced stores like so:
import example from "./store-example";

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // Instantiate your name-spaced stores here:
      example
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
