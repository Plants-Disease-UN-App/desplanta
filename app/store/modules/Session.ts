import firebase from 'nativescript-plugin-firebase';
import * as constants from '@/store/constants';

firebase.init({});

const state = {
  res: null,
};

const actions = {
  [constants.SESSION_LOGIN]: ({commit}, {email, password}) =>  {
    firebase.login({
      type: firebase.LoginType.PASSWORD,
      passwordOptions: {
        email: email,
        password: password
      }
    }).then(console.log)
  }
};

const mutations = {
  [constants.SESSION_SET_PROPERTY]: (state, {property, value}) => {
    state[property] = value;
  },
};

const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
