import Vue from 'vue';
import lf from 'lovefield';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import schemaBuilder from './db';

declare module 'vue/types/vue' {
  interface Vue {
    $schemaBuilder: lf.schema.Builder;
  }
}

Vue.config.productionTip = false;
Vue.prototype.$schemaBuilder = schemaBuilder;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
