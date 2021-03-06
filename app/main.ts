import Vue from 'nativescript-vue';
import App from '@/components/App';
import firebase from 'nativescript-plugin-firebase';
import {ModalStack, overrideModalViewMethod, VueWindowedModal} from 'nativescript-windowed-modal';

import VueDevtools from 'nativescript-vue-devtools';
import store from './store';
import router from './router';

// if(TNS_ENV !== 'production') {
//   Vue.use(VueDevtools)
// }

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

Vue.prototype.$router = router;

Vue.prototype.$goto = function (to, options) {
  const opts = options || {
    clearHistory: false,
    backstackVisible: true,
    transition: {
      name: "fade",
      duration: 380,
      curve: "easeIn"
    }
  };
  this.$navigateTo(this.$router[to], opts);
};

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production');

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start();
