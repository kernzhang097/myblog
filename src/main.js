import Vue from 'vue'
import App from './App.vue'
import router, {routes} from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import md5 from 'js-md5'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$md5 = md5
Vue.use(ElementUI)

const adminMenu = routes.filter(n => {
  return n.name == 'admin'
})
localStorage.setItem('adminMenu', JSON.stringify(adminMenu[0].children))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
