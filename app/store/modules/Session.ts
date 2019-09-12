import firebase from 'nativescript-plugin-firebase';
import * as constants from '@/store/constants';

const state = {
  displayName: null,
  profileUpdated: false,
  photoURL: null,
};

const actions = {
  [constants.SESSION_LOGIN]: ({commit}, {email, password}) => {
    firebase.login({
      type: firebase.LoginType.PASSWORD,
      passwordOptions: {
        email: email,
        password: password
      }
    }).then(response => {
      console.log(response);
      const displayName = (response.displayName) ? response.displayName : response.email;
      commit(constants.SESSION_SET_PROPERTY, {property: 'displayName', value: displayName});
    })
  },
  [constants.SESSION_SAVE_ACCOUNT_INFO]: ({commit}, {displayName, photoURL}) => {
    firebase.updateProfile({displayName, photoURL})
      .then(() => {
        commit(constants.SESSION_SET_PROPERTY, {property: 'displayName', value: displayName});
        commit(constants.SESSION_SET_PROPERTY, {property: 'photoURL', value: photoURL});
        commit(constants.SESSION_SET_PROPERTY, {property: 'profileUpdated', value: true});
      });
  },
  [constants.SESSION_SIGNUP]: ({commit}, {email, password}) => {
    firebase.createUser({email, password})
      .then((user) => {
        commit(constants.SESSION_SET_PROPERTY, {property: 'displayName', value: user.email});
      })
  },
};

const mutations = {
  [constants.SESSION_SET_PROPERTY]: (state, {property, value}) => {
    state[property] = value;
  },
};

const getters = {
  [constants.SESSION_IS_LOGGED]: state => state.displayName !== null,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
