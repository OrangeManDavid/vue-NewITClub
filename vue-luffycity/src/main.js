import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false;

// 导入全局的CSS样式
import '@/assets/index.css'

// 导入Axios
import Axios from 'axios'
Axios.defaults.baseURL = 'https://www.luffycity.com/api/v1';
Vue.prototype.$axios = Axios;


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);



// 导入my-header组件
import MyHeader from '@/components/MyHeader'
// 注册全局组件
// Vue.component(MyHeader.name, MyHeader);
Vue.component('my-header', MyHeader);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
