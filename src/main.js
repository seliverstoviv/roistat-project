import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';
import VueMask from 'v-mask';
import Vue from 'vue';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;
Vue.use(ElementUI, { locale });
Vue.use(VueMask);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
