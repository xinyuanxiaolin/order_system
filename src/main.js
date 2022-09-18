import Vue from "vue";
import App from "./App.vue";

import router from "@/router";

import ElementUi from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from 'axios'
Vue.use(ElementUi);
Vue.config.productionTip = false;



// 请求头验证
axios.interceptors.request.use(config => {
  // console.log(config);
  config.headers['Content-Type'] = 'application/json;charset=utf-8';
  config.headers['token'] = localStorage.getItem('token');
  return config
})
new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
