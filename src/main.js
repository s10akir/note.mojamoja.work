import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import schemaBuilder from "./datastore.js";

schemaBuilder.connect().then(db => {
  Vue.prototype.$db = db;
  Vue.config.productionTip = false;

  new Vue({
    router,
    render: h => h(App)
  }).$mount("#app");
});
