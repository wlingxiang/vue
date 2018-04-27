// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueResouce from 'vue-resource'

//引入styl
import './common/stylus/index.styl'

Vue.config.productionTip = false;
//注册vue-resouce
Vue.use(VueResouce)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
