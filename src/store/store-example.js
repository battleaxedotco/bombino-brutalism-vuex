/**
 *    It's much better to launch the panel in a normal Chrome window and use Vue DevTool's Vuex tab to
 *    see state changes than code inside your host. See 'Use in Browser' section of the template README:
 * 
 *    https://github.com/Inventsable/bombino-brutalism-vuex#use-in-browser
*/

// We'll just use window.localStorage for now, but Vuex can sync to any backend you need
const LocalStorage = window.localStorage;

// The State is like a global data() object, a single-source of truth accessible wherever you need.
const state = {
  settings: {
    size: 18,
    sizeLock: false
  },
  inputs: {
    inputA: `Fury said to a mouse\r\nWho he met in the house\r\n'Let us both go to law,\r\nI will prosecute you.\r\n\r\n'Come, take no denial, we must have trial\r\nFor really this morning I've nothing to do.'`,
    inputB: `Said the mouse to the cur\r\n'Such a trial, dear sir\r\nWithout jury or judge would be wasting our breath.'\r\n\r\n'I'll be judge, I'll be jury,'\r\nSaid cunning old Fury;\r\n'I'll try the whole cause and condemn you to death.'`
  },
  label: 'Reset Vuex'
};

// Any direct alterations to the State should be done by Mutations.
// Mutations aren't called directly, instead they're triggered through Actions.
const mutations = {
  setSize(state, value) {
    state.settings.size = value;
  },
  setSizeLock(state, value) {
    state.settings.sizeLock = value;
  },
  setInputA(state, value) {
    state.inputs.inputA = value;
  },
  setInputB(state, value) {
    state.inputs.inputB = value;
  },
  setLabel(state, value) {
    state.label = value;
  },
  setInputs(state, value) {
    Object.assign(state.inputs, value);
  },
  setSettings(state, value) {
    Object.assign(state.settings, value);
  }
};

// Actions trigger Mutations via the commit() method. Actions chain other
// Actions via the dispatch method. You can also use dispatch between name-spaced modules.
// 
// These are functionally the same as methods, and are used as such while in components
const actions = {
  // Naming Actions and their associated Mutations the same may be confusing, but it's an easy way to remember them.
  // If the commit method is called, it must be a Mutation, not an Action.
  // 
  // Actions to assign or modify data in our State (triggered by our UI):
  setSize({ commit, dispatch }, value) {
    commit("setSize", value);
    dispatch("saveSettings");
  },
  // After each assign Action is triggered, notice that another Action is dispatched which syncs our data to the backend:
  setSizeLock({ commit, dispatch }, value) {
    commit("setSizeLock", value);
    dispatch("saveSettings");
  },
  setInputA({ commit, dispatch }, value) {
    commit("setInputA", value);
    dispatch("saveInputs");
  },
  setInputB({ commit, dispatch }, value) {
    commit("setInputB", value);
    dispatch("saveInputs");
  },
  setLabel({ commit, dispatch }, value) {
    commit("setLabel", value);
    dispatch("saveLabel")
  },
  // 
  // Actions to retrieve the data from our backend (in this case LocalStorage).
  // 
  // We should rarely if ever need to use these manually. We sync our state at 
  // the beginning and the above Actions are at play with user interaction,
  // so we shouldn't need to touch anything below:
  getAll({ dispatch, state }) {
    Object.keys(state).forEach(key => {
      dispatch("get", key)
    })
  },
  get({ commit }, value) {
    let item = LocalStorage.getItem(value);
    if (item) {
      commit(`set${value.charAt(0).toUpperCase() + value.slice(1)}`,
        isJSON(item)
          ? JSON.parse(item)
          : item
      );
    }
  },
  getInputs({ commit }) {
    let inputs = LocalStorage.getItem("inputs");
    if (inputs) commit("setSettings", isJSON(inputs)
      ? JSON.parse(inputs)
      : inputs
    );
  },
  getSettings({ commit }) {
    let settings = LocalStorage.getItem("settings");
    if (settings) commit("setSettings", isJSON(settings)
      ? JSON.parse(settings)
      : settings
    );
  },
  getLabel({ commit }) {
    let value = LocalStorage.getItem("label");
    commit('setLabel', value)
  },
  // Actions to save our current data/state to the backend:
  saveAll({ dispatch, state }) {
    Object.keys(state).forEach(key => {
      dispatch(`save${key.charAt(0).toUpperCase() + key.slice(1)}`, state[key]);
    });
  },
  saveInputs({ state }) {
    LocalStorage.setItem("inputs", JSON.stringify(state.inputs));
  },
  saveSettings({ state }) {
    LocalStorage.setItem("settings", JSON.stringify(state.settings));
  },
  saveLabel({ state }) {
    LocalStorage.setItem("label", state.label)
  },
  // Should always give yourself the ability to remove from Vuex,
  // otherwise you can find yourself in a spot where you can't get rid of data:
  deleteAll({ dispatch, state }) {
    Object.keys(state).forEach(key => {
      LocalStorage.removeItem(key);
    });
    dispatch("resetAll");
  },
  // Since Vuex doesn't have an easy way to return to base state,
  // I manually keep a backup of the original and commit them when needed:
  resetAll({ commit }) {
    let defaults = {
      settings: {
        size: 18,
        sizeLock: false
      },
      inputs: {
        inputA: `Fury said to a mouse\r\nWho he met in the house\r\n'Let us both go to law,\r\nI will prosecute you.\r\n\r\n'Come, take no denial, we must have trial\r\nFor really this morning I've nothing to do.'`,
        inputB: `Said the mouse to the cur\r\n'Such a trial, dear sir\r\nWithout jury or judge would be wasting our breath.'\r\n\r\n'I'll be judge, I'll be jury,'\r\nSaid cunning old Fury;\r\n'I'll try the whole cause and condemn you to death.'`
      },
      label: 'Reset Vuex'
    }
    Object.keys(defaults).forEach(key => {
      commit(`set${key.charAt(0).toUpperCase() + key.slice(1)}`, defaults[key]);
    });
  }
};

// Getters are used in the computed key of a component, and are an easy way to read the state:
const getters = {
  settings: state => {
    return state.settings;
  },
  inputs: state => {
    return state.inputs
  },
  label: state => {
    return state.label
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

function isJSON(string) {
  try {
    JSON.parse(string)
    return true;
  } catch (err) {
    return false;
  }
}
