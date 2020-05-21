import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./permission";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import axios from "./utils/MyAxios";
Vue.config.productionTip = false;
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VCharts from "v-charts";
Vue.use(ViewUI);
Vue.use(ElementUI);
Vue.use(VCharts);
Vue.prototype.$axios = axios;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
