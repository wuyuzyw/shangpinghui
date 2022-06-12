import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/mock/mockServe'
import 'swiper/css/swiper.min.css'
import Pagination from '@/components/Pagination'

Vue.config.productionTip = false
Vue.component(Pagination.name, Pagination)
new Vue({
  router,
  store,
  beforeCreate () {
    Vue.prototype.$bus = this
  },
  render: h => h(App)
}).$mount('#app')
