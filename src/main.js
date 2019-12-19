import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import schemaBuilder from "./datastore.js";

import BootstrapVue from "bootstrap-vue";
import "bootswatch/dist/lux/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

schemaBuilder.connect().then(db => {
  Vue.use(BootstrapVue);
  Vue.prototype.$db = db;
  Vue.config.productionTip = false;

  new Vue({
    router,
    render: h => h(App)
  }).$mount("#app");
});
