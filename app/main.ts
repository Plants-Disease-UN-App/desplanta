import Vue from 'nativescript-vue';
import App from './components/App';
import firebase from 'nativescript-plugin-firebase';
import {ModalStack, overrideModalViewMethod, VueWindowedModal} from 'nativescript-windowed-modal';

import VueDevtools from 'nativescript-vue-devtools';
import store from './store';

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}

overrideModalViewMethod();
Vue.registerElement('ModalStack', () => ModalStack);
Vue.use(VueWindowedModal);

firebase.init({})
  .then(instance => {
    console.log('Firebase init done');
  })
  .catch(err => {
    console.error(`Firebase error ${err}`);
  });

Vue.prototype.$firebase = firebase;

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production');


new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start();
