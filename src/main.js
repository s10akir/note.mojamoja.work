import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import schemaBuilder from "./datastore.js";

Vue.config.productionTip = false;
schemaBuilder.connect().then(db => (Vue.prototype.$db = db));

Vue.use(vuetify);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");
