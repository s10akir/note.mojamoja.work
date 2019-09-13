import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import db from "./datastore.js";

Vue.config.productionTip = false;
Vue.prototype.$db = db;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
